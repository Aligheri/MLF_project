import {Component, ElementRef, OnInit} from '@angular/core';
import {ArticleResponse} from "../../../../services/models/article-response";
import {ArticlesService} from "../../../../services/services/articles.service";
import * as d3 from 'd3';

@Component({
  selector: 'app-article-visualization',
  standalone: true,
  templateUrl: './article-visualization.component.html',
  styleUrls: ['./article-visualization.component.scss']
})
export class ArticleVisualizationComponent implements OnInit {
  private svg: any;
  private width: number;
  private height: number;


  constructor(private articleService: ArticlesService, private elementRef: ElementRef) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  ngOnInit(): void {
    this.loadGraph();
  }

  loadGraph(): void {
    this.articleService.getArticlesGroupedByTopic().subscribe((data) => {
      this.createGraph(data);
      console.log(data);
    });
  }



  createGraph(data: { [key: string]: ArticleResponse[] }): void {
    // d3.select(this.elementRef.nativeElement).select('svg').remove();

    // this.svg = d3.select(this.elementRef.nativeElement)
    this.svg = d3.select('#graph-container')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    const nodes: any[] = [];
    const links: any[] = [];
    let nodeId = 57;

    Object.keys(data).forEach((topicName, index) => {
      const parentNodeId = `topic-${index}`;
      nodes.push({id: parentNodeId, label: topicName, group: 'topic'});

      data[topicName].forEach(article => {
        const childNodeId = `article-${nodeId++}`;
        nodes.push({id: childNodeId, label: article.title, group: 'article'});
        links.push({source: parentNodeId, target: childNodeId});
      });
    });

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(this.width / 2, this.height / 2));

    const link = this.svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', 2)
      .attr('stroke', '#999');

    const node = this.svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', (d: any) => d.group === 'topic' ? '#FF6347' : '#1E90FF')
      .call(d3.drag()
        .on('start', (event, d: any) => this.dragStarted(event, d, simulation))
        .on('drag', (event, d: any) => this.dragged(event, d))
        .on('end', (event, d: any) => this.dragEnded(event, d, simulation))
      );

    const labels = this.svg.append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .attr('dx', 12)
      .attr('dy', '.35em')
      .text((d: any) => d.label);

    simulation.on('tick', () => {
      link.attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      labels.attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y);
    });
  }

  dragStarted(event: any, d: any, simulation: any): void {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  dragged(event: any, d: any): void {
    d.fx = event.x;
    d.fy = event.y;
  }

  dragEnded(event: any, d: any, simulation: any): void {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}

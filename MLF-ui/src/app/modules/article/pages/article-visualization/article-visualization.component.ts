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
    });
  }

  createGraph(data: { [key: string]: ArticleResponse[] }): void {
    interface TreeNode {
      name: string;
      children?: TreeNode[];
    }

    // Формируем дерево с топиками
    const root: TreeNode = {
      name: 'Learning Path',
      children: Object.keys(data).map((topicName) => ({
        name: topicName,
      }))
    };

    this.drawTree(root, data);
  }

  drawTree(data: any, articlesData: { [key: string]: ArticleResponse[] }): void {
    const margin = { top: 50, right: 120, bottom: 50, left: 120 };
    const width = this.width - margin.left - margin.right;
    const height = this.height - margin.top - margin.bottom;

    const svg = d3
      .select('#graph-container')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const root = d3.hierarchy(data);

    const treeLayout = d3.tree().size([width, height]);
    treeLayout(root);

    // Links (соединительные линии)
    svg.selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 2)
      .attr('d', (d: any) =>
        `M${d.source.x},${d.source.y}C${d.source.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${d.target.y}`
      );

    // Nodes (узлы дерева)
    const node = svg.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `translate(${d.x},${d.y})`)
      .on('click', (event: MouseEvent, d: any) => this.onTopicClick(d, svg, articlesData));

    node.append('circle')
      .attr('r', 8)
      .attr('fill', '#FF6347'); // Топики отображаются красным цветом

    node.append('text')
      .attr('dy', 3)
      .attr('x', 12)
      .style('text-anchor', 'start')
      .text((d: any) => d.data.name)
      .style('font-size', '14px');
  }
  onTopicClick(d: any, svg: any, articlesData: { [key: string]: ArticleResponse[] }): void {
    // Удаляем уже существующие статьи для других топиков
    svg.selectAll('.article-circle').remove();

    // Проверяем, что это топик и он существует в данных
    const topicName = d.data.name;
    if (articlesData[topicName]) {
      const articles = articlesData[topicName];

      let radius = 150; // Изначальный радиус круга
      const angleStep = (2 * Math.PI) / articles.length;

      // Устанавливаем границы экрана
      const screenWidth = this.width;
      const screenHeight = this.height;
      const margin = 20; // Отступы от границ экрана

      articles.forEach((article, index) => {
        const angle = angleStep * index; // Угол для размещения статьи


        let targetX = d.x + radius * Math.cos(angle);
        let targetY = d.y + radius * Math.sin(angle);


        while (
          targetX < margin || targetX > screenWidth - margin ||
          targetY < margin || targetY > screenHeight - margin
          ) {
          radius -= 10;
          targetX = d.x + radius * Math.cos(angle);
          targetY = d.y + radius * Math.sin(angle);
        }


        const articleGroup = svg.append('g')
          .attr('class', 'article-circle')
          .attr('transform', `translate(${d.x},${d.y})`)
          .style('opacity', 0);


        articleGroup.append('circle')
          .attr('r', 6)
          .attr('fill', '#4682B4');


        articleGroup.append('a')
          .attr('xlink:href', article.url)
          .attr('target', '_blank')
          .append('text')
          .attr('x', 10)
          .attr('y', 3)
          .text(article.title)
          .style('font-size', '12px')
          .style('text-anchor', 'start')
          .style('cursor', 'pointer')
          .attr('fill', '#0000EE');

        // Анимация появления
        articleGroup.transition()
          .duration(1000)
          .attr('transform', `translate(${targetX},${targetY})`)
          .style('opacity', 1);
      });
    }
  }
}

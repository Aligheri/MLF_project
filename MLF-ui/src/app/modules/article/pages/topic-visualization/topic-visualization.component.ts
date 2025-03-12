import {Component, ElementRef, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {HttpClient} from "@angular/common/http";
import {TopicContollerService} from "../../../../services/services/topic-contoller.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-article-visualization',
  standalone: true,
  templateUrl: './topic-visualization.component.html',
  styleUrls: ['./topic-visualization.component.scss']
})
export class TopicVisualizationComponent implements OnInit {
  private width: number;
  private height: number;

  constructor(private http: HttpClient, private elementRef: ElementRef, private topicService: TopicContollerService, private route: ActivatedRoute,) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  ngOnInit(): void {
    this.loadTopicTree();
  }

  loadTopicTree(): void {
    this.route.queryParams.subscribe(params => {
      console.log("Query params:", params); // Проверим, какие параметры вообще приходят
      const rawId = params["learningPathId"]; // Используем правильный ключ
      console.log("Raw ID from params:", rawId, "Тип:", typeof rawId);

      const id = Number(rawId);
      console.log("Преобразованный ID:", id, "Тип:", typeof id);

      if (!isNaN(id)) {
        this.topicService.getTopicTree({ id }).subscribe((data: any) => {
          this.createTree(data);
        });
      } else {
        console.error("❌ Ошибка: id не является числом! Проверь, что передаётся корректное значение.");
      }
    });
  }

  createTree(data: any): void {
    const margin = {top: 50, right: 120, bottom: 50, left: 120};
    const width = this.width - margin.left - margin.right;
    const height = this.height - margin.top - margin.bottom;

    const svg = d3.select(this.elementRef.nativeElement)
      .select('#graph-container')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const root = d3.hierarchy(data);

    const treeLayout = d3.tree().size([width, height]);
    treeLayout(root);

    // Links (линии между узлами)
    g.selectAll('.link')
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
    const node = g.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `translate(${d.x},${d.y})`);

    node.append('circle').attr('r', 8).attr('fill', '#4682B4');

    node.append('text')
      .attr('dy', 3)
      .attr('x', 12)
      .style('text-anchor', 'start')
      .text((d: any) => d.data.name)
      .style('font-size', '14px');
  }
}

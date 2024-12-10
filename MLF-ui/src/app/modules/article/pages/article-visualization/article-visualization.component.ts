import { Component, OnInit } from '@angular/core';
import { NgxGraphModule, Node, Edge } from '@swimlane/ngx-graph';
import { ArticleResponse } from "../../../../services/models/article-response";
import { ArticlesService } from "../../../../services/services/articles.service";

@Component({
  selector: 'app-article-visualization',
  standalone: true,
  imports: [NgxGraphModule],
  templateUrl: './article-visualization.component.html',
  styleUrls: ['./article-visualization.component.scss']
})
export class ArticleVisualizationComponent implements OnInit {
  nodes: Node[] = [];
  links: Edge[] = [];
  view: [number, number] = [800, 600]; // Размер графа

  constructor(private articleService: ArticlesService) {}

  ngOnInit(): void {
    this.articleService.getArticlesGroupedByTopic().subscribe((data) => {
      this.prepareGraphData(data);
    });
  }

  prepareGraphData(data: { [key: string]: ArticleResponse[] }): void {
    let nodeIdCounter = 1; // Счётчик для уникальных ID узлов
    this.nodes = [];
    this.links = [];

    Object.keys(data).forEach((topicName, index) => {
      const parentNodeId = `topic-${index}`; // Уникальный ID для темы
      this.nodes.push({
        id: parentNodeId,
        label: topicName,
        dimension: { width: 150, height: 50 }, // Размер узла
        data: { type: 'topic' } // Тип узла (для идентификации)
      });

      data[topicName].forEach(article => {
        const childNodeId = `article-${nodeIdCounter++}`; // Уникальный ID для статьи
        this.nodes.push({
          id: childNodeId,
          label: article.title,
          dimension: { width: 200, height: 50 }, // Размер узла
          data: { type: 'article' } // Тип узла (для идентификации)
        });

        // Добавляем связь между темой и статьёй
        this.links.push({
          source: parentNodeId,
          target: childNodeId,
          label: '' // Можно добавить подпись для связи, если нужно
        });
      });
    });
  }

  onNodeSelect(event: any): void {
    console.log('Selected:', event);
  }
}

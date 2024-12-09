import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ArticlesService} from "../../../../services/services/articles.service";
import {ArticleResponse} from "../../../../services/models/article-response";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-article-topics-page',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './article-topics-page.component.html',
  styleUrl: './article-topics-page.component.scss'
})
export class ArticleTopicsPageComponent implements OnInit{
  topics: { [p: string]: Array<ArticleResponse> } = {};
  topicsArray: { name: string; articles: Array<ArticleResponse> }[] = [];

  constructor(private articleService: ArticlesService) {}

  ngOnInit(): void {
    this.articleService.getArticlesGroupedByTopic().subscribe((data) => {
      this.topics = data;

      // Преобразование данных в массив
      this.topicsArray = Object.keys(data).map((key) => ({
        name: key,
        articles: data[key],
      }));
    });
  }

  // Сохранение приоритетов
  savePriorities(topicName: string): void {
    const topic = this.topicsArray.find((t) => t.name === topicName);
    if (!topic) return;

    const updates = topic.articles.map((article) => ({
      id: article.id,
      priority: article.priority ?? 1,
    }));

    // Оборачиваем массив обновлений в объект с полем 'body'
    const requestPayload = {
      body: updates
    };

    this.articleService.updateArticlePriorities(requestPayload).subscribe(() => {
      console.log(`Priority for topic "${topicName}" saved!`);
    });
  }



  // Проверка, что все статьи имеют приоритет
  allArticlesHavePriorities(articles: Array<ArticleResponse>): boolean {
    return articles.every((article) => article.priority !== undefined && article.priority > 0);
  }

  // Визуализация выбранной темы
  visualizeTopic(topicName: string): void {
    console.log(`Визуализация темы: ${topicName}`);
    // Здесь будет логика перехода на страницу визуализации.
  }

}

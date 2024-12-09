import {Component, OnInit} from '@angular/core';
import {ArticlesService} from "../../../../services/services/articles.service";
import {Router} from "@angular/router";
import {ArticleResponse} from "../../../../services/models/article-response";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent implements OnInit {
  articleResponse: ArticleResponse[] = [];

  constructor(private articleService: ArticlesService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.findAllArticles();
  }

  private findAllArticles() {
    this.articleService.getArticles()
      .subscribe({
        next: (article) => {
          this.articleResponse = article;
        }
      });
  }
}

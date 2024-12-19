import {Component, OnInit} from '@angular/core';
import {ArticlesService} from "../../../../services/services/articles.service";
import {Router} from "@angular/router";
import {ArticleResponse} from "../../../../services/models/article-response";
import {NgForOf} from "@angular/common";
import {deleteArticle} from "../../../../services/fn/articles/delete-article";

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
  articles: any[] = [];


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

  archiveArticle(articleId: number | undefined): void {
    if (!articleId) {
      console.error('Error: article ID is missing or invalid');
      return;
    }

    const params = {id: articleId};

    this.articleService.archiveArticle(params).subscribe({
      next: () => {
        console.log(`Article ${articleId} archived successfully`);

        // Удаляем статью из текущего списка articleResponse
        this.articleResponse = this.articleResponse.filter(article => article.id !== articleId);

        // Перенаправляем пользователя на страницу 'Archived Articles'
        this.router.navigate(['article/archived-articles']);
      },
      error: (err) => console.error('Error archiving article:', err)
    });
  }

  deleteArticle(articleId: number | undefined): void {
    if (!articleId) {
      console.error('Error: article ID is missing or invalid');
      return;
    }

    const params = {id: articleId};

    this.articleService.deleteArticle(params).subscribe({
      next: () => {
        console.log(`Article ${params} deleted successfully`);
        this.findAllArticles()
      },
      error: (err) => {
        console.error('Error deleting article:', err);
      },
    });
  }
}

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
  archiveArticle(articleId: number | string | undefined): void {
    if (!articleId) {
      console.error('Error: article ID is missing or invalid');
      return;
    }

    // Явное преобразование в число
    const longId = Number(articleId);

    if (isNaN(longId)) {
      console.error('Error: Invalid article ID (not a number)');
      return;
    }

    const params = { id: longId };

    this.articleService.archiveArticle(params).subscribe({
      next: () => {
        console.log(`Article ${longId} archived successfully`);
        this.articleResponse = this.articleResponse.filter(article => article.id !== longId);
        this.router.navigate(['article/archived-articles']);
      },
      error: (err) => console.error('Error archiving article:', err)
    });
  }



}

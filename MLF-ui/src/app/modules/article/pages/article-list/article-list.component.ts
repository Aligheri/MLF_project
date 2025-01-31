import {Component, OnInit} from '@angular/core';
import {ArticlesService} from "../../../../services/services/articles.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleResponse} from "../../../../services/models/article-response";
import {NgForOf, NgIf} from "@angular/common";
import {BubbleChartModule, NgxChartsModule} from "@swimlane/ngx-charts";
import {Article} from "../../../../services/models/article";
import {
  AttachDialogComponentComponent
} from "../../components/attach-dialog-component/attach-dialog-component.component";
import {TopicContollerService} from "../../../../services/services/topic-contoller.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [
    NgForOf,
    BubbleChartModule,
    NgIf,
    NgxChartsModule
  ],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent implements OnInit {
  articleResponse: ArticleResponse[] = [];
  articles: any[] = [];


  constructor(private articleService: ArticlesService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private topicService: TopicContollerService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const topicId = params['topicId'];
      if (topicId) {
        this.findAllArticlesByTopic(topicId);
      } else {
        this.findAllArticles();
      }
    });
  }


  private findAllArticles() {
    this.articleService.getArticles()
      .subscribe({
        next: (article) => {
          this.articleResponse = article;
        }
      });
  }

  private findAllArticlesByTopic(topicId: number) {
    this.articleService.getArticlesByTopic({topicId})
      .subscribe({
        next: (article) => {
          this.articleResponse = article
        }
      })
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

        this.articleResponse = this.articleResponse.filter(article => article.id !== articleId);

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

  attachArticleToTopic(articleId: number, topicId: number): void {
    const body = {[topicId]: [articleId]}; // Формат запроса
    if (!articleId) {
      console.error('Error: Article ID is undefined');
      return;
    }
    this.topicService.assignArticlesToTopics({body}).subscribe({
      next: () => {
        console.log(`Article ${articleId} attached to topic ${topicId}`);
        alert('Article successfully attached to the topic!');
      },
      error: (err) => {
        console.error('Error attaching article:', err);
        alert('Failed to attach article.');
      },
    });
  }

  openAttachDialog(article: Article): void {
    const dialogRef = this.dialog.open(AttachDialogComponentComponent, {
      width: '400px',
      data: {article},
    });

    dialogRef.afterClosed().subscribe((selectedTopicId: number) => {
      if (selectedTopicId) {
        if (!article.id) {
          console.error('Error: Article ID is undefined');
          return;
        }

        this.attachArticleToTopic(article.id, selectedTopicId);
      }
    });
  }
}

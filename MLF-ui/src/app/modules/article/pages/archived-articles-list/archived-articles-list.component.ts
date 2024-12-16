import { Component } from '@angular/core';
import {ArticlesService} from "../../../../services/services/articles.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-archived-articles-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './archived-articles-list.component.html',
  styleUrl: './archived-articles-list.component.scss'
})
export class ArchivedArticlesListComponent {
  archivedArticles: any[] = [];

  constructor(private articleService: ArticlesService) {}

  ngOnInit(): void {
    this.loadArchivedArticles();
  }

  loadArchivedArticles(): void {
    this.articleService.getArchivedArticles().subscribe({
      next: (data) => {
        this.archivedArticles = data;
      },
      error: (err) => console.error('Error fetching archived articles', err)
    });
  }

}

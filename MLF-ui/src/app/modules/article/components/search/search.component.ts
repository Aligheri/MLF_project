import {Component} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs";
import {Article} from "../../../../services/models/article";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {ArticlesService} from "../../../../services/services/articles.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchControl = new FormControl('');
  articles: Article[] = [];

  constructor(private articleService: ArticlesService) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((title) =>
          title ? this.articleService.findArticleByTitle({title}) : []
        )
      )
      .subscribe((articles) => (this.articles = articles));
  }

  highlightArticle(articleId?: number) {
    if (!articleId) return;

    setTimeout(() => {
      const articleElement = document.getElementById(`article-${articleId}`);
      if (articleElement) {
        articleElement.style.backgroundColor = 'yellow';
        setTimeout(() => articleElement.style.backgroundColor = '', 2000);
        articleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);
  }

}

import {Component} from '@angular/core';
import {ArticlesService} from "../../../../services/services/articles.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-add-article-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './add-article-component.component.html',
  styleUrl: './add-article-component.component.scss'
})
export class AddArticleComponentComponent {
  articleForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private articlesService: ArticlesService) {
    this.articleForm = this.fb.group({
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      title: ['', [Validators.required]], // Название статьи
    });
  }


  onSubmit(): void {
    if (this.articleForm.valid) {
      const formData = this.articleForm.value;

      const minimalArticleRequest = {
        title: formData.title,
        url: formData.url
      };

      this.articlesService.createMinimalArticle({body: minimalArticleRequest}).subscribe({
        next: (response) => {
          console.log('Article created successfully:', response);
          this.successMessage = 'Article successfully created!';
          this.errorMessage = null;
          this.articleForm.reset();
          setTimeout(() => (this.successMessage = null), 3000);
        },
        error: (error) => {
          console.error('Error creating article:', error);
          this.errorMessage = 'Failed to create article. Please try again.';
          setTimeout(() => (this.errorMessage = null), 3000);
        },
      });
    }
  }
}

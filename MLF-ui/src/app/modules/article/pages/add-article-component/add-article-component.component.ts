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
  selectedTopicId?: number; // Selected topic ID


  constructor(private fb: FormBuilder, private articleService: ArticlesService) {
    this.articleForm = this.fb.group({
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      title: ['', [Validators.required]],
      topicId: ['', [Validators.required]],
      priority: [1, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  onSubmit(): void {
    if (this.articleForm.valid && this.selectedTopicId) {
      const formData = this.articleForm.value;

      const params = {
        body: {
          url: formData.url,
          title: formData.title,
          topicId: this.selectedTopicId, // Pass topic ID instead of a string
          priority: formData.priority,
        },
      };

      this.articleService.createArticle(params).subscribe({
        next: (response) => {
          console.log('Article added successfully:', response);
          this.successMessage = 'Article successfully added!';
          this.errorMessage = null;
          this.articleForm.reset();
          setTimeout(() => (this.successMessage = null), 3000);
        },
        error: (error) => {
          console.error('Error adding article:', error);
          this.errorMessage = 'Failed to add article. Please try again.';
          this.successMessage = null;
          setTimeout(() => (this.errorMessage = null), 3000);
        },
      });
    } else {
      console.log('Form is invalid or topic is not selected');
      this.errorMessage = 'Please fill in all required fields correctly.';
      setTimeout(() => (this.errorMessage = null), 3000);
    }
  }
}

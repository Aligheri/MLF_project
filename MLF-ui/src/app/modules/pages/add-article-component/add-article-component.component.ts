import {Component} from '@angular/core';
import {ArticlesService} from "../../../services/services/articles.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-add-article-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './add-article-component.component.html',
  styleUrl: './add-article-component.component.scss'
})
export class AddArticleComponentComponent {
  articleForm: FormGroup;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private articleService: ArticlesService) {
    // Инициализация формы
    this.articleForm = this.fb.group({
      url: [''],
      title: [''],
      topic: ['']
    });
  }

  // Метод вызывается при отправке формы
  onSubmit(): void {
    if (this.articleForm.valid) {
      const formData = this.articleForm.value;

      const params = {
        body: {
          url: formData.url,
          title: formData.title,
          topic: formData.topic
        }
      };

      this.articleService.createArticle(params).subscribe({
        next: (response) => {
          console.log('Article added successfully:', response);
          this.successMessage = 'Article successfully added!';
          this.articleForm.reset(); // Сбрасываем форму
          setTimeout(() => (this.successMessage = null), 3000);
        },
        error: (error) => {
          console.error('Error adding article:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}

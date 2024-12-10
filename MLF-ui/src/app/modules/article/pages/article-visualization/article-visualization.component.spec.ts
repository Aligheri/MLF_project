import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleVisualizationComponent } from './article-visualization.component';

describe('ArticleVisualizationComponent', () => {
  let component: ArticleVisualizationComponent;
  let fixture: ComponentFixture<ArticleVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleVisualizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTopicsPageComponent } from './article-topics-page.component';

describe('ArticleTopicsPageComponent', () => {
  let component: ArticleTopicsPageComponent;
  let fixture: ComponentFixture<ArticleTopicsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleTopicsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleTopicsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

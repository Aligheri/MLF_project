import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicVisualizationComponent } from './topic-visualization.component';

describe('ArticleVisualizationComponent', () => {
  let component: TopicVisualizationComponent;
  let fixture: ComponentFixture<TopicVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicVisualizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

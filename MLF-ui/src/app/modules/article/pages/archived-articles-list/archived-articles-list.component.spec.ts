import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedArticlesListComponent } from './archived-articles-list.component';

describe('ArchivedArticlesListComponent', () => {
  let component: ArchivedArticlesListComponent;
  let fixture: ComponentFixture<ArchivedArticlesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivedArticlesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedArticlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

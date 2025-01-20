import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachDialogComponentComponent } from './attach-dialog-component.component';

describe('AttachDialogComponentComponent', () => {
  let component: AttachDialogComponentComponent;
  let fixture: ComponentFixture<AttachDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttachDialogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

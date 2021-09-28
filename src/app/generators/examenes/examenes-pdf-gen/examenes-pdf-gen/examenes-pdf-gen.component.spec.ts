import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesPdfGenComponent } from './examenes-pdf-gen.component';

describe('ExamenesPdfGenComponent', () => {
  let component: ExamenesPdfGenComponent;
  let fixture: ComponentFixture<ExamenesPdfGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenesPdfGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesPdfGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

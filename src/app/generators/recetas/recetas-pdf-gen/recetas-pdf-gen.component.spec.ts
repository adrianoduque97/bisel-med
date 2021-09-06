import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetasPdfGenComponent } from './recetas-pdf-gen.component';

describe('RecetasPdfGenComponent', () => {
  let component: RecetasPdfGenComponent;
  let fixture: ComponentFixture<RecetasPdfGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecetasPdfGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetasPdfGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

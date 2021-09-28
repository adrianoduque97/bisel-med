import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadosPdfGenComponent } from './certificados-pdf-gen.component';

describe('CertificadosPdfGenComponent', () => {
  let component: CertificadosPdfGenComponent;
  let fixture: ComponentFixture<CertificadosPdfGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificadosPdfGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadosPdfGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

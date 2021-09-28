import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenesPdfGenComponent } from './imagenes-pdf-gen.component';

describe('ImagenesPdfGenComponent', () => {
  let component: ImagenesPdfGenComponent;
  let fixture: ComponentFixture<ImagenesPdfGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenesPdfGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenesPdfGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

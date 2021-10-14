import { TestBed } from '@angular/core/testing';

import { RemovebgService } from './removebg.service';

describe('RemovebgService', () => {
  let service: RemovebgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemovebgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

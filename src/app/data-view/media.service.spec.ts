import { TestBed } from '@angular/core/testing';

import { DataViewMediaService } from './data-view-media.service';

describe('MediaService', () => {
  let service: DataViewMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataViewMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

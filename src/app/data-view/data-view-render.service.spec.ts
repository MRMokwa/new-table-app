import { TestBed } from '@angular/core/testing';

import { DataViewRenderService } from './data-view-render.service';

describe('DataViewRenderService', () => {
  let service: DataViewRenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataViewRenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

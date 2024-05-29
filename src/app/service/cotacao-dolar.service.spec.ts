import { TestBed } from '@angular/core/testing';

import { CotacaoDolarService } from './cotacao-dolar.service';

describe('CotacaoDolarService', () => {
  let service: CotacaoDolarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CotacaoDolarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

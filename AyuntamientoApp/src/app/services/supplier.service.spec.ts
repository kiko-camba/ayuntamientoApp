import { TestBed } from '@angular/core/testing';

import { SupplierService } from './supplier.service';

describe('SupplierServiceService', () => {
  let service: SupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

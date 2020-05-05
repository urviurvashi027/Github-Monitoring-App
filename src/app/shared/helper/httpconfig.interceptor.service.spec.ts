import { TestBed } from '@angular/core/testing';

import { HttpConfigInterceptor } from './httpconfig.interceptor';

describe('Httpconfig.InterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpConfigInterceptor = TestBed.get(HttpConfigInterceptor);
    expect(service).toBeTruthy();
  });
});

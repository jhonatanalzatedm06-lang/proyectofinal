import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { ServicioComidas } from './servicio-comida';

describe('ServicioComidas', () => {
  let service: ServicioComidas;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(ServicioComidas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { ContatoService } from './contato.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Constant } from '../../config/constant.config';

const API = `${Constant.api}/users`;

describe('ContatoService', () => {
  let service: ContatoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContatoService]
    });
    service = TestBed.inject(ContatoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all contacts with limit', () => {
    service.getAll().subscribe();
    const req = httpMock.expectOne(`${API}?limit=10`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should create a contact', () => {
    const contato = { firstName: 'John' };
    service.create(contato).subscribe();
    const req = httpMock.expectOne(`${API}/add`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(contato);
    req.flush({});
  });

  it('should update a contact', () => {
    const contato = { id: 1, firstName: 'Jane' };
    service.update(contato).subscribe();
    const req = httpMock.expectOne(`${API}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(contato);
    req.flush({});
  });

  it('should get a contact by id', () => {
    service.getById(1).subscribe();
    const req = httpMock.expectOne(`${API}/1`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should get contacts by name with query', () => {
    service.getByName('John').subscribe();
    const req = httpMock.expectOne(`${API}?limit=10&q=John`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should delete a contact by id', () => {
    service.deleteById(1).subscribe();
    const req = httpMock.expectOne(`${API}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});

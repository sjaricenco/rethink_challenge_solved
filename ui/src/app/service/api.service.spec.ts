import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock : HttpTestingController;
  let _Url = "http://localhost:8080/api/Contacts";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return a contact result', () => {
    service.getContacts().subscribe(result =>{
      expect(result).toBeTruthy();
      expect(result.results).toBeTruthy();
      expect(result.results.length).toEqual(1);
      console.log('result verified');
    });
    const req = httpMock.expectOne(_Url);
    expect(req.request.method).toBe('GET');
    req.flush({
      results :[
        {
          firstNme : 'Peter',
          lastName : 'Parker',
          email : 'ppparker@gmail.com'
        }
      ]
    });
  })
});

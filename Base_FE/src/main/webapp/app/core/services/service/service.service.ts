import { Injectable } from '@angular/core';
import { SERVER_API } from 'app/shared/constants/api-resource.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseUri = SERVER_API;
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  searchService(searchForm?: any): Observable<any> {
    return this.http.post(this.baseUri + '/service/searchService', searchForm);
  }

  save(data): Observable<any> {
    return this.http.post<any>(SERVER_API + '/service/add', data);
  }

  deleteService(id): Observable<any> {
    return this.http.get<any>(SERVER_API + '/service/deleteService/' + id);
  }

  getInfo(Id): Observable<any> {
    return this.http.get(SERVER_API + '/service/get-service-by-id/' + Id);
  }

  getAllService(): Observable<any> {
    return this.http.get(SERVER_API + '/service/getAllService');
  }
}

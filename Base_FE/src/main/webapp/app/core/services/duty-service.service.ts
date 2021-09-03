import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API } from 'app/shared/constants/api-resource.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DutyServiceService {
  private baseUri = SERVER_API;
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}
  save(data): Observable<any> {
    return this.http.post<any>(SERVER_API + '/serviceDuty/add', data);
  }
  search(searchForm?: any): Observable<any> {
    return this.http.post(this.baseUri + '/serviceDuty/search', searchForm);
  }
  delete(id): Observable<any> {
    return this.http.get<any>(SERVER_API + '/serviceDuty/delete/' + id);
  }
  getInfo(Id): Observable<any> {
    return this.http.get(SERVER_API + '/serviceDuty/get-serviceDuty-by-id/' + Id);
  }
}

import { Injectable } from '@angular/core';
import { SERVER_API } from 'app/shared/constants/api-resource.constants';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeySearch } from 'app/core/models/system-categories/keysearch.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {
  private baseUri = SERVER_API;
  private token = localStorage.getItem('token');
  constructor(private http: HttpClient) {}

  getListCustomer(obj: KeySearch): Observable<KeySearch> {
    return this.http.post<KeySearch>(this.baseUri + '/customer/getCustomerByCode', obj);
  }

  save(data): Observable<any> {
    return this.http.post<any>(this.baseUri + '/customer/add', data);
  }

  update(data): Observable<HttpResponse<any>> {
    return this.http.put<any>(SERVER_API + '/customer/update', data, { observe: 'response' });
  }

  deleteCustomer(id?: any): Observable<any> {
    return this.http.get<any>(SERVER_API + '/customer/deleteCustomer/' + id);
  }

  getCustomer(Id): Observable<any> {
    return this.http.get(SERVER_API + '/customer/getCustomerById/' + Id);
  }

  checkUserCode(code): Observable<any> {
    return this.http.get(SERVER_API + '/customer/check-code?code=' + code);
  }

  getListHistory(): Observable<any> {
    return this.http.get<HttpResponse<any>>(SERVER_API + '/customer/history');
  }

  getAllCustomer(): Observable<any> {
    return this.http.get<HttpResponse<any>>(SERVER_API + '/customer/get-all-customer');
  }

  searchCustomer(searchForm?: any): Observable<any> {
    return this.http.post<any>(this.baseUri + '/customer/getAllCustomer', searchForm);
  }
}

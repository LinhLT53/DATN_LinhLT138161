import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { SERVER_API } from 'app/shared/constants/api-resource.constants';
import { KeySearch } from 'app/core/models/system-categories/keysearch.model';

@Injectable({
  providedIn: 'root'
})
export class BookingRoomApi {
  private baseUri = SERVER_API;
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  searchBookingRoom(searchForm?: any): Observable<any> {
    return this.http.post(this.baseUri + '/room/onSearch', searchForm);
  }

  searchBookingRoomFuture(searchForm?: any): Observable<any> {
    return this.http.post(this.baseUri + '/booking/onSearch', searchForm);
  }

  save(data): Observable<any> {
    return this.http.post<any>(SERVER_API + '/booking/add', data);
  }

  addService(data): Observable<any> {
    return this.http.post<any>(SERVER_API + '/booking/addService', data);
  }

  getBookingService(bookingId): Observable<any> {
    return this.http.get(SERVER_API + '/booking/getAllServiceBooking/' + bookingId);
  }

  receive(data): Observable<any> {
    return this.http.put<any>(SERVER_API + '/booking/receive', data);
  }

  delete(data): Observable<any> {
    return this.http.delete<any>(SERVER_API + '/booking/delete/' + data);
  }

  getInfo(bookingRoomId): Observable<any> {
    return this.http.get<any>(SERVER_API + '/booking/getInfo/' + bookingRoomId);
  }

  getInfoBooking(Id): Observable<any> {
    return this.http.get(SERVER_API + '/booking/getInfo/' + Id);
  }

  getPayBooking(Id): Observable<any> {
    return this.http.get(SERVER_API + '/booking/getPay/' + Id);
  }

  updatePayBoook(Id, data): Observable<any> {
    return this.http.post(SERVER_API + '/booking/discountPay/' + Id, data);
  }

  getChart(data): Observable<any> {
    return this.http.post(SERVER_API + '/booking/getChart', data);
  }
}

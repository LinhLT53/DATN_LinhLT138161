import { Injectable } from '@angular/core';
import { SERVER_API } from 'app/shared/constants/api-resource.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private baseUri = SERVER_API;
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  search(searchForm?: any): Observable<any> {
    return this.http.post(this.baseUri + '/tour/onSearch', searchForm);
  }

  save(data): Observable<any> {
    return this.http.post<any>(SERVER_API + '/tour/add', data);
  }
  getInfo(Id): Observable<any> {
    return this.http.get(SERVER_API + '/tour/get-tour-by-id/' + Id);
  }
  ///
  deleteRoom(id): Observable<any> {
    return this.http.get<any>(SERVER_API + '/tour/delete/' + id);
  }

  getAsseList(): Observable<any> {
    return this.http.get(SERVER_API + '/asset/get-asset');
  }
  getRoomTypeList(): Observable<any> {
    return this.http.get(SERVER_API + '/roomType/get-room-tuype-All');
  }

  getAll(): Observable<any> {
    return this.http.get(SERVER_API + '/room/get-all-room');
  }

  getRoomFloorList(): Observable<any> {
    return this.http.get(SERVER_API + '/room/getAllFloor');
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
}

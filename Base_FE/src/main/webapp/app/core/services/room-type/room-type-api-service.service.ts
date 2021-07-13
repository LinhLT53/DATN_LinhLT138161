import { Injectable } from '@angular/core';
import { SERVER_API } from 'app/shared/constants/api-resource.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeApiServiceService {
  private baseUri = SERVER_API;
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  searchRoomType(searchForm?: any): Observable<any> {
    return this.http.post(this.baseUri + '/roomType/searchRoom', searchForm);
  }

  save(data): Observable<any> {
    return this.http.post<any>(SERVER_API + '/roomType/add', data);
  }

  deleteRoom(id): Observable<any> {
    return this.http.get<any>(SERVER_API + '/roomType/deleteRoom/' + id);
  }

  getInfo(Id): Observable<any> {
    return this.http.get(SERVER_API + '/roomType/get-room-by-id/' + Id);
  }

  getRoomTypeList(): Observable<any> {
    return this.http.get(SERVER_API + '/roomType/get-room-tuype-All');
  }
  getByIdAndType(Id, Type): Observable<any> {
    return this.http.get(SERVER_API + '/roomType/get-by-id-type/' + Id + '/' + Type);
  }

  getAll(): Observable<any> {
    return this.http.get(SERVER_API + '/roomType/get-all');
  }
}

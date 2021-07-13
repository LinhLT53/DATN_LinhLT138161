import { Injectable } from '@angular/core';
import { SERVER_API } from 'app/shared/constants/api-resource.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private baseUri = SERVER_API;
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  searchRoom(searchForm?: any): Observable<any> {
    return this.http.post(this.baseUri + '/promotion/searchPromotion', searchForm);
  }

  save(data): Observable<any> {
    return this.http.post<any>(SERVER_API + '/promotion/add', data);
  }

  deleteRoom(id): Observable<any> {
    return this.http.get<any>(SERVER_API + '/promotion/deletePromotion/' + id);
  }

  getInfo(Id): Observable<any> {
    return this.http.get(SERVER_API + '/promotion/get-promotion-by-id/' + Id);
  }

  getByCodeAndRoomType(id, roomType): Observable<any> {
    return this.http.get(SERVER_API + '/promotion/getByCodeAndRoomType/' + id + '/' + roomType);
  }

  getByRoomType(roomType): Observable<any> {
    return this.http.get(SERVER_API + '/promotion/getByRoomType/' + roomType);
  }
}

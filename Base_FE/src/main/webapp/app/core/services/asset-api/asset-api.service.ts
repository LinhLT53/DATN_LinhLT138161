import { Injectable } from '@angular/core';
import { SERVER_API } from 'app/shared/constants/api-resource.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetApiService {
  private baseUri = SERVER_API;
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  searchAsset(searchForm?: any): Observable<any> {
    return this.http.post(this.baseUri + '/asset/searchAseet', searchForm);
  }

  save(data): Observable<any> {
    return this.http.post<any>(SERVER_API + '/asset/add', data);
  }

  deleteAsset(id): Observable<any> {
    return this.http.get<any>(SERVER_API + '/asset/deleteAsset/' + id);
  }

  getInfo(Id): Observable<any> {
    return this.http.get(SERVER_API + '/asset/get-asset-by-id/' + Id);
  }
  getAsseList(): Observable<any> {
    return this.http.get(SERVER_API + '/asset/get-asset');
  }
}

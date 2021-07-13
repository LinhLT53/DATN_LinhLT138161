import { Injectable } from '@angular/core';
import {SERVER_API} from "app/shared/constants/api-resource.constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AsetServiceService {
  private baseUri = SERVER_API;
  private token = localStorage.getItem('token');
  constructor(private http: HttpClient) {
  }

  searchAsset(searchForm?: any): Observable<any> {
    return this.http.post(this.baseUri + '/asset/searchAseer', searchForm);
  }
}

import { Injectable } from '@angular/core';
import {SERVER_API} from "app/shared/constants/api-resource.constants";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {createRequestOption} from "app/shared/util/request-util";

@Injectable({
  providedIn: 'root'
})
export class PartServiceService {

  private baseUri = SERVER_API;
  constructor(private http: HttpClient) {
  }
  searchPart(searchForm?: any): Observable<any> {
    return this.http.post(this.baseUri + '/partner/searchPart', searchForm);
  }
  save(data): Observable<any> {
    return this.http.post<any>(SERVER_API + '/partner/add', data);
  }
  getInfo(Id): Observable<any> {
    return this.http.get(SERVER_API + '/partner/get-supplier-by-id/' + Id);
  }
  checkUserCode(code): Observable<any> {
    return this.http.get(SERVER_API + '/partner/check-usercode/' + code);
  }
  deleteHumanResources(id?: any): Observable<any> {
    return this.http.delete<any>(SERVER_API + '/partner/deleteSupplier/' + id);
  }

  findAll(data?: any): Observable<HttpResponse<any>> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: createRequestOption(data)
    }
    return this.http.get<HttpResponse<any>>(SERVER_API + "/partner/searchPart", httpOption);
  }

  getProvince(): Observable<any> {
    return this.http.get(SERVER_API + '/province/list');
  }
  delete(id?:any):Observable<any>{
    return this.http.delete<any>(SERVER_API + '/partner/delete/' + id);
  }


}

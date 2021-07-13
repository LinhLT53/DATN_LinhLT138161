import {Injectable} from '@angular/core';
import {SERVER_API} from "app/shared/constants/api-resource.constants";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {createRequestOption} from "app/shared/util/request-util";

@Injectable({
  providedIn: 'root'
})
export class WarehouseServicesService {
  private baseUri = SERVER_API;
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
  }

  // TanNV
  searchWarehouse(searchForm?: any): Observable<any> {
    return this.http.post(this.baseUri + '/warehouse/searchWarehouse', searchForm);
  }

  save(data): Observable<any> {
    return this.http.post<any>(SERVER_API + '/warehouse/add', data);
  }

  getInfo(Id): Observable<any> {
    return this.http.get(SERVER_API + '/warehouse/get-supplier-by-id/' + Id);
  }

  checkUserCode(code): Observable<any> {
    return this.http.get(SERVER_API + '/warehouse/check-usercode/' + code);
  }

  deleteWarehouse(id?: any): Observable<any> {
    return this.http.delete<any>(SERVER_API + '/warehouse/deletewarehouse/' + id);
  }

  findAll(data?: any): Observable<HttpResponse<any>> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: createRequestOption(data)
    }
    return this.http.get<HttpResponse<any>>(SERVER_API + "/warehouse/searchPart", httpOption);
  }

  getByPart(id?: any): Observable<any> {
    return this.http.get(SERVER_API + "/warehouse/searhPart?id=" + id)
  }

  getProvince(): Observable<any> {
    return this.http.get(SERVER_API + '/province/list');
  }


}

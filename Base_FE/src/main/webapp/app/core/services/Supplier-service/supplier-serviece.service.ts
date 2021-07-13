import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SERVER_API} from "app/shared/constants/api-resource.constants";

@Injectable({
  providedIn: 'root'
})
export class SupplierServieceService {
  private baseUri = SERVER_API;
  private token = localStorage.getItem('token');
  constructor(private http: HttpClient) {
  }
  searchSupplier(searchForm?: any): Observable<any> {
    return this.http.post(this.baseUri + '/supplier/searchSupplier', searchForm);
  }
  save(data): Observable<any> {
    return this.http.post<any>(SERVER_API + '/supplier/add', data);
  }
  getInfo(Id): Observable<any> {
    return this.http.get(SERVER_API + '/supplier/get-supplier-by-id/' + Id);
  }
  checkUserCode(code): Observable<any> {
    return this.http.get(SERVER_API + '/supplier/check-usercode/' + code);
  }
  deleteHumanResources(id?: any): Observable<any> {
    return this.http.delete<any>(SERVER_API + '/supplier/deleteSupplier/' + id);
  }
  getListSuppler(): Observable<any>{
    return this.http.get<any>(SERVER_API+"/supplier/listpart");
  }

}

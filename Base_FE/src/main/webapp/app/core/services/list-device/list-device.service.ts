import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {SERVER_API} from "app/shared/constants/api-resource.constants";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListDeviceService {

  private pathService = SERVER_API;

  constructor(
    private http: HttpClient
  ) {
  }

  save(data?: any): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post<any>(SERVER_API + "/deviceGroup/create", data, httpOption);
  }

  update(data?: any, id?: any): Observable<HttpResponse<any>> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post<HttpResponse<any>>(SERVER_API + "/deviceGroup/update/" + id, data, httpOption)
  }

  getAll(data?: any): Observable<HttpResponse<any>> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post<HttpResponse<any>>(SERVER_API + "/deviceGroup/search", data, httpOption)
  }

  getFindByCode(code?: any): Observable<any> {
    return this.http.get(SERVER_API + "/deviceGroup/findbyid/" + code)
  }
  getFindByCodeCustom(code?: any): Observable<any> {
    return this.http.get(SERVER_API + "/deviceGroup/findbycode/" + code)
  }
  getListDeviceGroup(id?: any): Observable<any> {
    return this.http.get(SERVER_API + "/deviceGroup/getListPart?id=" + id)
  }
  getListDeviceGroupNotId():Observable<any>{
    return this.http.get(SERVER_API+"/deviceGroup/searhListAll")
  }
  delete(id?:any):Observable<any>{
    return this.http.delete(SERVER_API+"/deviceGroup/delete/"+id)
  }

}

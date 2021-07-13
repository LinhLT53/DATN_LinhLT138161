import {Injectable} from '@angular/core';
import {SERVER_API} from "app/shared/constants/api-resource.constants";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeviceServiceService {
  private baseUri = SERVER_API;
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
  }

  searchAsset(searchForm?: any): Observable<any> {
    return this.http.post(this.baseUri + '/asset/searchAseer', searchForm);
  }

  getAll(data?: any): Observable<HttpResponse<any>> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post<HttpResponse<any>>(SERVER_API + "/device/search", data, httpOption)
  }

  getFindByCode(code?: any): Observable<any> {
    return this.http.get(SERVER_API + "/device/findbyid/" + code)
  }

  creart(data?: any): Observable<any> {
    return this.http.post(SERVER_API + "/device/creat", data);
  }

  update(data?: any, id?: any): Observable<any> {
    return this.http.post(SERVER_API + "/device/update?id=" + id, data);
  }

  getDataParTId(Request?: any, id?: any): Observable<any> {
    return this.http.post(SERVER_API + "/device/getListId?partId=" + id + "&Request=" + Request, null);
  }
  getDataParRetu(Request?: any): Observable<any> {
    return this.http.get(SERVER_API + "/device/getListFormRe?idRequest=" + Request);
  }

  getListyReturmByIdStus(Request?: any):Observable<any>{
    return this.http.get(SERVER_API + "/device/getListyReturmByIdStus?idReque=" + Request);
  }

  getListyReturmById(Request?: any,idPart?:any,idHummer?:any):Observable<any>{
    return this.http.get(SERVER_API + "/device/getListyReturmById?idReque=" + Request+"&partId="+idPart+"&idHummer="+idHummer);
  }

  getDeviceRetu(partId?:any,idHummer?:any):Observable<any>{
    return this.http.get(SERVER_API+"/device/getListyReturm?partId="+partId+"&idHummer="+idHummer)
  }

  dowloadExel(data?:any):Observable<any>{
    return this.http.post(this.baseUri + '/device/doImport',data, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  delete(id?:any):Observable<any>{
    return this.http.delete(SERVER_API+"/device/delete/"+id)
  }
}

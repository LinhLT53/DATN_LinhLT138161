import {Injectable} from '@angular/core';
import {SERVER_API_URL} from 'app/app.constants';
import {SERVER_API} from 'app/shared/constants/api-resource.constants';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {createRequestOption} from 'app/shared/util/request-util';
import {InvoiceSerialModel} from 'app/core/models/announcement-management/invoice-serial.model';
import {KeySearch} from 'app/core/models/system-categories/keysearch.model';

@Injectable({
  providedIn: 'root'
})
export class RequestFomApiService {
  currentOutsourcePlan: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.currentOutsourcePlan = new BehaviorSubject<any>(null);
  }

  getSearhAll(data?: any): Observable<any> {
    return this.http.post<any>(SERVER_API + "/request/srearh", data);
  }

  getByIdDeviceRequest(id?: any): Observable<any> {
    return this.http.get<any>(SERVER_API + "/deviceRequest/findbyid/" + id);
  }
  getByIdDeviceRequestAdd(id?: any): Observable<any> {
    return this.http.get<any>(SERVER_API + "/deviceRequestAdd/findbyid/" + id);
  }
  saveDeviceRequest(data?:any):Observable<any>{
    return this.http.post(SERVER_API+"/deviceRequest/creat",data);
  }
  updateDeviceRequest(data?:any,id?:any):Observable<any>{
    return this.http.put(SERVER_API+"/deviceRequest/update?id="+id,data);
  }
  saveDeviceRequestAdd(data?:any):Observable<any>{
    return this.http.post(SERVER_API+"/deviceRequestAdd/creat",data);
  }
  updateDeviceRequestAdd(data?:any,id?:any):Observable<any>{
    return this.http.put(SERVER_API+"/deviceRequestAdd/update?id="+id,data);
  }

  deleteFindyId(id?:any):Observable<any>{
    return this.http.delete<any>(SERVER_API+"/request/delete/"+id)
  }
  cannRequestAdd(data?:any,id?:any):Observable<any>{
    return this.http.post<any>(SERVER_API+"/deviceRequestAdd/cancelRequestAdd?id="+id,data);
  }
  goodRequestAdd(data?:any,id?:any):Observable<any>{
    return this.http.post<any>(SERVER_API+"/deviceRequestAdd/browserRequestAdd?id="+id,data);
  }

  cannRequest(data?:any,id?:any):Observable<any>{
    return this.http.post<any>(SERVER_API+"/deviceRequest/cancelRequest?id="+id,data);
  }
  goodRequest(data?:any,id?:any):Observable<any>{
    return this.http.post<any>(SERVER_API+"/deviceRequest/browserRequest?id="+id,data);
  }
  getByIdDeviceRequestRetu(id?: any): Observable<any> {
    return this.http.get<any>(SERVER_API + "/deviceRequestRetu/findbyid/" + id);
  }
  updateDeviceRequestetu(data?:any,id?:any):Observable<any>{
    return this.http.put(SERVER_API+"/deviceRequestRetu/update?id="+id,data);
  }
  saveDeviceRequestretu(data?:any):Observable<any>{
    return this.http.post(SERVER_API+"/deviceRequestRetu/creat",data);
  }
  cannRequestRetu(data?:any,id?:any):Observable<any>{
    return this.http.post<any>(SERVER_API+"/deviceRequestRetu/cancelRequest?id="+id,data);
  }
  goodRequestRetu(data?:any,id?:any):Observable<any>{
    return this.http.post<any>(SERVER_API+"/deviceRequestRetu/browserRequest?id="+id,data);
  }
}

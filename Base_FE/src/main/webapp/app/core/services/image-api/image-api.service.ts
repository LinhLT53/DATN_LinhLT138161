import {Injectable} from '@angular/core';
import {SERVER_API} from "app/shared/constants/api-resource.constants";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageApiService {
  private baseUri = SERVER_API;
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
  }

  save(idGroup?:any,idTyle?:any,data?:any){
    return this.http.post(this.baseUri + '/img/uploadImg/'+idTyle+"/"+idGroup,data );
  }
  getFile(data?:any): Observable<Blob>{
    return this.http.get(this.baseUri + '/img/sid/'+data,{ responseType: 'blob' });
  }
  getListDeviceGroup(data?:any): Observable<any>{
    return this.http.get(this.baseUri + '/img/deviceGroup/'+data);
  }
  update(idGroup?:any,idTyle?:any,data?:any){
    return this.http.post(this.baseUri + '/img/updateImg/'+idTyle+"/"+idGroup,data );
  }
  getListDevice(id?:any,idGroup?:any): Observable<any>{
    return this.http.get(this.baseUri + '/img/device/'+id+"/"+idGroup);
  }
}

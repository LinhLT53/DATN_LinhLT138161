import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import { SERVER_API } from 'app/shared/constants/api-resource.constants';
import {Observable} from "rxjs";
import {createRequestOption} from "app/shared/util/request-util";
@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  public resourceUrl = SERVER_API;

  constructor(private http: HttpClient) { }


  changePassword(data?: any): Observable<any> {
    return this.http.put(this.resourceUrl + '/humanResources/changePassword' , data);
  }

  checkPassword(data?: any): Observable<any>{
    return this.http.post(this.resourceUrl+'/humanResources/check-password',data);
  }

}

import { Injectable } from '@angular/core';
import {SERVER_API} from "app/shared/constants/api-resource.constants";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUri = SERVER_API;
  private token = localStorage.getItem('token');
  constructor(private http: HttpClient) {

  }
  //Hàm get thông báo
  findAllNotification(): Observable<any> {
    // const httpOption = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   }),
    // }
    return this.http.get(this.baseUri + "/notification/get-notification");
  }

  //Hàm update isseen
  updateIsSeen(): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }
    return this.http.put<Observable<any> >(this.baseUri + "/notification/update-isseen",httpOption);
  }


  //get thong bao user
  getNotiveUser(id?:any):Observable<any>{
    return this.http.get<Observable<any>>(this.baseUri+"/notification/notiviceUser/"+id);
  }

  getupdateUser(id?:any):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }
    return this.http.put<Observable<any>>(this.baseUri+"/notification/notiviceUser/"+id,httpOption);
  }


  //thon bao admin
  getNotiveAdmin(id?:any,idPart?:any):Observable<any>{
    return this.http.get<Observable<any>>(this.baseUri+"/notification/notiviceAdmin/"+idPart+"/"+id);
  }


  getupdateAdmin(id?:any,idhummer?:any):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }
    return this.http.put<Observable<any>>(this.baseUri+"/notification/notiviceAdmin/"+idhummer+"/"+id,httpOption);
  }


  //thon bao adminTong
  getNotiveAdminAll(id?:any):Observable<any>{
    return this.http.get<Observable<any>>(this.baseUri+"/notification/notiviceAdminAll/"+id);
  }


  getupdateAdminAll(id?:any,idhummer?:any):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }
    return this.http.put<Observable<any>>(this.baseUri+"/notification/notiviceAdminAll/"+idhummer+"/"+id,httpOption);
  }
}

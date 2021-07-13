import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {SERVER_API} from "app/shared/constants/api-resource.constants";
import {createRequestOption} from "app/shared/util/request-util";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RiskListService {
  columns = [
    {key: 0, value: "STT", isShow: true},
    {key: 1, value: "Hành động", isShow: true},
    {key: 2, value: "Mã dự án", isShow: true},
    {key: 3, value: "Tên dự án", isShow: true},
    {key: 4, value: "Rủi ro số", isShow: true},
    {key: 5, value: "PM/Teamleader", isShow: true},
    {key: 6, value: "Trạng thái tổng quan", isShow: true},
    {key: 7, value: "Rủi ro, vấn đề", isShow: true},
    {key: 8, value: "Hành động khắc phục", isShow: false},
    {key: 9, value: "Người khắc phục", isShow: true},
    {key: 10, value: "Trạng thái khắc phục", isShow: true},
    {key: 11, value: "Phân loại vấn đề", isShow: false},
    {key: 12, value: "Lesson learn/ Bài học kinh nghiệm", isShow: false},
    {key: 13, value: "Giải trình vấn đề/ Rủi ro", isShow: false},
    {key: 14, value: "Ghi chú", isShow: false},
  ];
  constructor(private http: HttpClient) { }

  findAll(data?: any): Observable<HttpResponse<any>> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: createRequestOption(data)
    };
    return this.http.get<HttpResponse<any>>(SERVER_API + "/risk/find-all", httpOption);
  }
  getListStatusFix(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(SERVER_API + '/app-param/getStatusFix');
  }

  getListStatusFixOnSearch(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(SERVER_API + '/app-param/getStatusFixOnSearch');
  }

  getRiskType(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(SERVER_API + '/app-param/getRiskType');
  }

  getByParType(type?: any): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(SERVER_API + '/app-param/getByParType/'+type);
  }

  getListProject(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(SERVER_API + '/project/getListProject');
  }

  getHumanResources(projectId?: any): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(SERVER_API + '/humanResources/getHumanResources/'+projectId);
  }

  getParName(projectId?: any): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(SERVER_API + '/project/getParName/'+projectId);
  }

  addRiskList(data): Observable<any> {
    return this.http.post<any>(SERVER_API + '/risk/add-risk', data);
  }

  getLeader(projectId?: any): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(SERVER_API + '/humanResources/getLeader/'+projectId);
  }

  findOne(riskId?: any): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(SERVER_API + '/risk/find-one/'+riskId);
  }

  deleteRisk(riskId?: any): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(SERVER_API + '/risk/delete-risk/'+riskId);
  }
  //dangnp

  confirmRiskStatus(data: any): Observable<any> {
    return this.http.post(SERVER_API + '/risk/confirm-risk',data);
  }
  checkIsQM(id:any):Observable<any>{
    return this.http.post(SERVER_API+'/risk/check-role',id);
  }

  //nuctv
  getHistory():Observable<any>{
    return this.http.get(SERVER_API+'/risk/history');
  }
  getHistoryByID(id:any):Observable<any>{
    return this.http.get(SERVER_API+'/risk/history/'+id);
  }
}

import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {SERVER_API} from "app/shared/constants/api-resource.constants";
import {createRequestOption} from "app/shared/util/request-util";


@Injectable({
  providedIn: 'root'
})
export class IssuesMemberService {
  columns = [
    {key: 0, value: "Mã dự án", isShow: true},
    {key: 1, value: "Vấn đề số", isShow: true},
    {key: 2, value: "PM/Team Lead", isShow: true},
    {key: 3, value: "Người tạo", isShow: true},
    {key: 4, value: "Người xử lý", isShow: true},
    {key: 5, value: "Thời gian tạo", isShow: false},
    {key: 6, value: "Thời gian xử lý", isShow: false},
    {key: 7, value: "Mức độ ưu tiên", isShow: false},
    {key: 8, value: "Mức độ nghiêm trọng", isShow: false},
    {key: 9, value: "Thời gian xử lý thực tế", isShow: false},
    {key: 10, value: "Trạng thái khắc phục", isShow: true},
    {key: 11, value: "Vấn đề", isShow: true},
    {key: 12, value: "Mô tả", isShow: false},
    {key: 13, value: "Nguyên nhân", isShow: false},
    {key: 14, value: "Giải pháp", isShow: false},
    {key: 15, value: "Bài học rút ra", isShow: false},
  ];
  private baseUri = SERVER_API;
  private token = localStorage.getItem('token');
  constructor(private http: HttpClient) {

  }
  //hàm đồng bộ
  synchronizedIssue():Observable<any>{
    return this.http.get(this.baseUri + '/issue-member/synchronized-issues');
  }

  //hàm lấy danh sách
  findAll(data?: any): Observable<HttpResponse<any>> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: createRequestOption(data)
    }
    return this.http.post<HttpResponse<any>>(this.baseUri + "/issue-member/search-issue-member", data,httpOption);
  }

  //hàm láy status issues
  findAllStatus(): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }
    return this.http.get<HttpResponse<any>>(this.baseUri + "/issue-member/status-issues-member",httpOption);
  }
}

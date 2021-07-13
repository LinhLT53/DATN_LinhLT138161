import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {createRequestOption} from 'app/shared/util/request-util';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {KeySearch} from 'app/core/models/system-categories/keysearch.model';

import {SERVER_API} from 'app/shared/constants/api-resource.constants';
import {edituserModel} from 'app/core/models/system-categories/edit-user.model';
import {TranslateService} from "@ngx-translate/core";
import {ToastService} from "app/shared/services/toast.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationCategoriesService {
  columns = [
    {key: 0, value: "Mã dự án", isShow: true},
    {key: 1, value: "Tên dự án", isShow: true},
    {key: 2, value: "Đối tác", isShow: true},
    {key: 3, value: "PM/Team Lead", isShow: true},
    {key: 4, value: "Test Leader", isShow: true},
    {key: 5, value: "QA Manager", isShow: false},
    {key: 6, value: "BA Manager", isShow: false},
    {key: 7, value: "Trạng thái tổng quan", isShow: true},
    {key: 8, value: "Trạng thái chi tiết", isShow: false},
    {key: 9, value: "Thời gian nhận task/dự án", isShow: false},
    {key: 10, value: "PM khách hàng", isShow: false},
    {key: 11, value: "Phạm vi yêu cầu", isShow: false},
    {key: 12, value: "Đầu mối", isShow: false},
    {key: 13, value: "Ngày khách hàng mong muốn hoàn thành", isShow: true},
    {key: 14, value: "Master Plan", isShow: false},
    {key: 15, value: "UNLN sơ bộ", isShow: false},
    {key: 16, value: "ULNL thực tế (nội bộ)", isShow: true},
    {key: 17, value: "ULNL chào giá", isShow: false},
    {key: 18, value: "ULNL KH phê duyệt (MM)", isShow: true},
    {key: 19, value: "Ngày gửi khách hàng kế hoạch", isShow: false},
    {key: 20, value: "Ngày dự kiến bắt đầu", isShow: false},
    {key: 21, value: "Ngày bàn giao KBKT", isShow: true},
    {key: 22, value: "Thực tế bàn giao KBKT", isShow: true},
    {key: 23, value: "Ngày hoàn thành dự kiến", isShow: true},
    {key: 24, value: "Ngày hoàn thành thực tế", isShow: true},
    {key: 25, value: "Tiến độ BA(%)", isShow: true},
    {key: 26, value: "Tiến độ Dev (%)", isShow: true},
    {key: 27, value: "Tiến độ Test (%)", isShow: true},
    {key: 28, value: "Tiến độ tài liệu TKCT (%)", isShow: true},
    {key: 29, value: "Tiến độ KBKT (%)", isShow: true},
    {key: 30, value: "Tiến độ Retest/Fixbug (%)", isShow: true},
    {key: 31, value: "Ghi chú", isShow: false},
  ];
  private baseUri = SERVER_API;

  constructor(private _http: HttpClient,
              private translateService: TranslateService,
              private toastService: ToastService) {

  }

  insertDB(): Observable<any> {
    return this._http.get<any>(this.baseUri + '/redmineUser');
  }

  search(searchForm: any): Observable<any> {
    return this._http.post<any>(this.baseUri + '/humanResources/info', searchForm);
  }

  searchProject(searchForm: any): Observable<any> {
    return this._http.post<any>(this.baseUri + '/project/searchProject', searchForm);
  }

  getListProjectMember(dto: any): Observable<any> {
    return this._http.post<any>(this.baseUri + '/projectMember/getListMemberProject', dto);
  }

  save(data): Observable<any> {
    return this._http.post<any>(this.baseUri + '/organization/insertOrUpdate', data);
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this._http.get<any>(this.baseUri + '/organization/delete/' + id);
  }

  deleteProject(id: number): Observable<HttpResponse<any>> {
    return this._http.get<any>(this.baseUri + '/project/deleteProject/' + id);
  }

  getHistoryProject(): Observable<any> {
    return this._http.get<any>(this.baseUri + '/project/getHistoryProject');
  }


  deleteProjects(projectId): Observable<HttpResponse<any>> {
    const options = createRequestOption()
      .append('projectId', projectId)
    return this._http.get<[]>(SERVER_API + '/project/deleteProject', {
      params: options,
      observe: 'response'
    });
  }

  getParentsUpdate(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this._http.get<[]>(this.baseUri + '/organization/getParentsUpdate', {params: options, observe: 'response'});
  }

  getParents(obj: any): Observable<KeySearch> {
    return this._http.post<KeySearch>(this.baseUri + '/humanResources/getListUserByNameOrCode', obj);
  }

  getPartnerInfo(obj: any): Observable<KeySearch> {
    return this._http.get<KeySearch>(this.baseUri + '/customer/unitSearchCustomer?key='+ obj);
  }

  saveEstimate(obj): Observable<any> {
    return this._http.post<any>(this.baseUri + '/project/saveEstimate', obj);
  }

  searchHumanResource(obj: KeySearch): Observable<KeySearch> {
    return this._http.post<KeySearch>(this.baseUri + '/humanResources/getListUserByNameOrCode', obj);
  }

  countProjectMember(depart, projectId, role): Observable<HttpResponse<any>> {
    const options = createRequestOption()
      .append('department', depart)
      .append('projectId', projectId)
      .append('role', role)
    return this._http.get<[]>(SERVER_API + '/project/countMember', {
      params: options,
      observe: 'response'
    });
  }

  getColumns() {
    return this.columns;
  }


  getStatusOverviewList(obj: KeySearch): Observable<KeySearch> {
    return this._http.post<KeySearch>(this.baseUri + '/app-param/getAppParam', obj);
  }

  checkCodeAdd(req?: any): Observable<HttpResponse<any>> {
    const options = createRequestOption(req);
    return this._http.get<[]>(this.baseUri + '/organization/checkCode', {params: options, observe: 'response'});
  }

  downloadFileExcel(fileName?: any): Observable<any> {
    return this._http.get(this.baseUri + '/organization/download-excel-template?fileName=' + fileName, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  doImport(file: File): Observable<HttpResponse<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this._http.post(this.baseUri + '/organization/import-excel', formData, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  edit(data, file: File[]): Observable<any> {
    const formData: FormData = new FormData();
    formData.append(
      'data',
      new Blob([JSON.stringify(data)], {
        type: 'application/json'
      })
    );
    if (file) {
      for (let i = 0; i < file.length; i++) {
        formData.append('listAttachDocument', file[i]);
      }
    }
    return this._http.post(SERVER_API + '/project/editProject', formData);
  }


  // saveProject(data, file: File[]): Observable<edituserModel> {
  //
  //   return this._http.post<edituserModel>(this.baseUri + '/project/saveProject', data);
  // }

  saveProject(data, file: File[]): Observable<HttpResponse<any>> {
    const formData: FormData = new FormData();
    formData.append(
      'data',
      new Blob([JSON.stringify(data)], {
        type: 'application/json'
      })
    );
    if (file) {
      for (let i = 0; i < file.length; i++) {
        formData.append('listAttachDocument', file[i]);
      }
    }

    return this._http.post(SERVER_API + '/project/saveProject', formData, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  saveHumanToProject(data): Observable<edituserModel> {
    return this._http.post<edituserModel>(this.baseUri + '/projectMember/saveProjectMember', data);
  }


  checkCodeExist(code): Observable<HttpResponse<any>> {
    const options = createRequestOption()
      .append('code', code)
    return this._http.get<[]>(SERVER_API + '/project/checkCodeExist', {
      params: options,
      observe: 'response'
    });
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    console.warn("12321", file)
    const req = new HttpRequest('POST', `${this.baseUri}/project/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this._http.request(req);
  }


  getProjectById(projectId: any): Observable<any> {
    return this._http.post<any>(this.baseUri + `/project/searchProject`, projectId);
  }

  //nuctv 29/07
  updateRedmineLink(req ?: any): Observable<any> {
    return this._http.put<any>(this.baseUri + '/project-progress/save-link-redmine', req);
  }

  getLinkRedmineByprojectID(projectID): Observable<any> {
    const options = createRequestOption()
      .append('projectID', projectID)
    return this._http.get<any>(this.baseUri + '/project-progress/get-link-redmine', {
      params: options
    })
  }

  synchronized(): Observable<any> {
    return this._http.get(SERVER_API + '/project-progress/synchronized-with-redmine');
  }

  checkLink(data: any): Observable<any> {
    return this._http.post(SERVER_API + '/project-progress/check-link', data);
  }

  // getFiles(): Observable<any> {
  //   return this._http.get(`${this.baseUri}/files`);
  // }
  getHistory(id: any): Observable<any> {
    return this._http.get(SERVER_API + '/projectMember/history/' + id)
  }

  findAllLeader(): Observable<any> {
    return this._http.get(SERVER_API + '/humanResources/findAllLeader');
  }

}

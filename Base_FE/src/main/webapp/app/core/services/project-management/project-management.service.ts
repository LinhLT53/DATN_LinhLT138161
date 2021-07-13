import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { SERVER_API } from 'app/shared/constants/api-resource.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { createRequestOption } from 'app/shared/util/request-util';
import { InvoiceSerialModel } from 'app/core/models/announcement-management/invoice-serial.model';
import { KeySearch } from 'app/core/models/system-categories/keysearch.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagementService {
  currentOutsourcePlan: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.currentOutsourcePlan = new BehaviorSubject<any>(null);
  }

  search(data): Observable<HttpResponse<any>> {
    const options = createRequestOption();
    return this.http.post<[]>(SERVER_API + '/project-management/search', data, {
      params: options,
      observe: 'response'
    });
  }

  // get user list from sys_user
  getUserList(page, limit, keyWork): Observable<HttpResponse<any>> {
    const options = createRequestOption()
      .append('name', keyWork)
      .append('email', keyWork)
      .append('page', page)
      .append('size', limit);
    return this.http.get<[]>(SERVER_API + '/user/searchByEmailOrName', {
      params: options,
      observe: 'response'
    });
  }

  saveProjectManagement(data): Observable<HttpResponse<any>> {
    const options = createRequestOption();
    return this.http.post<[]>(SERVER_API + '/project-management/save', data, {
      params: options,
      observe: 'response'
    });
  }

  deleteProject(id): Observable<HttpResponse<any>> {
    const options = createRequestOption().append('id', id);
    return this.http.delete<[]>(SERVER_API + '/project-management/delete', {
      params: options,
      observe: 'response'
    });
  }

  /**
   * Hungnd create 5/6/2020
   * check project code exist
   */
  checkpmCodeExist(code): Observable<HttpResponse<any>> {
    const options = createRequestOption().append('code', code);
    return this.http.get<[]>(SERVER_API + '/project-management/checkPmCodeExist', {
      params: options,
      observe: 'response'
    });
  }

  /**
   * Hungnd create 6/6/2020
   * navigative data
   */
  navigation(data) {
    this.currentOutsourcePlan.next(data);
  }

  /**
   * Hungnd create 12/06/2020
   * Can delete ?
   */
  checkDeleteProject(id): Observable<HttpResponse<any>> {
    const options = createRequestOption().append('id', id);
    return this.http.get<[]>(SERVER_API + '/project-management/checkDelete', {
      params: options,
      observe: 'response'
    });
  }

  downloadFileExcel(fileName?: any): Observable<any> {
    return this.http.get(SERVER_API + '/project-management/download-excel-template?fileName=' + fileName, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  doImport(file: File): Observable<HttpResponse<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(SERVER_API + '/project-management/import-excel', formData, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  getListProjectByNameOrCode(obj: KeySearch):  Observable<any> {
    return this.http.post(SERVER_API + '/project/getListProjectByNameOrCode', obj);
  }

}

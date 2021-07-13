import { SERVER_API } from './../../../shared/constants/api-resource.constants';
import { AppParamModel } from './../../models/profile-management/app-param.model';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createRequestOption } from 'app/shared/util/request-util';
import { Observable } from 'rxjs';
import { PofileManagementModel } from 'app/core/models/profile-management/profile-management.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileManagementService {
  public resourceUrl = SERVER_API;

  constructor(private http: HttpClient) {}

  search(searchForm?: any): Observable<any> {
    return this.http.post<any>(this.resourceUrl + '/partnerCapacityProfile/findAll', searchForm);
  }

  getCityList(): Observable<any> {
    const param = new HttpParams().set('paramCode', 'DL_TT');
    return this.http.get<[AppParamModel]>(this.resourceUrl + '/partnerCapacityProfile/findAllType', { params: param, observe: 'response' });
  }

  getGroupParterList(): Observable<any> {
    const param = new HttpParams().set('paramCode', 'DL_NDT');
    return this.http.get<[AppParamModel]>(this.resourceUrl + '/partnerCapacityProfile/findAllType', { params: param, observe: 'response' });
  }

  getPartnerCategoryList(): Observable<any> {
    const param = new HttpParams().set('paramCode', 'DL_LDT');
    return this.http.get<[AppParamModel]>(this.resourceUrl + '/partnerCapacityProfile/findAllType', { params: param, observe: 'response' });
  }

  deletePartnerProfile(id: any): Observable<any> {
    const options = createRequestOption(id);
    return this.http.get<any>(this.resourceUrl + '/partnerCapacityProfile/deleteById', {
      params: options,
      observe: 'response'
    });
  }

  exportFileExcel(id: any): Observable<any> {
    const options = createRequestOption(id);
    return this.http.get(this.resourceUrl + '/partnerCapacityProfile/exportExcel', {
      responseType: 'blob',
      params: options,
      observe: 'response'
    });
  }

  // thanhnb IIST 11/06/2020
  downloadTemplateFileExcel(): Observable<any> {
    return this.http.get(this.resourceUrl + '/partnerCapacityProfile/download-excel-template', {
      responseType: 'blob',
      observe: 'response'
    });
  }

  /**
   * thanhnb IIST 11/06/2020
   * upload file
   * @param file
   */
  doImport(file: File): Observable<HttpResponse<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(this.resourceUrl + '/partnerCapacityProfile/export-excel', formData, {
      responseType: 'blob',
      observe: 'response'
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../../shared/util/request-util';
import { ContractManagerModel } from '../../../core/models/contract-manager/contract-manager.model';
import { SERVER_API_URL } from '../../../app.constants';
import { SERVER_API } from '../../../shared/constants/api-resource.constants';
import { BehaviorSubject } from 'rxjs';
import {KeySearch} from "app/core/models/system-categories/keysearch.model";

@Injectable({
  providedIn: 'root'
})
export class ContractManagerService {
  public resourceUrl = SERVER_API;
  //trangnc cho hiển thị xem
  currentInvoice: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    //trangnc cho hiển thị xem
    this.currentInvoice = new BehaviorSubject<any>(null);
  }

  query(dataSearch?: any) {
    const options = createRequestOption(dataSearch);
    return this.http.get<any>(this.resourceUrl + '/outsourcingContract/findByField', dataSearch);
  }

  deleteById(id?: any) {
    const options = createRequestOption(id);
    return this.http.delete<any>(this.resourceUrl + '/outsourcingContract/delete/' + id);
  }

  findByField(dataSearch?: any) {
    const options = createRequestOption(dataSearch);
    return this.http.post<any>(this.resourceUrl + '/outsourcingContract/findByField', dataSearch);
  }

  fetchAll(searchData: any) {
    return this.http.post<any>(this.resourceUrl + '/outsourcingContract/findByField', searchData);
  }

  getSignStatusOrContractStatus(type: any) {
    return this.http.get(this.resourceUrl + '/app_param/findByParamType?paramType=' + type);
  }

  getAllPartnerCode(code: any) {
    return this.http.get(this.resourceUrl + '/partnerCapacityProfile/getAllEntity?code=' + code);
  }

  // trangnc autocomplete cho ma dự án
  getAllProjectCode(code: any) {
    return this.http.get(this.resourceUrl + '/project-management/getAllEntity?code=' + code);
  }

  // trangnc get all plan theo planstatus = 'phê duyệt'
  getAllPlanFollowApprove() {
    return this.http.get(this.resourceUrl + '/outsourcing-plan/getAllEntity');
  }


  //Trangnc insert Data
  doInsertData(data: any) {
    return this.http.post<any>(this.resourceUrl + '/outsourcingContract/insertOrUpdate', data);
  }

  // Trangnc get data by Email or Name (Đầu mối đề nghị hợp tác)
  doSearchEmailOrName(search: any) {
    return this.http.get<any>(this.resourceUrl + '/user/getAllEntity?code=', search);
  }

  //trangnc lay don vi kinh doanh,dau moi kinh doanh, don vi san xuat, dau moi ky thuat theo ke hoach thue ngoai
  getBusiness(khtn: any) {
    return this.http.get<any>(this.resourceUrl + '/project-management/getbusiness?khtn=' + khtn);
  }

  // trangnc save thong tin no luc thuc te
  doInsertDataTNLTT(data: any) {
    return this.http.post<any>(this.resourceUrl + '/actual-effort/insertOrUpdate', data);
  }

  //trangnc cho hiển thị xem
  changeInvoice(invoice) {
    this.currentInvoice.next(invoice);
  }

  //trangnc lấy danh sách thông tin nỗ lực sử dụng thực tế theo contractID
  getListBycontractID(id: any) {
    return this.http.get<any>(this.resourceUrl + '/actual-effort/findByContractCode?code=' + id);
  }
  //trangnc
  getPartnerCodeById(id: any) {
    return this.http.get<any>(this.resourceUrl + '/partnerCapacityProfile/getById?id=' + id);
  }
  // QuangHN Start

  downloadTempFileExcel(): Observable<any> {
    return this.http.get(this.resourceUrl + '/outsourcingContract/download-excel-template', {
      responseType: 'blob',
      observe: 'response'
    });
  }
  // QuangHN End
}

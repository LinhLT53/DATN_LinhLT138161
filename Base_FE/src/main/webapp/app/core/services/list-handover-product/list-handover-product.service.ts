import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/shared/util/request-util';
import { SERVER_API } from 'app/shared/constants/api-resource.constants';
import { ListHandoverProduct } from "app/core/models/list-handover-product/list-handover-product.model";

@Injectable({
  providedIn: 'root'
})
export class ListHandoverProductService {
  public resourceUrl = SERVER_API;
  constructor(private http: HttpClient) {}

  getProductList(projectId: number): Observable<ListHandoverProduct[]> {
    return this.http.get<ListHandoverProduct[]>(this.resourceUrl + '/productHandover/viewProducts/'+projectId).pipe();
  }

  getHistoryProductList(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(this.resourceUrl + '/productHandover/viewHistoryProducts/'+projectId).pipe();
  }

  save(data): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.resourceUrl + '/productHandover/saveProducts', data, { observe: 'response' });
  }

  saveHistory(data): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.resourceUrl + '/productHandover/saveHistoryProducts', data, { observe: 'response' });
  }

  delete(data): Observable<HttpResponse<any>> {
    return this.http.post<[]>(this.resourceUrl + '/productHandover/deleteProducts', data, { observe: 'response' });
  }

  exportData(id?: any): Observable<any> {
    return this.http.get(this.resourceUrl + '/productHandover/exportFile/'+ id , {
      responseType: 'blob',
      observe: 'response'
    });
  }
}

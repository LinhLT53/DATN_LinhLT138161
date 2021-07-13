import { Injectable } from '@angular/core';
import { SERVER_API } from 'app/shared/constants/api-resource.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/shared/util/request-util';

@Injectable({
  providedIn: 'root'
})
export class LiabilitiesOrganizationPartnerService {
  public resourceUrl = SERVER_API;
  constructor(private http: HttpClient) {}

  getAll(req?: any): Observable<HttpResponse<any>> {
    const options = createRequestOption(req);
    return this.http.get<[]>(this.resourceUrl + '/liability-organ-partner-report/get-list', {
      params: options,
      observe: 'response'
    });
  }

  exportExcel(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get(this.resourceUrl + '/liability-organ-partner-report/export-excel', {
      params: options,
      responseType: 'blob',
      observe: 'response'
    });
  }
}

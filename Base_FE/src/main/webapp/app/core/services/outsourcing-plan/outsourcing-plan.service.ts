import { Injectable } from '@angular/core';
import { SERVER_API } from 'app/shared/constants/api-resource.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/shared/util/request-util';
import { OutsourcingPlanInput } from 'app/core/models/outsourcing-plan/outsouring-plan-input';

@Injectable({
  providedIn: 'root'
})
export class OutsourcingPlanService {
  constructor(private http: HttpClient) {}

  search(data): Observable<HttpResponse<any>> {
    const options = createRequestOption();
    return this.http.post<[]>(SERVER_API + '/outsourcing-plan/search', data, {
      params: options,
      observe: 'response'
    });
  }

  /*  ThucDV mofifi start 08/06/2020*/
  /* save(data): Observable<HttpResponse<any>> {
    return this.http.post<OutsourcingPlanInput>(SERVER_API + '/outsourcing-plan/save', data, { observe: 'response' });
  }*/

  downloadFileExcel(fileName?: any): Observable<any> {
    return this.http.get(SERVER_API + '/outsourcing-plan/download-excel-template?fileName=' + fileName, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  getPlanCodeAuto(): Observable<HttpResponse<any>> {
    return this.http.get(SERVER_API + '/outsourcing-plan/get-plan-code', { observe: 'response', responseType: 'text' });
  }

  getPlanById(id): Observable<HttpResponse<any>> {
    const options = createRequestOption().append('outsourcingID', id);
    return this.http.get<[]>(SERVER_API + '/outsourcing-plan/get-outsource-by-id', {
      params: options,
      observe: 'response'
    });
  }

  save(data, file: File): Observable<HttpResponse<any>> {
    const formData: FormData = new FormData();
    formData.append(
      'data',
      new Blob([JSON.stringify(data)], {
        type: 'application/json'
      })
    );
    if (file) {
      formData.append('file', file);
    }

    return this.http.post(SERVER_API + '/outsourcing-plan/save', formData, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  /*  ThucDV mofifi end 08/06/2020*/

  doImport(file: File): Observable<HttpResponse<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(SERVER_API + '/outsourcing-plan/import-excel', formData, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  /**
   * Hungnd iist 11/06/2020
   * api approve plan
   */
  approvePlan(data): Observable<HttpResponse<any>> {
    const options = createRequestOption();
    return this.http.post<[]>(SERVER_API + '/outsourcing-plan/approvePlan', data, {
      params: options,
      observe: 'response'
    });
  }

  /**
   * Hungnd iist 11/06/2020
   * api reject plan
   */
  rejectPlan(data): Observable<HttpResponse<any>> {
    const options = createRequestOption();
    return this.http.post<[]>(SERVER_API + '/outsourcing-plan/rejectPlan', data, {
      params: options,
      observe: 'response'
    });
  }

  /**
   * Hungnd create 12/06/2020
   * Delete outsource Plan
   */
  deleteOutPlan(id): Observable<HttpResponse<any>> {
    const options = createRequestOption().append('id', id);
    return this.http.delete<[]>(SERVER_API + '/outsourcing-plan/delete', {
      params: options,
      observe: 'response'
    });
  }

  /**
   * Hungnd create 12/06/2020
   * Can delete ?
   */
  checkDeleteOutPlan(id): Observable<HttpResponse<any>> {
    const options = createRequestOption().append('id', id);
    return this.http.get<[]>(SERVER_API + '/outsourcing-plan/checkDelete', {
      params: options,
      observe: 'response'
    });
  }
}

import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../../../app.constants';
import { SERVER_API } from '../../../shared/constants/api-resource.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../../shared/util/request-util';
import { CommonUtils } from 'app/shared/util/common-utils.service';

@Injectable({
  providedIn: 'root'
})
export class AppParamsService {
  public resourceUrl = SERVER_API;

  constructor(private http: HttpClient) {}

  getAllAppParams(): Observable<HttpResponse<any>> {
    const options = createRequestOption();
    return this.http.get<[]>(this.resourceUrl + '/app-params/get-app-params', { params: options, observe: 'response' });
  }

  getAllAppParamsConfig(req?: any): Observable<HttpResponse<any>> {
    const options = createRequestOption(req);
    return this.http.get<[]>(this.resourceUrl + '/app-params/get-app-params-config', {
      params: options,
      observe: 'response'
    });
  }

  getAllAppParamsConfigNotAuth(req?: any): Observable<HttpResponse<any>> {
    const options = createRequestOption(req);
    return this.http.get<[]>(this.resourceUrl + '/app-params/get-config', {
      params: options,
      observe: 'response'
    });
  }

  getAppParamsDropList(req?: any): Observable<HttpResponse<any>> {
    const options = createRequestOption(req);
    return this.http.get<[]>(this.resourceUrl + '/app-params/get-droplist', { params: options, observe: 'response' });
  }

  saveAppParamsConfig(data): Observable<HttpResponse<any>> {
    return this.http.post(this.resourceUrl + '/app-params/save-app-params-config', data, { observe: 'response' });
  }

  getAppParamsValidProduct(): Observable<HttpResponse<any>> {
    const options = createRequestOption();
    return this.http.get<[]>(this.resourceUrl + '/app-params/get-app-params-valid-product', {
      params: options,
      observe: 'response'
    });
  }

  /**
   * Update NamNv 16/5/2020
   * Find by code
   */
  getAllAppParamsByType(param: string): Observable<HttpResponse<any>> {
    return this.http.get<[]>(this.resourceUrl + '/app_param/findByParamType', {
      params: {
        paramType: param
      },
      observe: 'response'
    });
  }

  /**
   * Create HungND 04/06/2020
   * Get parem by code
   */
  getParamByCode(param): Observable<HttpResponse<any>> {
    const options = createRequestOption().append('paramType', param);
    return this.http.get<[]>(SERVER_API + '/app_param/findByParamType', {
      params: options,
      observe: 'response'
    });
  }
}

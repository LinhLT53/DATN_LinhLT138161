import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/shared/util/request-util';
import { SERVER_API } from 'app/shared/constants/api-resource.constants';

@Injectable({
  providedIn: 'root'
})
export class SysUserService {
  public resourceUrl = SERVER_API;
  constructor(private http: HttpClient) {}

  getAll(req?: any): Observable<HttpResponse<any>> {
    const options = createRequestOption(req);
    return this.http.get<[]>(this.resourceUrl + '/user/findByEmailOrName', {
      params: options,
      observe: 'response'
    });
  }

  save(data): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.resourceUrl + '/user/saveSysUser', data, { observe: 'response' });
  }

  update(data): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.resourceUrl + '/user/updateSysUser', data, { observe: 'response' });
  }

  delete(id): Observable<HttpResponse<any>> {
    return this.http.get<[]>(this.resourceUrl + '/user/delete?id=' + id, {
      observe: 'response'
    });
  }

  getUnit(req?: any): Observable<HttpResponse<any>> {
    const options = createRequestOption(req);
    return this.http.get<[]>(this.resourceUrl + '/organization/findByNameLike', { params: options, observe: 'response' });
  }

  getPosition(req?: any): Observable<HttpResponse<any>> {
    const options = createRequestOption(req);
    return this.http.get<[]>(this.resourceUrl + '/user/getPosition', { params: options, observe: 'response' });
  }

  getGroupUsers(): Observable<HttpResponse<any>> {
    return this.http.get<[]>(this.resourceUrl + '/user-group/findAll', { observe: 'response' });
  }

  checkEmail(req?: any): Observable<HttpResponse<any>> {
    const options = createRequestOption(req);
    return this.http.get<[]>(this.resourceUrl + '/user/checkEmail', { params: options, observe: 'response' });
  }
  checkDeleteUser(req?: any): Observable<HttpResponse<any>> {
    const options = createRequestOption(req);
    return this.http.get<[]>(this.resourceUrl + '/user/checkDeleteUser', { params: options, observe: 'response' });
  }
}

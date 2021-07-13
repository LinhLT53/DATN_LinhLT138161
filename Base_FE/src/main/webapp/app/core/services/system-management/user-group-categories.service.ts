import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/shared/util/request-util';
import { InvoiceSerialModel } from 'app/core/models/announcement-management/invoice-serial.model';
import { SERVER_API_URL } from 'app/app.constants';
import { SERVER_API } from 'app/shared/constants/api-resource.constants';
import { UserGroupModel } from 'app/core/models/system-categories/user-group.model';

@Injectable({
  providedIn: 'root'
})
export class UserGroupCategoriesService {
  public resourceUrl = SERVER_API;

  constructor(private http: HttpClient) {}

  save(data): Observable<HttpResponse<any>> {
    return this.http.post<UserGroupModel>(this.resourceUrl + '/user-group/add', data, { observe: 'response' });
  }

  delete(id): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.resourceUrl + '/user-group/delete?id=' + id, { observe: 'response' });
  }

  getAll(): Observable<HttpResponse<any>> {
    return this.http.get<[]>(this.resourceUrl + '/user-group/findAll', { observe: 'response' });
  }

  search(searchForm: any): Observable<any> {
    return this.http.post<any>(this.resourceUrl + '/user-group/doSearch', searchForm);
  }

  query(req?: any): Observable<HttpResponse<any>> {
    const options = createRequestOption(req);
    return this.http.get<[]>(this.resourceUrl + '/user-group/search', { params: options, observe: 'response' });
  }
  getListUserOfGroup(req?: any): Observable<HttpResponse<any>> {
    const options = createRequestOption(req);
    return this.http.get<[]>(this.resourceUrl + '/user-group/get-user-list-of-group', { params: options, observe: 'response' });
  }

  addUserOfUser(data): Observable<HttpResponse<any>> {
    return this.http.post<[any]>(this.resourceUrl + '/user-group/addGroupUserInfo', data, { observe: 'response' });
  }

  getPermission(groupUserId): Observable<HttpResponse<any>> {
    return this.http.get<[]>(this.resourceUrl + '/user-group/get-permission?groupUserId=' + groupUserId, { observe: 'response' });
  }

  savePermission(groupUserId, data): Observable<HttpResponse<any>> {
    return this.http.post<UserGroupModel>(this.resourceUrl + '/user-group/save-permission?groupUserId=' + groupUserId, data, {
      observe: 'response'
    });
  }

  checkExistCode(codeUserGroup): Observable<HttpResponse<any>> {
    return this.http.get<[]>(this.resourceUrl + '/user-group/check-exist-code?codeUserGroup=' + codeUserGroup, { observe: 'response' });
  }
}

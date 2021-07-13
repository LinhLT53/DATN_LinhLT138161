import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {SERVER_API} from "app/shared/constants/api-resource.constants";
import {Observable} from "rxjs";
import {createRequestOption} from "app/shared/util/request-util";
import {HumanResouces} from "app/core/models/human-resources/human-resouces.model";
import {GroupPermissionUserEntityModel} from "app/core/models/group-permission/groupPermissionUserEntity.model";

@Injectable({
  providedIn: 'root'
})
export class GroupPermissionService {

  private pathService = SERVER_API;

  constructor(
    private http: HttpClient
  ) {
  }

  save(data?: any): Observable<HttpResponse<any>> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post<HttpResponse<any>>(SERVER_API + "/group-permission/create", data, httpOption);
  }


  getHistoryEdit(id?: any): Observable<any> {
    const options = createRequestOption(id);
    return this.http.get<[]>(SERVER_API + '/group-permission/getHistoryEdit/' + id, {
      params: options,
      observe: 'response'
    });
  }

  update(data?: any): Observable<HttpResponse<any>> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.put<HttpResponse<any>>(SERVER_API + "/group-permission/update", data, httpOption);
  }

  findAll(data?: any): Observable<HttpResponse<any>> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: createRequestOption(data)
    }
    return this.http.get<HttpResponse<any>>(SERVER_API + "/group-permission/find-all", httpOption);
  }

  findGrouPermissionById(id) {
    return this.http.get<HttpResponse<any>>(SERVER_API + "/group-permission/find?id=" + id);
  }

  findAllDepartment(): Observable<HttpResponse<any>> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.get<HttpResponse<any>>(SERVER_API + "/department/list", httpOption);
  }

  checkDeleteGroupPermission(obj?: any): Observable<HttpResponse<any>> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post<HttpResponse<any>>(SERVER_API + "/group-permission/checked", obj, httpOption);
  }

  delete(id): Observable<HttpResponse<any>> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.get<HttpResponse<any>>(SERVER_API + "/group-permission/delete?id=" + id, httpOption);
  }

  findAllPermission(data?: any): Observable<HttpResponse<any>> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post<HttpResponse<any>>(SERVER_API + "/permission/list-permissions", data, httpOption);
  }

  addUserPermission(data): Observable<HttpResponse<any>> {
    return this.http.post<any>(SERVER_API + '/group-permission/addUserPermission', data, {observe: 'response'});
  }

  deleteUserPermission(data): Observable<HttpResponse<any>> {
    return this.http.post<[]>(SERVER_API + '/group-permission/deleteUserPermission', data, {observe: 'response'});
  }

  getListUserPermitted(grId: number): Observable<HumanResouces[]> {
    return this.http.get<HumanResouces[]>(SERVER_API + '/group-permission/viewUserPermission/' + grId).pipe();
  }

  isUserPermitted(uId: number): Observable<GroupPermissionUserEntityModel> {
    return this.http.get<GroupPermissionUserEntityModel>(SERVER_API + '/group-permission/findUser/' + uId).pipe();
  }

  findListRole(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(SERVER_API + '/app-param/code-position');
  }

  getHistoryPermission(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(SERVER_API + '/history/group-permission');
  }
}

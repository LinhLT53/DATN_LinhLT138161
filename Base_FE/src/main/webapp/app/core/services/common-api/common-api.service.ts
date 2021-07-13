import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {createRequestOption} from 'app/shared/util/request-util';
import {SERVER_API_URL} from 'app/app.constants';
import {SERVER_API} from 'app/shared/constants/api-resource.constants';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {
  public resourceUrl = SERVER_API;

  constructor(private http: HttpClient) {
  }


  getAppParam(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<[]>(this.resourceUrl + '/e-invoice/get-all-tenant-branch-by-user-for-search', {
      params: options,
      observe: 'response'
    });
  }

  /**
   * Create HungND 04/06/2020
   * Get Organization
   */
  getOrganizationList(page, limit, code): Observable<HttpResponse<any>> {


    const options = createRequestOption()
      .append('page', page)
      .append('limit', limit)
      .append('code', code);
    return this.http.get<[]>(SERVER_API + '/organization/getOrg', {
      params: options,
      observe: 'response'
    });
  }

  getUserPermission(email, token): Observable<HttpResponse<any>> {
    // const httpOption = {
    //   headers: new HttpHeaders({
    //     'Authorization': 'Bearer ' + token
    //   })
    // }
    // return this.http.get<HttpResponse<any>>(SERVER_API + '/humanResources/getUserInfo?username='+username, httpOption);
    const options = createRequestOption()
      .append('username', email)
    return this.http.get<[]>(SERVER_API + '/humanResources/getUserInfo', {
      params: options,
      observe: 'response'
    });
  }
}

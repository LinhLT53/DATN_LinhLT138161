import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonUtils } from 'app/shared/util/common-utils.service';
import { Observable } from 'rxjs';

/**
 * NamNv -- iist
 * Create 18/5/2020
 */
export class BaseService {
  constructor(public http: HttpClient) {
  }
  add(url: string, body: any, params?: any): Observable<any> {
    return this.http.post(url, body, { params: CommonUtils.buildParams(params) });
  }

  edit(url: string, body: any, params?: any) {
    return this.http.put(url, body, { params: CommonUtils.buildParams(params) });
  }

  delete(url: string, params?: any): Observable<any> {
    return this.http.delete(url, { params: CommonUtils.buildParams(params) });
  }

  get(url: string, params?: any): Observable<any> {
    return this.http.get(url, { params: CommonUtils.buildParams(params) });
  }
}

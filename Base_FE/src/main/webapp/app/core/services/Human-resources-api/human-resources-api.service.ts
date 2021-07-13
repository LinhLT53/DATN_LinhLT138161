import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {SERVER_API} from "app/shared/constants/api-resource.constants";
import {KeySearch} from "app/core/models/system-categories/keysearch.model";


@Injectable({
  providedIn: 'root'
})
export class HumanResourcesApiService {
  private baseUri = SERVER_API;
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
  }

  // TanNV
  searchHumanResources(searchForm?: any): Observable<any> {
    return this.http.post(this.baseUri + '/humanResources/searchHumanResources', searchForm);
  }

  // searchNode(searchForm?: any): Observable<any> {
  //   return this.http.post(this.baseUri + '/nodeEffort/searchNode', searchForm);
  // }
  //
  // searchNodeProject(searchForm?: any): Observable<any> {
  //   return this.http.post(this.baseUri + '/nodeEffort/searchNodeProject', searchForm);
  // }

  importHumanResources(formData?: any): Observable<any> {
    return this.http.post(this.baseUri + '/humanResources/importfile', formData, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  doImport(file?: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(this.baseUri + '/humanResources/doImport', formData, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  // doImport(file: File): Observable<HttpResponse<any>> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);
  //   return this.http.post(this.resourceUrl + '/partnerCapacityProfile/import-excel-async', formData, {
  //     //responseType: 'blob',
  //     observe: 'response'
  //   });
  // }

  downloadTemplateFileExcel(file: File): Observable<any> {
    return this.http.get(this.baseUri + '/humanResources/dowloadfiledata', {
      responseType: 'blob',
      observe: 'response'
    });
  }

  // downloadTemplateFileExcel(excelType: string): Observable<any> {
  //   return this.http.get(this.resourceUrl + '/partnerCapacityProfile/download-excel-template?type=' + excelType, {
  //     responseType: 'blob',
  //     observe: 'response'
  //   });
  // }

  checkProcessTaskAsyncImport(formData?: any): Observable<any> {
    return this.http.post(this.baseUri + '/humanResources/importfile', formData, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  // checkProcessTaskAsyncImport(id: number): Observable<any> {
  //   return this.http.get(this.resourceUrl + '/partnerCapacityProfile/check-process-async-task?taskId=' + id, {
  //     //responseType: 'blob',
  //     observe: 'response'
  //   });
  // }
  downloadFileImport(formData?: any): Observable<any> {
    return this.http.post(this.baseUri + '/humanResources/importfile', formData, {
      responseType: 'blob',
      observe: 'response'
    });
  }

//   downloadFileImport(id: number): Observable<any> {
//     return this.http.get(this.resourceUrl + '/partnerCapacityProfile/download-file-result?taskId=' + id, {
//       responseType: 'blob',
//       observe: 'response'
//     });
//   }
// }


  lockHumanResources(id?: any): Observable<any> {
    return this.http.delete<any>(SERVER_API + '/humanResources/lockHumanResources/' + id);
  }

  deleteHumanResources(id?: any): Observable<any> {
    return this.http.delete<any>(SERVER_API + '/humanResources/deleteHumanResources/' + id);
  }

  getDepartment(obj: any): Observable<any> {
    return this.http.post<any>(this.baseUri + '/app-param/getAppParam', obj);
  }

  resetpassword(id) {
    const option = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.http.put<any>(SERVER_API + '/humanResources/reset-password/' + id, id, option);
  }

  resetPasswordByEmail(email?: string, key?: string): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(SERVER_API + '/authen/verify-email-forgot-password?email=' + email + '&key=' + key);
  }

  forgotPassword(email1?: string): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(SERVER_API + '/authen/forgot-password', {email: email1});
  }

  getlistHumanResourcesDepatment(name: any): Observable<any> {
    return this.http.get(this.baseUri + '/group-permission/getlistHumanResourcesDepatment?name=', name);
  }

  getHumanResourcesInfo(obj: KeySearch): Observable<KeySearch> {
    return this.http.post<KeySearch>(this.baseUri + '/humanResources/getHumanResources', obj);
  }

  getByParType(type?: any): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(SERVER_API + '/app-param/getByParType/' + type);
  }

  //End TanNV

  /*duc service*/

  getDepartmentList(): Observable<any> {
    return this.http.get(SERVER_API + '/humanResources/getDepartment');
  }

  getPositionList(): Observable<any> {
    return this.http.get(SERVER_API + '/humanResources/getPosition');
  }

  getHistoryList(): Observable<any> {
    return this.http.get(SERVER_API + '/humanResources/human-history');
  }


  getPartList(): Observable<any> {
    return this.http.get(SERVER_API + '/humanResources/getPart');
  }

  getMajorList(): Observable<any> {
    return this.http.get(SERVER_API + '/humanResources/getMajor');
  }

  save(data): Observable<any> {
    return this.http.post<any>(SERVER_API + '/humanResources/add', data);
  }

  update(data): Observable<HttpResponse<any>> {
    return this.http.post<any>(SERVER_API + '/humanResources/update', data, {observe: 'response'});

  }

  getInfo(Id): Observable<any> {
    return this.http.get(SERVER_API + '/humanResources/get-human-by-id/' + Id);
  }

  checkEmail(email): Observable<any> {
    return this.http.get(SERVER_API + '/humanResources/check-email/' + email);
  }

  checkUserCode(code): Observable<any> {
    return this.http.get(SERVER_API + '/humanResources/check-usercode/' + code);
  }

  getHistoryById(Id): Observable<any> {
    return this.http.get(SERVER_API + '/humanResources/human-history/' + Id);
  }

  /*end duc*/

  //nuctv
  synchronizedUser(humanResourceID: any): Observable<any> {
    return this.http.get(SERVER_API + '/humanResources/synchronized/' + humanResourceID);
  }

  getCodeOrName(): Observable<any> {
    return this.http.get(SERVER_API + '/humanResources/codeOrName');
  }

  //end nuctv
}

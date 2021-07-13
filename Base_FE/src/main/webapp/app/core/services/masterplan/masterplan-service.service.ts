import { Injectable } from '@angular/core';
import { SERVER_API } from 'app/shared/constants/api-resource.constants';
import { HttpClient, HttpResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/shared/util/request-util';
// import { masterPlanModel } from 'app/core/models/masterplan/masterplan.model';

@Injectable({
  providedIn: 'root'
})
export class MasterplanServiceService {
  public resourceUrl = SERVER_API;
  constructor(private http: HttpClient) {}


  getAllByProjectPlanId(id?: any): Observable<any> {
    const options = createRequestOption(id);
    return this.http.get<[]>(this.resourceUrl + '/projectPlan/info/' + id , { params: options, observe: 'response' });
  }

  getHumanResource(id?: any): Observable<any> {
    const options = createRequestOption(id);
    return this.http.get<[]>(this.resourceUrl + '/projectPlan/human/' + id , { params: options, observe: 'response' });
  }

  edit(data): Observable<any> {

    return this.http.post<any>(this.resourceUrl + '/projectPlan/savemasterplan', data);
  }

  confirm(data): Observable<any> {

    return this.http.post<any>(this.resourceUrl + '/projectPlan/confirmmasterplan', data );
  }

  deleteById(data): Observable<any> {
    return this.http.post<any>(this.resourceUrl + '/projectPlan/deletemasterplan', data);
  }

  history(id?: any): Observable<any> {
    const options = createRequestOption(id);
    return this.http.get<[]>(this.resourceUrl + '/projectPlan/history/' + id , { params: options, observe: 'response' });
  }



  exportData(id?: any): Observable<any> {
    // const options = createRequestOption(id);
    return this.http.get(this.resourceUrl + '/projectPlan/exportFile/'+ id , {
      // params: options,
      responseType: 'blob',
      observe: 'response'
    });
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    console.warn("12321",file)
    const req = new HttpRequest('POST', `${this.resourceUrl}/project/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  // nuctv 10/08
  findListMember(projectId:any, humanID:any):Observable<any>{
    return this.http.get(this.resourceUrl+'/projectMember/findByProjectIDAndHumanID/'+projectId+'/'+humanID);
  }
}

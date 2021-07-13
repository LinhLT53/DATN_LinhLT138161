import { Injectable } from '@angular/core';
import {SERVER_API} from "app/shared/constants/api-resource.constants";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RedmineService {
  private baseUri = SERVER_API;
  constructor(private http: HttpClient) { }
  syncRedmine(id):Observable<any>{
    return this.http.get(this.baseUri+'/redmine-bug/sync/'+id);
  }
}

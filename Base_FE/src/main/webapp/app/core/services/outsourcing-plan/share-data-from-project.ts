import { Injectable } from '@angular/core';
import { SERVER_API } from 'app/shared/constants/api-resource.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { createRequestOption } from 'app/shared/util/request-util';
import { Behavior } from 'popper.js';

@Injectable({
  providedIn: 'root'
})
export class ShareDataFromProjectService {
  outsourcePlan: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.outsourcePlan = new BehaviorSubject<any>(null);
  }

  getDataFromList(data) {
    this.outsourcePlan.next(data);
  }
}

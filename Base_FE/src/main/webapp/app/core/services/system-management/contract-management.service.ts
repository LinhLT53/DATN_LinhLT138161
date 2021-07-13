import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/*IIST - LongPC - CREATED 200514*/
@Injectable({
  providedIn: 'root'
})
export class ContractManagementService {
  baseEndpoint = 'http://localhost:8084/pmp-partner-service/contract-management';

  constructor(private http: HttpClient) {}

  getDetail(id) {
    return this.http.get(this.baseEndpoint + '/' + id);
  }

  create(model) {
    return this.http.post(this.baseEndpoint, model);
  }

  update(model) {
    return this.http.put(this.baseEndpoint + '/' + model.id, model);
  }

  delete(id) {
    return this.http.put(this.baseEndpoint + '/delete/' + id, {});
  }
}

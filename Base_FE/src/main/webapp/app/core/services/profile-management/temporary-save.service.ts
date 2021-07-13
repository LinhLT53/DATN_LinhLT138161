import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeLast } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemporarySaveService {
  securityCapacitySubject: BehaviorSubject<any>;
  similarContracts: BehaviorSubject<any>;

  constructor() {
    this.securityCapacitySubject = new BehaviorSubject<any>({ isProcessed: false, data: [] });
    this.similarContracts = new BehaviorSubject<any>({ isProcessed: false, data: [] });
  }

  pushSecurityCapacity(item: any, uuid: string) {
    this.securityCapacitySubject.next({ uuid: uuid, data: item });
  }

  pushSimilarContracts(item: any, uuid: string) {
    this.similarContracts.next({ uuid: uuid, data: item });
  }

  getSecurityCapacity() {
    return this.securityCapacitySubject.asObservable();
  }

  getSimilarContracts() {
    return this.similarContracts.asObservable();
  }
}

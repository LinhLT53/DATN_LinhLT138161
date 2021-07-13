import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private event = new Subject<any>();
  private loginData = new BehaviorSubject<any>({});
  loginDataChange = this.loginData.asObservable();
  private signData = new BehaviorSubject<any>({});
  signDataChange = this.signData.asObservable();

  private signDataInvoiceDraft = new BehaviorSubject<any>({});
  signDataInvoiceDraftChange = this.signDataInvoiceDraft.asObservable();
  private signDataInvoice = new BehaviorSubject<any>({});
  signDataInvoiceChange = this.signDataInvoice.asObservable();

  emit(event: any) {
    this.event.next(event);
    this.loginData.next(event);
    this.signData.next(event);
    this.signDataInvoiceDraft.next(event);
    this.signDataInvoice.next(event);
  }

  on(eventType: (any)): Observable<any> {
    return this.event.pipe(filter(t => t.type === eventType));
  }
}

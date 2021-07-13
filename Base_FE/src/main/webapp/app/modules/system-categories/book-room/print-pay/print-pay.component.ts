import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-print-pay',
  templateUrl: './print-pay.component.html',
  styleUrls: ['./print-pay.component.scss']
})
export class PrintPayComponent implements OnInit {
  @Input() type;
  @Input() id: any;
  @Input() data: any;
  @Input() dataService: any;
  @Input() dataBook: any;
  @Input() dataDiscount: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  sumService = 0;
  title = 'aaaa';
  predicate: any;
  reverse: any;
  dataShowTable = [];
  date = new Date();
  sumBook = 0;
  sumbill = 0;
  constructor(private modalService: NgbModal, public datepipe: DatePipe, public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.xetDataShow();
  }
  onCancel() {
    this.activeModal.dismiss();
  }

  xetDataShow() {
    for (const c of this.dataService) {
      const data = { name: '', quantity: '', price: '', sum: 0 };
      data.name = c.serviceName;
      data.quantity = c.quantity;
      data.price = c.price;
      data.sum = c.quantity * c.price;
      if (!c.sum) {
        this.dataShowTable.push(data);
      } else {
        this.sumService = c.sum;
      }
    }
    for (const c of this.dataBook) {
      if (c.sum) {
        this.sumBook = c.sum;
      }
    }
    const c = this.dataDiscount ? (this.sumBook * this.dataDiscount.percentPromotion) / 100 : this.sumBook;
    this.sumbill = this.sumService + c;
  }
  sumBile() {
    return this.sumService + this.dataDiscount ? (this.sumBook * this.dataDiscount.percentPromotion) / 100 : this.sumBook;
  }
}

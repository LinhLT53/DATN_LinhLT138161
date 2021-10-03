import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingRoomApi } from 'app/core/services/booking-room-api/booking-room-api';
import { RoomApiServiceService } from 'app/core/services/room-api/room-api-service.service';
import { ServiceService } from 'app/core/services/service/service.service';
import { HeightService } from 'app/shared/services/height.service';
import { ToastService } from 'app/shared/services/toast.service';
import { PromotionService } from 'app/core/services/promotionService/promotion.service';
import { PrintPayComponent } from '../print-pay/print-pay.component';

@Component({
  selector: 'jhi-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  @Input() type;
  @Input() id: any;
  @Input() data: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  predicate: any;
  reverse: any;
  form: FormGroup;
  title = 'Thông Báo';
  height: any;
  listService = [];
  timeBookDTOList = [];
  sumService = 0;
  sumBoooking = 0;
  dataShow: any;
  bookRoomShow: any;
  sumbookRoom = 0;
  listdiscount = [];
  idDiscount = '';
  dataDiscount: any;
  constructor(
    private heightService: HeightService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private serviceService: ServiceService,
    public activeModal: NgbActiveModal,
    public bookingRoomApi: BookingRoomApi,
    protected router: Router,
    private roomApiService: RoomApiServiceService,
    public datepipe: DatePipe,
    private promotionService: PromotionService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.buildForm();
  }
  onSubmit() {
    this.dataShow.advanceManey = this.bookRoomShow.advanceAmount;
    this.dataShow.idDiscount = this.idDiscount;
    this.dataShow.payService = this.sumService;
    this.dataShow.payBook = this.sumBoooking;

    this.dataShow.sumBookRoom = this.sumBoooking + this.sumService;
    this.dataShow.payChang = this.sumbookRoom;
    this.bookingRoomApi.updatePayBoook(this.id, this.dataShow).subscribe(
      res => {
        this.toastService.openSuccessToast('Xác nhận thanh toán  thành công !');

        this.router.navigate(['system-categories/book-room']);
        this.activeModal.dismiss();
      },
      error => {
        this.toastService.openErrorToast('Xác nhận thanh toán thất bại !');
        this.activeModal.dismiss();
      }
    );
  }
  onCancel() {
    this.activeModal.dismiss();
  }
  displayFieldHasError(field: string) {
    return {
      'has-error': this.isFieldValid(field)
    };
  }
  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }
  trimSpace(element) {
    const value = this.getValueOfField(element);
    if (value) {
      this.setValueToField(element, value.trim());
    }
  }
  setValueToField(item, data) {
    this.form.get(item).setValue(data);
  }
  getValueOfField(item) {
    return this.form.get(item).value;
  }
  onResize() {
    this.height = this.heightService.onResizeWithoutFooter();
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      id: [this.id],
      code: [],
      discountId: ''
    });
    // this.id=1;
    if (this.id) {
      this.getDetail(this.id);
    } else {
      this.form.get('creatDate').setValue(new Date());
      // this.setCountries(this.listServiceTest)
    }
  }
  getDetail(id) {
    this.bookingRoomApi.getPayBooking(id).subscribe(res => {
      if (res) {
        console.log(res);
        this.listService = res.listService;
        this.timeBookDTOList = res.timeBookDTOList;
        this.dataShow = res;
        this.getSumService();
        this.getSumBook();
      }
    });
    this.bookingRoomApi.getInfoBooking(id).subscribe(res => {
      if (res) {
        this.bookRoomShow = res.data;
      }
    });
    this.promotionService.getByRoomType(this.data.roomType).subscribe(res => {
      if (res) {
        this.listdiscount = res.data;
        console.log(res);
      }
    });
  }

  getSumService() {
    for (let c of this.listService) {
      this.sumService = this.sumService + c.quantity * c.price;
      console.log(this.sumService);
    }
    this.listService.push({ sum: this.sumService });
    console.log(this.sumService);
  }
  getSumBook() {
    for (let c of this.timeBookDTOList) {
      switch (c.typeBook) {
        case 1:
          this.sumBoooking = this.sumBoooking + Math.floor(c.hourPrice * c.unit);
          break;
        case 2:
          this.sumBoooking = this.sumBoooking + Math.floor(c.dayPrice * c.unit);

          break;
        case 3:
          this.sumBoooking = this.sumBoooking + Math.floor(c.nightPrice * c.unit);
          break;
      }
    }
    this.timeBookDTOList.push({ sum: Math.floor(this.sumBoooking) });
    console.log(this.sumBoooking);
  }

  xetDiscoon(e) {
    if (e) {
      this.dataDiscount = e;
      this.idDiscount = e.promotionId;
      this.sumbookRoom = this.sumBoooking - e.percentPromotion + this.sumService - this.bookRoomShow.advanceAmount;
    } else {
      this.dataDiscount = null;
      this.idDiscount = '';
      this.sumbookRoom = this.sumBoooking + this.sumService - this.bookRoomShow.advanceAmount;
    }
  }
  convent(data) {
    return Math.floor(data);
  }
  print() {
    const modalRef = this.modalService.open(PrintPayComponent, {
      size: 'sm',
      backdrop: 'static',
      keyboard: false
    });

    modalRef.componentInstance.dataService = this.listService;
    modalRef.componentInstance.dataBook = this.timeBookDTOList;
    modalRef.componentInstance.dataDiscount = this.dataDiscount;
    modalRef.result
      .then(result => {
        if (result) {
        }
      })
      .catch(() => {});
  }
}

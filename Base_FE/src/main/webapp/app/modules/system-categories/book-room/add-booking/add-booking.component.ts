import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { HeightService } from 'app/shared/services/height.service';
import { CommonService } from 'app/shared/services/common.service';
import { ToastService } from 'app/shared/services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JhiEventManager } from 'ng-jhipster';
import { SysUserService } from 'app/core/services/system-management/sys-user.service';
import { TranslateService } from '@ngx-translate/core';
import { FormStoringService } from 'app/shared/services/form-storing.service';
import { Router } from '@angular/router';
import { RoomApiServiceService } from 'app/core/services/room-api/room-api-service.service';
import { RoomTypeApiServiceService } from 'app/core/services/room-type/room-type-api-service.service';
import { CustomerApiService } from 'app/core/services/customer-api/customer-api.service.service';
import { PromotionService } from 'app/core/services/promotionService/promotion.service';
import { BookingRoomApi } from 'app/core/services/booking-room-api/booking-room-api';
import { debounceTime } from 'rxjs/operators';
import { TIME_OUT } from 'app/shared/constants/set-timeout.constants';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { HttpResponse } from '@angular/common/http';
import { STATUS_CODE } from 'app/shared/constants/status-code.constants';
import { ConfirmModalComponent } from 'app/shared/components/confirm-modal/confirm-modal.component';
import { STORAGE_KEYS } from 'app/shared/constants/storage-keys.constants';

@Component({
  selector: 'jhi-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss'],
  providers: [DatePipe]
})
export class AddBookingComponent implements OnInit {
  oldEmail: any;
  @Input() type;
  @Input() id: any;
  @Input() bookType: any;
  @Input() bookingRoomId: any;
  @Input() bookingId: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  ngbModalRef: NgbModalRef;
  form: FormGroup;
  listUnit$ = new Observable<any[]>();
  unitSearch;
  roomType;
  giaPhong;
  maKM;
  tienThuePhong;
  tienKhuyenMai;
  idLoaiPhong;
  daThanhToan;
  idPhong;
  loaiDatPhong;
  tienDV;
  activeNgayDat;
  activeNgayDuKienDi;
  activeNgayDen;
  activeNgayTra;
  bookingStatus;

  requireNgayTra = false;
  cpNgayTraNgayHt = false;
  cpNgayTraNgayDen = false;

  requireNgayDat = false;
  cpNgayDatNgayHt = false;
  cpNgayDatNgayDKDi = false;

  requireNgayDKDi = false;
  cpNgayDKDiNgayHt = false;
  cpNgayDKDiNgayDat = false;

  tongTien;
  debouncer: Subject<string> = new Subject<string>();
  listRoom = [];
  listCustomer = [];
  listPromotion = [];
  listBookingType = [
    {
      id: 1,
      name: 'Theo giờ'
    },
    {
      id: 2,
      name: 'Theo ngày'
    },
    {
      id: 3,
      name: 'Qua đêm'
    }
  ];
  //end relase
  roleList: any[] = [];
  height: number;
  post: Date;
  name: string;
  maxlength = 4;
  isError = false;
  userDetail: any;
  isYear = false;
  yy: number;
  years: number[] = [];
  checkBoll = false;
  // statusList = [
  //   { id: 1, status: 'Đã đặt' },
  //   { id: 2, status: 'Đang đặt' },
  //   { id: 3, status: 'Đã thanh toán' },
  //   { id: 4, status: 'Đã hủy' },
  //   { id: 5, status: 'Đã chuyển phòng' }
  // ];
  statusList = [
    { id: 1, status: 'Còn trống' },
    { id: 2, status: 'Không hoạt động' },
    { id: 3, status: 'Đã đặt' },
    { id: 4, status: 'Chờ dọn phòng' },
    { id: 5, status: 'Đã chuyển phòng' }
  ];
  title = '';
  constructor(
    public activeModal: NgbActiveModal,
    private heightService: HeightService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private toastService: ToastService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private eventManager: JhiEventManager,
    private sysUserService: SysUserService,
    private translateService: TranslateService,
    private datepipe: DatePipe,
    private roomApiService: RoomApiServiceService,
    private customerApiService: CustomerApiService,
    private formStoringService: FormStoringService,
    private roomTypeApiService: RoomTypeApiServiceService,
    private bookingRoomApi: BookingRoomApi,
    private promotionService: PromotionService,
    protected router: Router
  ) {
    this.height = this.heightService.onResize();
  }

  get formControl() {
    return this.form.controls;
  }

  ngOnInit() {
    this.getDefaultData();
    this.buildForm();
    this.debounceOnSearch();
    this.getRoleList();
    this.getRoomList();
    this.getListCustomer();
    this.setDefaultValueToDate();
  }

  validateNgayDen() {}

  compareTwoTime(date1, date2) {
    const time1 = date1.getTime();
    const time2 = date2.getTime();
    if (time1 === time2) {
      return 0;
    } else if (time1 > time2) {
      return 1;
    } else if (time1 < time2) {
      return -1;
    }
  }

  validateNgayTra() {
    if (this.bookType === 'current') {
      const ngayTra = this.getValueOfField('bookingCheckout');
      if (!this.checkNullOrEmpty(ngayTra)) {
        this.requireNgayTra = true;
        this.form.controls['bookingCheckout'].setErrors({ invalid: true });
      } else {
        this.requireNgayTra = false;
        if (this.compareTwoTime(ngayTra, new Date()) <= 0) {
          if (this.type === 'add') {
            this.cpNgayTraNgayHt = true;
            this.form.controls['bookingCheckout'].setErrors({ invalid: true });
          } else {
            this.cpNgayTraNgayHt = false;
          }
        } else {
          this.cpNgayTraNgayHt = false;
          const ngayDen = this.getValueOfField('bookingCheckin');
          if (this.compareTwoTime(ngayTra, ngayDen) <= 0) {
            this.cpNgayTraNgayDen = true;
            this.form.controls['bookingCheckout'].setErrors({ invalid: true });
          } else {
            this.cpNgayTraNgayDen = false;
          }
        }
      }
    }
  }

  validateNgayDat() {
    if (this.bookType === 'future') {
      const ngayDat = this.getValueOfField('bookingDate');
      if (!this.checkNullOrEmpty(ngayDat)) {
        this.requireNgayDat = true;
        this.form.controls['bookingDate'].setErrors({ invalid: true });
      } else {
        this.requireNgayDat = false;
        if (this.compareTwoTime(ngayDat, new Date()) < 0) {
          if (this.type === 'add') {
            this.cpNgayDatNgayHt = true;
            this.form.controls['bookingDate'].setErrors({ invalid: true });
          } else {
            this.cpNgayDatNgayHt = false;
          }
        } else {
          this.cpNgayDatNgayHt = false;
        }
      }
    }
  }

  validateNgayDuKienDi() {
    if (this.bookType === 'future') {
      const ngayDKDi = this.getValueOfField('bookingDateOut');
      if (!this.checkNullOrEmpty(ngayDKDi)) {
        this.requireNgayDKDi = true;
        this.form.controls['bookingDateOut'].setErrors({ invalid: true });
      } else {
        this.requireNgayDKDi = false;
        this.cpNgayDKDiNgayHt = false;
        const ngayDat = this.getValueOfField('bookingDate');
        if (this.compareTwoTime(ngayDKDi, ngayDat) <= 0) {
          this.cpNgayDKDiNgayDat = true;
          this.form.controls['bookingDateOut'].setErrors({ invalid: true });
        } else {
          this.cpNgayDKDiNgayDat = false;
        }
        // }
      }
    }
  }

  setDefaultValueToDate() {
    if (this.bookType === 'current') {
      if (this.type === 'add') {
        this.setValueToField('bookingCheckin', new Date());
        this.setValueToField('bookingCheckout', new Date());
      } else if (this.type === 'foward') {
        this.setValueToField('bookingCheckin', new Date());
      }
    } else {
      if (this.type === 'add') {
        this.setValueToField('bookingDate', new Date());
        this.setValueToField('bookingDateOut', new Date());
      }
    }
  }

  checkActiveMaPhong() {
    if (this.bookType === 'current') {
      return this.type !== 'foward';
    } else if (this.bookType === 'future') {
      return this.type !== 'add' && this.type !== 'update';
    }
  }
  getListCustomer() {
    this.customerApiService.getAllCustomer().subscribe(
      res => {
        if (res) {
          this.listCustomer = res.data;
        } else {
          this.listCustomer = [];
        }
      },
      err => {
        this.toastService.openErrorToast('Error from server');
      }
    );
  }
  getRoomList() {
    this.roomApiService.getRoomList().subscribe(
      res => {
        if (res) {
          this.listRoom = res.data;
        } else {
          this.listRoom = [];
        }
      },
      err => {
        this.listRoom = [];
      }
    );
  }

  tinhTongTien() {
    const daThanhToan = this.getValueOfField('advanceAmount') ? this.getValueOfField('advanceAmount') : 0;
    const tienDV = this.getValueOfField('priceService') ? this.getValueOfField('priceService') : 0;
    let tienThuePhong = this.getValueOfField('price') ? this.getValueOfField('price') : 0;
    const loaiDatPhong = this.getValueOfField('bookingType');
    if (this.bookType === 'current') {
      const ngayDen = new Date(this.getValueOfField('bookingCheckin'));
      const ngayTra = new Date(this.getValueOfField('bookingCheckout'));
      if (loaiDatPhong === 1) {
        const soGio = this.getHourFromTwoDate(ngayDen, ngayTra);
        tienThuePhong = tienThuePhong * (soGio + 1);
        this.setValueToField('totalDate', soGio + 1);
      } else if (loaiDatPhong === 2) {
        const soNgay = this.getDateFromTwoDate(ngayDen, ngayTra);
        tienThuePhong = tienThuePhong * soNgay;
        this.setValueToField('totalDate', soNgay);
      }
    } else if (this.bookType === 'future') {
      const ngayDat = new Date(this.getValueOfField('bookingDate'));
      const ngayDuKienDi = new Date(this.getValueOfField('bookingDateOut'));
      if (loaiDatPhong === 1) {
        const soGio = this.getHourFromTwoDate(ngayDat, ngayDuKienDi);
        tienThuePhong = tienThuePhong * (soGio + 1);
        this.setValueToField('totalDate', soGio + 1);
      } else if (loaiDatPhong === 2) {
        const soNgay = this.getDateFromTwoDate(ngayDat, ngayDuKienDi);
        tienThuePhong = tienThuePhong * soNgay;
        this.setValueToField('totalDate', soNgay);
      }
    }
    const tongTien = tienThuePhong + tienDV - daThanhToan;
    this.setValueToField('priceTotal', tongTien);
  }

  onCheckValidDateTime() {}

  getDataOnSelectBookType() {
    this.loaiDatPhong = this.getValueOfField('bookingType');
    if (this.checkNullOrEmpty(this.idPhong) && this.checkNullOrEmpty(this.loaiDatPhong)) {
      this.setGiaPhong(this.idLoaiPhong, this.loaiDatPhong);
    }
    // this.getPromotion();
  }

  private getRoleList() {
    this.roleList = [{ id: 1, name: 'USER' }, { id: 2, name: 'ADMIN' }];
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      bookingroomId: [],
      roomCode: [],
      price: [],
      customerId: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      bookingType: [2, Validators.compose([Validators.required, Validators.maxLength(50)])],
      totalDate: [],
      priceBooking: [],
      priceService: [],
      advanceAmount: [],
      priceTotal: [],
      bookingDate: [],
      bookingDateOut: [],
      bookingCheckin: [],
      bookingCheckout: [],
      bookType: [],
      status: [],
      roomId: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      promotionCode: [],
      note: ['', Validators.maxLength(1000)],
      noteAddition: ['', Validators.maxLength(1000)]
    });
    if (this.checkNullOrEmpty(this.bookingId)) {
      this.setValueDefault(this.bookingId);
    }
    if (this.checkNullOrEmpty(this.bookingRoomId)) {
      this.setValueDefault(this.bookingRoomId);
    } else {
      if (this.id) {
        this.getUserDetail(this.id);
        this.xetDataUer();
      }
    }
    this.getYear();
  }

  setValueDefault(bookingRoomId) {
    this.bookingRoomApi.getInfo(bookingRoomId).subscribe(
      res => {
        this.userDetail = res.data;
        this.bookingStatus = res.data.status;
        this.setDataDefault();
        if (this.bookType === 'current' && this.type === 'foward') {
          this.setValueToField('bookingCheckin', new Date());
        }
      },
      err => {
        this.userDetail = null;
      }
    );
  }

  getDefaultData() {
    if (this.type && this.id) {
      this.commonService.clearDataTranfer('type');
      this.commonService.clearDataTranfer('id');
    } else {
      if (this.type !== 'add') {
        if (this.bookType === 'current') {
          this.router.navigate(['system-categories/book-room']);
        } else {
          this.router.navigate(['system-categories/book-room-future']);
        }
      }
    }
  }

  setDataDefault() {
    this.form.patchValue(this.userDetail);
    this.post = new Date(this.userDetail);
  }

  checkNullOrEmpty(item) {
    if (item !== null && item !== '' && item !== undefined) {
      return true;
    }
    return false;
  }

  setGiaPhong(loaiPhong, loaiDatPhong) {
    if (this.checkNullOrEmpty(loaiPhong) && this.checkNullOrEmpty(loaiDatPhong)) {
      this.roomTypeApiService.getByIdAndType(loaiPhong, loaiDatPhong).subscribe(
        res => {
          this.setValueToField('price', res.data.price);
          this.setValueToField('priceBooking', res.data.price);
          this.giaPhong = res.data.price;
          this.tienThuePhong = res.data.price;
        },
        error => {
          this.toastService.openErrorToast('Error from server');
        }
      );
    }
  }

  getDateFromTwoDate(date1, date2) {
    const oned = 24 * 60 * 60 * 1000;
    return Math.ceil(Math.abs(date2 - date1) / oned);
  }

  getHourFromTwoDate(date1, date2) {
    return Math.ceil(Math.abs(date2 - date1) / 36e5);
  }

  getDataOnSelectRoom(event) {
    this.getUserDetail(event.roomId);
  }

  getUserDetail(id) {
    this.idPhong = id;
    this.loaiDatPhong = this.getValueOfField('bookingType') ? this.getValueOfField('bookingType') : 0;
    this.roomApiService.getInfo(this.idPhong).subscribe(
      res => {
        if (res) {
          const d: any = res;
          this.idLoaiPhong = d.data.roomType;
          this.setValueToField('roomId', res.data.roomId);
          this.setValueToField('price', res.data.price);
          this.setValueToField('priceBooking', res.data.price);
          this.setValueToField('status', res.data.status);
          this.giaPhong = res.data.price;
          this.tienThuePhong = res.data.price;

          // this.setGiaPhong(this.idLoaiPhong, this.loaiDatPhong);
        }
      },
      err => {
        this.toastService.openErrorToast('Error from server');
      }
    );
  }

  debounceOnSearch() {
    this.debouncer.pipe(debounceTime(TIME_OUT.DUE_TIME_SEARCH)).subscribe(value => this.loadDataOnSearchUnit(value));
  }

  loadDataOnSearchUnit(term) {
    this.sysUserService
      .getUnit({
        name: term,
        limit: ITEMS_PER_PAGE,
        page: 0
      })
      .subscribe((res: HttpResponse<any[]>) => {
        if (res && res.status === STATUS_CODE.SUCCESS && this.unitSearch) {
          this.listUnit$ = of(res.body['content'].sort((a, b) => a.name.localeCompare(b.name)));
        } else {
          this.listUnit$ = of([]);
        }
      });
  }

  onCancel() {
    if (this.type !== 'detail') {
      const modalRef = this.modalService.open(ConfirmModalComponent, { centered: true, backdrop: 'static' });
      modalRef.componentInstance.type = 'confirm';
      modalRef.componentInstance.onCloseModal.subscribe(value => {
        if (value === true) {
          this.activeModal.dismiss();
        }
      });
    }
    if (this.type === 'detail') {
      this.activeModal.dismiss();
    }
  }

  formatDate(date) {
    return new Date(date);
  }

  onSubmitData() {
    if (this.type === 'add') {
      if (this.bookType === 'current') {
        this.validateNgayTra();
      } else if (this.bookType === 'future') {
        this.validateNgayDat();
        this.validateNgayDuKienDi();
      }
    }
    if (this.form.invalid) {
      this.commonService.validateAllFormFields(this.form);
      return;
    }
    if (this.bookType === 'current') {
      if (this.type === 'add') {
        this.form.get('bookingDate').setValue(null);
        this.form.get('bookingDateOut').setValue(null);
      }
      this.form.get('bookingCheckin').setValue(new Date(this.form.get('bookingCheckin').value));
      this.form.get('bookingCheckout').setValue(new Date(this.form.get('bookingCheckout').value));
    } else if (this.bookType === 'future') {
      this.form.get('bookingDate').setValue(new Date(this.form.get('bookingDate').value));
      this.form.get('bookingDateOut').setValue(new Date(this.form.get('bookingDateOut').value));
      this.form.get('bookingCheckin').setValue(null);
      this.form.get('bookingCheckout').setValue(null);
    }
    this.form.get('bookType').setValue(this.bookType);
    this.spinner.show();
    this.bookingRoomApi.save(this.form.value).subscribe(
      res => {
        this.toastService.openSuccessToast(res.data.msgSuccess);
        if (this.bookType === 'current') {
          this.router.navigate(['system-categories/book-room']);
        } else if (this.bookType === 'future') {
          this.router.navigate(['system-categories/book-room-future']);
        }
        this.activeModal.dismiss();
      },
      err => {
        this.activeModal.dismiss();

        this.toastService.openErrorToast(err.error.msgCode);
        this.spinner.hide();
      },
      () => {
        this.activeModal.dismiss();

        this.spinner.hide();
      }
    );
  }

  onPay() {}

  onInvoicePrint() {}

  viewChangeStr(item) {
    return '';
  }

  convertJson(value) {
    if (value) {
      return JSON.parse(value);
    }
  }

  getYear() {
    const todays = new Date();
    this.yy = todays.getFullYear();
    for (let i = this.yy; i >= 1970; i--) {
      this.years.push(i);
    }
  }

  onResize() {
    this.height = this.heightService.onResize();
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

  getValueOfField(item) {
    return this.form.get(item).value;
  }

  setValueToField(item, data) {
    this.form.get(item).setValue(data);
  }

  xetDataUer() {
    const userToken: any = this.formStoringService.get(STORAGE_KEYS.USER);
    if (userToken.role === 'ROLE_ADMINPART') {
      this.form.get('partId').setValue(userToken.partId);
      this.checkBoll = true;
    } else {
      this.checkBoll = false;
    }
  }
  checkNull() {
    if (this.checkBoll) {
      return true;
    }
    if (this.form.value.partId === null && !this.checkBoll) {
      return true;
    }
    return false;
  }
}

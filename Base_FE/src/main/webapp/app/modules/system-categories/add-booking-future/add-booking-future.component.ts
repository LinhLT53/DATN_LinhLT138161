import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeightService } from 'app/shared/services/height.service';
import { from, Observable, of, Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { JhiEventManager } from 'ng-jhipster';
import { ToastService } from 'app/shared/services/toast.service';
import { ITEMS_PER_PAGE, MAX_SIZE_PAGE } from 'app/shared/constants/pagination.constants';
import { ConfirmModalComponent } from 'app/shared/components/confirm-modal/confirm-modal.component';
import { SHOW_HIDE_COL_HEIGHT } from 'app/shared/constants/perfect-scroll-height.constants';
import { debounceTime } from 'rxjs/operators';
import { TIME_OUT } from 'app/shared/constants/set-timeout.constants';
import { CommonService } from 'app/shared/services/common.service';
import { RoomApiServiceService } from 'app/core/services/room-api/room-api-service.service';
import { Room } from 'app/core/models/room/room';
import { RoomTypeApiServiceService } from 'app/core/services/room-type/room-type-api-service.service';
import { BookingRoomApi } from 'app/core/services/booking-room-api/booking-room-api';
import { AddBookingComponent } from 'app/modules/system-categories/book-room/add-booking/add-booking.component';
import { BookingRoom } from 'app/core/models/booking-room/booking-room';
import { AddAssetComponent } from 'app/modules/system-categories/asset-resuorce/add-asset/add-asset.component';
@Component({
  selector: 'jhi-add-booking-future',
  templateUrl: './add-booking-future.component.html',
  styleUrls: ['./add-booking-future.component.scss']
})
export class AddBookingFutureComponent implements OnInit {
  data = {};
  form: FormGroup;
  height: number;
  itemsPerPage: any;
  maxSizePage: any;
  routeData: any;
  page: number;
  second: any;
  totalItems: any;
  previousPage: any;
  predicate: any;
  reverse: any;
  formValue;
  eventSubscriber: Subscription;
  listUnit$ = new Observable<any[]>();
  unitSearch;
  debouncer: Subject<string> = new Subject<string>();
  roomTypeList: any[] = [];
  cities = [{ id: 1, name: '???? ?????t' }, { id: 2, name: '??ang ?????t' }, { id: 3, name: '???? thanh to??n' }, { id: 5, name: '???? chuy???n ph??ng' }];
  searchForm: any;
  SHOW_HIDE_COL_HEIGHT = SHOW_HIDE_COL_HEIGHT;
  listRoom: Room[] = [];
  listBooking: BookingRoom[] = [];
  columns = [
    { key: 0, value: 'M?? ?????t ph??ng', isShow: false },
    { key: 1, value: 'Kh??ch h??ng', isShow: true },
    { key: 2, value: 'T??n ph??ng', isShow: true },
    { key: 3, value: 'Lo???i ph??ng', isShow: true },
    { key: 4, value: 'V??? tr??', isShow: true },
    { key: 5, value: 'Th???i gian ?????n', isShow: true },
    { key: 6, value: 'Th???i gian ??i', isShow: true },
    { key: 7, value: 'Tr???ng th??i', isShow: true }
  ];
  debouncer5: Subject<string> = new Subject<string>();
  active = 1;
  user = JSON.parse(localStorage.getItem('user'));
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private heightService: HeightService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    protected router: Router,
    private spinner: NgxSpinnerService,
    private eventManager: JhiEventManager,
    private bookingRoomApi: BookingRoomApi,
    private toastService: ToastService,
    private roomApiService: RoomApiServiceService,
    private commonService: CommonService
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.maxSizePage = MAX_SIZE_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      if (data && data.pagingParams) {
        this.page = data.pagingParams.page;
        this.previousPage = data.pagingParams.page;
        this.reverse = data.pagingParams.ascending;
        this.predicate = data.pagingParams.predicate;
      }
    });
  }

  ngOnInit() {
    this.buidForm();
    this.searchForm = {};
    this.onResize();
    this.loadAll();
    this.registerChange();
    this.debounceOnSearch5();
    this.getRoomList();
  }

  private buidForm() {
    this.form = this.formBuilder.group({
      roomId: [],
      status: []
    });
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

  onResize() {
    this.height = this.heightService.onResizeWithoutFooter();
  }

  loadAll() {
    this.spinner.show();
    this.searchForm.roomId = this.form.value.roomId;
    this.searchForm.status = this.form.value.status;
    this.searchForm.page = this.page;
    this.searchForm.pageSize = this.itemsPerPage;
    this.bookingRoomApi.searchBookingRoomFuture(this.searchForm).subscribe(
      res => {
        this.spinner.hide();
        this.paginateUserList(res);
      },
      err => {
        this.spinner.hide();
        this.toastService.openErrorToast('Error from server');
      }
    );
  }

  registerChange() {
    this.eventSubscriber = this.eventManager.subscribe('HumanResourcesChange', response => this.loadAll());
  }

  debounceOnSearch5() {
    this.debouncer5.pipe(debounceTime(TIME_OUT.DUE_TIME_SEARCH)).subscribe(value => this.loadDataOnSearchUnit5(value));
  }

  loadDataOnSearchUnit5(term) {}

  openModalAddBookingRoom(type?: string, data?: any) {
    const modalRef = this.modalService.open(AddBookingComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.bookType = 'future';
    if (data != null) {
      modalRef.componentInstance.bookingId = data.bookingroomId;
    }
    modalRef.result
      .then(result => {
        if (result) {
          this.loadAll();
        }
      })
      .catch(() => {
        this.loadAll();
      });
  }

  openModalDelete(type?: string, data?: any) {
    const modalRef = this.modalService.open(ConfirmModalComponent, { centered: true, backdrop: 'static' });
    modalRef.componentInstance.type = 'deleteBooking';
    modalRef.componentInstance.onCloseModal.subscribe(value => {
      if (value === true) {
        this.bookingRoomApi.delete(data).subscribe(
          success => {
            this.activeModal.dismiss();
            this.toastService.openSuccessToast('X??a l???ch ?????t ph??ng th??nh c??ng');
            this.router.navigate(['/system-categories/book-room-future']);
            this.loadAll();
          },
          err => {
            this.toastService.openErrorToast('X??a l???ch ?????t ph??ng th???t b???i');
            this.spinner.hide();
          },
          () => {
            this.spinner.hide();
          }
        );
      }
    });
  }

  openModalReceive(type?: string, data?: any) {
    // const oned = 24 * 60 * 60 * 1000;
    // console.log(Math.ceil(Math.abs(date2)));
    const modalRef = this.modalService.open(ConfirmModalComponent, { centered: true, backdrop: 'static' });
    modalRef.componentInstance.type = 'receiveBooking';
    modalRef.componentInstance.onCloseModal.subscribe(value => {
      if (value === true) {
        this.bookingRoomApi.receive(data).subscribe(
          success => {
            this.activeModal.dismiss();
            this.toastService.openSuccessToast(success.data.msgSuccess);
            this.router.navigate(['/system-categories/book-room-future']);
            this.loadAll();
          },
          err => {
            this.toastService.openErrorToast(err.error.msgCode);
            this.spinner.hide();
          },
          () => {
            this.spinner.hide();
          }
        );
      }
    });
  }

  toggleColumns(col) {
    col.isShow = !col.isShow;
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  private paginateUserList(res) {
    this.totalItems = res.dataCount;
    this.listBooking = res.data;
  }

  get formControl() {
    return this.form.controls;
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  changePageSize(size) {
    this.itemsPerPage = size;
    this.transition();
  }

  onSearchData() {
    this.transition();
  }

  transition() {
    this.router.navigate(['/system-categories/book-room-future'], {
      queryParams: {}
    });
    this.loadAll();
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  setValueToField(item, data) {
    this.form.get(item).setValue(data);
  }

  getValueOfField(item) {
    return this.form.get(item).value;
  }

  trimSpace(element) {
    const value = this.getValueOfField(element);
    if (value) {
      this.setValueToField(element, value.trim());
    }
  }

  convertDate(str) {
    if (str === null || str === '') {
      return '';
    } else {
      const date = new Date(str);
      return (
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
        '/' +
        (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
        '/' +
        date.getFullYear()
      );
      // return [date.getFullYear(), mnth, day].join('-');
    }
  }

  convertJson(value) {
    if (value) {
      return JSON.parse(value);
    }
  }
}

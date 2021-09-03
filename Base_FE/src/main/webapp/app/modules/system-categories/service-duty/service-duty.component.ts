import { Component, OnInit } from '@angular/core';
import { TourModel } from 'app/core/models/tour/tourModel';
import { QUYEN } from 'app/shared/constants/authen';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeightService } from 'app/shared/services/height.service';
import { TourService } from 'app/core/services/tour.service';
import { ToastService } from 'app/shared/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE, MAX_SIZE_PAGE } from 'app/shared/constants/pagination.constants';
import { ConfirmModalComponent } from 'app/shared/components/confirm-modal/confirm-modal.component';
import { SHOW_HIDE_COL_HEIGHT } from 'app/shared/constants/perfect-scroll-height.constants';
import { AdddutyComponent } from 'app/modules/system-categories/service-duty/addduty/addduty.component';
import { DutyServiceService } from 'app/core/services/duty-service.service';
import { DutyModel } from 'app/core/models/Duty-model/DutyModel';
import * as moment from 'moment';

@Component({
  selector: 'jhi-service-duty',
  templateUrl: './service-duty.component.html',
  styleUrls: ['./service-duty.component.scss']
})
export class ServiceDutyComponent implements OnInit {
  listRoomResourcse: DutyModel[] = [];
  columns = [
    { key: 0, value: 'Mã chực nhật', isShow: true },
    { key: 1, value: 'Người chực', isShow: true },
    { key: 2, value: 'Tên phòng', isShow: true },
    { key: 3, value: 'Ngày chực', isShow: true },
    { key: 4, value: 'Thời gian bắt đầu', isShow: true },
    { key: 5, value: 'Thời gian kết thúc', isShow: true },
    { key: 6, value: 'Thời gian bắt đầu thực tế', isShow: true },
    { key: 7, value: 'Thời gian kết thúc thực tế', isShow: true },
    { key: 8, value: 'Mô tả', isShow: true }
  ];
  quyen = QUYEN;
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
  searchForm: any;
  SHOW_HIDE_COL_HEIGHT = SHOW_HIDE_COL_HEIGHT;
  roomTypeList: any[] = [];

  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private heightService: HeightService,
    private dutyServiceService: DutyServiceService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    protected router: Router,
    private activatedRoute: ActivatedRoute
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
    this.loadAll();
  }

  // loa du lieu bang
  loadAll() {
    this.spinner.show();
    this.searchForm.code = this.form.value.code;
    this.searchForm.name = this.form.value.name;
    this.searchForm.page = this.page;
    this.searchForm.pageSize = this.itemsPerPage;
    this.dutyServiceService.search(this.searchForm).subscribe(
      res => {
        this.spinner.hide();
        for (const item of res.data) {
          item.date = item.date ? moment(item.date).format('DD/MM/YY HH:mm:ss') : '';
          item.startDateTime = item.startDateTime ? moment(item.startDateTime).format('DD/MM/YY HH:mm:ss') : '';
          item.endDateTime = item.endDateTime ? moment(item.endDateTime).format('DD/MM/YY HH:mm:ss') : '';
          item.acTualStartDateTime = item.acTualStartDateTime ? moment(item.acTualStartDateTime).format('DD/MM/YY HH:mm:ss') : '';
          item.acTualEndDateTime = item.acTualEndDateTime ? moment(item.acTualEndDateTime).format('DD/MM/YY HH:mm:ss') : '';
        }
        this.paginateUserList(res);
      },
      err => {
        this.spinner.hide();
        // this.toastService.openErrorToast(this.translateService.instant('common.toastr.messages.error.load'));
        this.toastService.openErrorToast('loi');
      }
    );
  }

  getRoomTypeList() {
    // this.roomApiServiceService.getRoomTypeList().subscribe(
    //   res => {
    //     if (res) {
    //       this.roomTypeList = res.data;
    //     } else {
    //       this.roomTypeList = [];
    //     }
    //   },
    //   err => {
    //     this.roomTypeList = [];
    //   }
    // );
  }

  // xoa tài sản
  deleteAsset(data) {
    const modalRef = this.modalService.open(ConfirmModalComponent, { centered: true, backdrop: 'static' });
    modalRef.componentInstance.type = 'delete';
    modalRef.componentInstance.param = 'tour';
    modalRef.componentInstance.onCloseModal.subscribe(value => {
      if (value === true) {
        this.deleteAsset1(data.id);
      }
    });
  }

  deleteAsset1(ids) {
    this.dutyServiceService.delete(ids).subscribe(
      res => {
        this.spinner.show();
        if (res.data) {
          this.spinner.hide();
          this.toastService.openSuccessToast('Xóa tour thành công!');
          this.loadAll();
        }
      },
      error => {
        this.spinner.hide();
        this.toastService.openErrorToast('Có lỗi');
      }
    );
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['system-categories/duty-resources'], {
      queryParams: {
        // page: this.page,
        // pageSize: this.itemsPerPage,
        // sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
        // code: this.form.get('code').value ? this.form.get('code').value : '',
        // parcode: this.form.get('positionName').value ? this.form.get('positionName').value : '',
        // active: this.active,
        // name:"sdad",
      }
    });
    this.loadAll();
  }

  changePageSize(size) {
    this.itemsPerPage = size;
    this.transition();
  }

  onSearchData() {
    this.transition();
  }

  /////////////
  toggleColumns(col) {
    col.isShow = !col.isShow;
  }

  onResize() {
    this.height = this.heightService.onResizeWithoutFooter();
  }

  openModalAddUser(type?: string, selectedData?: any) {
    const modalRef = this.modalService.open(AdddutyComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.id = selectedData ? selectedData.id : null;
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

  private buidForm() {
    this.form = this.formBuilder.group({
      roomId: [],
      code: [],
      name: [''],
      note: [null],
      floorNumber: [],
      maxNumber: [],
      roomType: []
    });
  }

  private paginateUserList(res) {
    this.totalItems = res.dataCount;
    this.listRoomResourcse = res.data;
  }
}

import { Component, OnInit } from '@angular/core';
import { RoomModel } from 'app/core/models/room-model/room-model';
import { QUYEN } from 'app/shared/constants/authen';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeightService } from 'app/shared/services/height.service';
import { RoomApiServiceService } from 'app/core/services/room-api/room-api-service.service';
import { ToastService } from 'app/shared/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE, MAX_SIZE_PAGE } from 'app/shared/constants/pagination.constants';
import { ConfirmModalComponent } from 'app/shared/components/confirm-modal/confirm-modal.component';
import { SHOW_HIDE_COL_HEIGHT } from 'app/shared/constants/perfect-scroll-height.constants';
import { AddtourComponent } from 'app/modules/system-categories/tour/addtour/addtour.component';
import { TourModel } from 'app/core/models/tour/tourModel';
import { TourService } from 'app/core/services/tour.service';

@Component({
  selector: 'jhi-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  listRoomResourcse: TourModel[] = [];
  columns = [
    { key: 0, value: 'Mã tour', isShow: true },
    { key: 1, value: 'Tên tên tour', isShow: true },
    { key: 2, value: 'Phương tiện', isShow: true },
    { key: 3, value: 'Loại hình', isShow: true },
    { key: 4, value: 'Giá', isShow: true },
    // { key: 5, value: 'Trạng thái', isShow: true },
    { key: 5, value: 'Mô tả', isShow: true }
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
    private tourService: TourService,
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
    this.tourService.search(this.searchForm).subscribe(
      res => {
        this.spinner.hide();
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
        this.deleteAsset1(data.idtour);
      }
    });
  }

  deleteAsset1(ids) {
    this.tourService.deleteRoom(ids).subscribe(
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
    this.router.navigate(['/system-categories/tour-resources'], {
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
    const modalRef = this.modalService.open(AddtourComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.id = selectedData ? selectedData.idtour : null;
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeightService } from 'app/shared/services/height.service';
import { RoomApiServiceService } from 'app/core/services/room-api/room-api-service.service';
import { ToastService } from 'app/shared/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE, MAX_SIZE_PAGE } from 'app/shared/constants/pagination.constants';
import { ConfirmModalComponent } from 'app/shared/components/confirm-modal/confirm-modal.component';
import { SHOW_HIDE_COL_HEIGHT } from 'app/shared/constants/perfect-scroll-height.constants';
import { AddPromotionComponent } from 'app/modules/system-categories/promotion/add-promotion/add-promotion.component';
import { PromotionService } from 'app/core/services/promotionService/promotion.service';
import { PromotionModel } from 'app/core/models/promotion-model/promotion-model';
import { QUYEN } from 'app/shared/constants/authen';

@Component({
  selector: 'jhi-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
  listPromotionResourcse: PromotionModel[] = [];
  columns = [
    { key: 0, value: 'Mã khuyến mại', isShow: true },
    { key: 1, value: 'Tên tên khuyến mại', isShow: true },
    { key: 2, value: 'giá trị', isShow: true },
    { key: 3, value: 'Ngày bắt đầu', isShow: true },
    { key: 4, value: 'Ngày kết thúc', isShow: true },
    { key: 5, value: 'Loại phòng', isShow: true },
    { key: 6, value: 'Ghi chú', isShow: true }
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
    private promotionService: PromotionService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    protected router: Router,
    private roomApiServiceService: RoomApiServiceService,
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
    this.getRoomTypeList();
  }
  getRoomTypeList() {
    this.roomApiServiceService.getRoomTypeList().subscribe(
      res => {
        if (res) {
          this.roomTypeList = res.data;
        } else {
          this.roomTypeList = [];
        }
      },
      err => {
        this.roomTypeList = [];
      }
    );
  }
  // loa du lieu bang
  loadAll() {
    //this.spinner.show();
    this.searchForm.promotionId = this.form.value.promotionId;
    this.searchForm.promotionCode = this.form.value.promotionCode;
    this.searchForm.roomTypeIDSearch = this.form.value.roomTypeID;
    this.searchForm.startDate = this.form.value.startDate;
    //debugger;
    this.searchForm.page = this.page;
    this.searchForm.pageSize = this.itemsPerPage;
    this.promotionService.searchRoom(this.searchForm).subscribe(
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

  // xoa tài sản
  deleteAsset(data) {
    const modalRef = this.modalService.open(ConfirmModalComponent, { centered: true, backdrop: 'static' });
    modalRef.componentInstance.type = 'delete';
    modalRef.componentInstance.param = 'tài khuyến mại';
    modalRef.componentInstance.onCloseModal.subscribe(value => {
      if (value === true) {
        this.deleteAsset1(data.promotionId);
      }
    });
  }

  deleteAsset1(ids) {
    this.promotionService.deleteRoom(ids).subscribe(
      res => {
        this.spinner.show();
        if (res.data) {
          this.spinner.hide();
          this.toastService.openSuccessToast('Xóa khuyến mại thành công!');
          this.loadAll();
        }
      },
      error => {
        this.spinner.hide();
        // this.toastService.openErrorToast(this.translateService.instant('user.invalidDelete'));
        // this.toastService.openErrorToast("Xóa nhân sự thất bại, có rằng buộc dữ liệu");
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
    this.router.navigate(['/system-categories/promotion-resources'], {
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
    const modalRef = this.modalService.open(AddPromotionComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.id = selectedData ? selectedData.promotionId : null;
    console.warn('tesst' + modalRef.componentInstance.id);

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
      promotionId: null,
      startDate: null,
      endDate: null,
      promotionCode: null,
      promotionName: null,
      status: 1,
      percentPromotion: null,
      roomTypeID: null,
      roomTypeIDSearch: null,
      roomNameType: null,
      note: null
    });
  }

  private paginateUserList(res) {
    this.totalItems = res.dataCount;
    this.listPromotionResourcse = res.data;
  }

  convertDate(str) {
    const date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('/');
  }
}

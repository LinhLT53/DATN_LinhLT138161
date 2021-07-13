import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeightService } from 'app/shared/services/height.service';
import { AddRoomTypeComponent } from 'app/modules/system-categories/room-type/add-room-type/add-room-type.component';
import { ToastService } from 'app/shared/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE, MAX_SIZE_PAGE } from 'app/shared/constants/pagination.constants';
import { ConfirmModalComponent } from 'app/shared/components/confirm-modal/confirm-modal.component';
import { SHOW_HIDE_COL_HEIGHT } from 'app/shared/constants/perfect-scroll-height.constants';
import { RoomTypeApiServiceService } from 'app/core/services/room-type/room-type-api-service.service';
import { RoomTypeModel } from 'app/core/models/room-type-model/room-type-model';
import { QUYEN } from 'app/shared/constants/authen';

@Component({
  selector: 'jhi-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.scss']
})
export class RoomTypeComponent implements OnInit {
  listRoomResourcse: RoomTypeModel[] = [];
  columns = [
    { key: 0, value: 'Mã phòng', isShow: true },
    { key: 1, value: 'Tên loại phòng', isShow: true },
    { key: 2, value: 'Ảnh loại phòng', isShow: true },
    { key: 3, value: 'Ghi chú', isShow: true }
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

  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private heightService: HeightService,
    private roomTypeApiServiceService: RoomTypeApiServiceService,
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
    //this.spinner.show();
    this.searchForm.roomTypeId = this.form.value.roomTypeId;
    this.searchForm.code = this.form.value.code;
    this.searchForm.name = this.form.value.name;
    this.searchForm.dayPrice = this.form.value.dayPrice;
    this.searchForm.nightPrice = this.form.value.nightPrice;
    this.searchForm.hourPrice = this.form.value.hourPrice;

    //debugger;
    this.searchForm.page = this.page;
    this.searchForm.pageSize = this.itemsPerPage;
    this.roomTypeApiServiceService.searchRoomType(this.searchForm).subscribe(
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
    modalRef.componentInstance.param = 'tài sản';
    modalRef.componentInstance.onCloseModal.subscribe(value => {
      if (value === true) {
        this.deleteAsset1(data.roomTypeId);
      }
    });
  }

  deleteAsset1(ids) {
    this.roomTypeApiServiceService.deleteRoom(ids).subscribe(
      res => {
        this.spinner.show();
        if (res.data) {
          this.spinner.hide();
          this.toastService.openSuccessToast('Xóa tài sản thành công!');
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
    this.router.navigate(['/system-categories/room-type-resources'], {
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
    const modalRef = this.modalService.open(AddRoomTypeComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.id = selectedData ? selectedData.roomTypeId : null;
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
      roomTypeId: [],
      code: [],
      name: [''],
      note: [null],
      dayPrice: [],
      nightPrice: [],
      hourPrice: [],
      status: [],
      roomCode: [],
      roomType: []
    });
  }

  private paginateUserList(res) {
    this.totalItems = res.dataCount;
    this.listRoomResourcse = res.data;
  }
}

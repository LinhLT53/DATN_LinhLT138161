import { Component, OnInit } from '@angular/core';
import { RoomModel } from 'app/core/models/room-model/room-model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeightService } from 'app/shared/services/height.service';
import { RoomApiServiceService } from 'app/core/services/room-api/room-api-service.service';
import { ToastService } from 'app/shared/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE, MAX_SIZE_PAGE } from 'app/shared/constants/pagination.constants';
import { ConfirmModalComponent } from 'app/shared/components/confirm-modal/confirm-modal.component';
import { AddRoomComponent } from 'app/modules/system-categories/room/add-room/add-room.component';
import { SHOW_HIDE_COL_HEIGHT } from 'app/shared/constants/perfect-scroll-height.constants';
import { CustomerModel } from 'app/core/models/Customer_Model/customer-model';
import { CustomerApiService } from 'app/core/services/customer-api/customer-api.service.service';
import { AddCustomerComponent } from 'app/modules/system-categories/customer/add-customer/add-customer.component';
import { QUYEN } from 'app/shared/constants/authen';

@Component({
  selector: 'jhi-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  listCustomerResourcse: CustomerModel[] = [];
  columns = [
    { key: 0, value: 'Tên khách hàng', isShow: true },
    { key: 1, value: 'Số chứng minh thứ', isShow: true },
    { key: 2, value: 'Số điện thoại', isShow: true },
    { key: 4, value: 'Email', isShow: true },
    { key: 5, value: 'Đia chỉ', isShow: true }
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
    private customerApiService: CustomerApiService,
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
    this.searchForm.fullname = this.form.value.fullname;
    this.searchForm.phoneNumber = this.form.value.phoneNumber;
    //debugger;
    this.searchForm.page = this.page;
    this.searchForm.pageSize = this.itemsPerPage;
    this.customerApiService.searchCustomer(this.searchForm).subscribe(
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
    modalRef.componentInstance.param = 'khach hang';
    modalRef.componentInstance.onCloseModal.subscribe(value => {
      if (value === true) {
        this.deleteAsset1(data.customerId);
      }
    });
  }

  deleteAsset1(ids) {
    this.customerApiService.deleteCustomer(ids).subscribe(
      res => {
        this.spinner.show();
        if (res.data) {
          this.spinner.hide();
          this.toastService.openSuccessToast('Xóa khach hang thành công!');
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
    this.router.navigate(['/system-categories/customer-resources'], {
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
    const modalRef = this.modalService.open(AddCustomerComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.id = selectedData ? selectedData.customerId : null;
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
      customerId: [],
      fullname: [],
      cmt: [''],
      phoneNumber: [null],
      email: [],
      address: [],
      status: []
    });
  }

  private paginateUserList(res) {
    this.totalItems = res.dataCount;
    this.listCustomerResourcse = res.data;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeightService } from 'app/shared/services/height.service';
import { AddServiceComponent } from 'app/modules/system-categories/service/add-service/add-service.component';
import { ToastService } from 'app/shared/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE, MAX_SIZE_PAGE } from 'app/shared/constants/pagination.constants';
import { ConfirmModalComponent } from 'app/shared/components/confirm-modal/confirm-modal.component';
import { SHOW_HIDE_COL_HEIGHT } from 'app/shared/constants/perfect-scroll-height.constants';
import { ServiceService } from 'app/core/services/service/service.service';
import { ServiceModel } from 'app/core/models/service-model/service-model';
import { QUYEN } from 'app/shared/constants/authen';
import { Authen } from 'app/shared/util/authen';
@Component({
  selector: 'jhi-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  listService: ServiceModel[] = [];
  columns = [
    { key: 0, value: 'Mã dịch vụ', isShow: true },
    { key: 1, value: 'Tên dịch vụ', isShow: true },
    { key: 2, value: 'Giá', isShow: true },
    { key: 4, value: 'Unit', isShow: true },
    { key: 5, value: 'Ghi chú', isShow: true }
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
    private serviceService: ServiceService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    protected router: Router,
    private activatedRoute: ActivatedRoute,
    private authen: Authen
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
    this.authen.checkAuthen(QUYEN.DICHVU);
    this.buidForm();
    this.searchForm = {};
    this.loadAll();
  }

  // loa du lieu bang
  loadAll() {
    //this.spinner.show();
    this.searchForm.serviceId = this.form.value.serviceId;
    this.searchForm.servicecode = this.form.value.servicecode;
    this.searchForm.servicename = this.form.value.servicename;
    this.searchForm.price = this.form.value.price;
    this.searchForm.unit = this.form.value.unit;
    this.searchForm.note = this.form.value.note;

    //debugger;
    this.searchForm.page = this.page;
    this.searchForm.pageSize = this.itemsPerPage;
    this.serviceService.searchService(this.searchForm).subscribe(
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
    modalRef.componentInstance.param = 'dich vụ';
    modalRef.componentInstance.onCloseModal.subscribe(value => {
      if (value === true) {
        this.deleteAsset1(data.serviceId);
      }
    });
  }

  deleteAsset1(ids) {
    this.serviceService.deleteService(ids).subscribe(
      res => {
        this.spinner.show();
        if (res.data) {
          this.spinner.hide();
          this.toastService.openSuccessToast('Xóa dịch vụ thành công!');
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
    this.router.navigate(['/system-categories/service-resources'], {
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
    const modalRef = this.modalService.open(AddServiceComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.id = selectedData ? selectedData.serviceId : null;
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
      serviceId: [],
      servicecode: [],
      servicename: [''],
      note: [null],
      price: [],
      unit: [],
      status: []
    });
  }

  private paginateUserList(res) {
    this.totalItems = res.dataCount;
    this.listService = res.data;
  }
}

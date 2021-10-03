import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeightService } from 'app/shared/services/height.service';
import { CommonService } from 'app/shared/services/common.service';
import { ToastService } from 'app/shared/services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JhiEventManager } from 'ng-jhipster';
import { SysUserService } from 'app/core/services/system-management/sys-user.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { FormStoringService } from 'app/shared/services/form-storing.service';
import { ServiceService } from 'app/core/services/service/service.service';
import { Router } from '@angular/router';
import { STORAGE_KEYS } from 'app/shared/constants/storage-keys.constants';
import { TourService } from 'app/core/services/tour.service';

@Component({
  selector: 'jhi-addtour',
  templateUrl: './addtour.component.html',
  styleUrls: ['./addtour.component.scss']
})
export class AddtourComponent implements OnInit {
  oldEmail: any;
  @Input() type;
  @Input() id: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  ngbModalRef: NgbModalRef;
  form: FormGroup;
  height: number;
  maxlength = 4;
  isDuplicateUserCode = false;
  title = '';
  checkBoll = false;
  isYear = false;
  yy: number;
  years: number[] = [];
  userDetail: any;
  post: Date;

  ////////////////////////
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
    private formStoringService: FormStoringService,
    private tourService: TourService,
    protected router: Router
  ) {
    this.height = this.heightService.onResize();
  }

  get formControl() {
    return this.form.controls;
  }

  ngOnInit() {
    this.buildForm();
  }

  /////////////////////////////////////////////////
  onSubmitData() {
    if (this.form.invalid) {
      this.commonService.validateAllFormFields(this.form);
      return;
    }

    if (this.type === 'add') {
      if (this.isDuplicateUserCode) {
        console.warn('duplicate');
        return;
      }
    }
    this.spinner.show();
    this.tourService.save(this.form.value).subscribe(
      res => {
        if (this.type === 'add') {
          this.toastService.openSuccessToast('Thêm mới thành công !');
        }
        if (this.type === 'update') {
          this.toastService.openSuccessToast('Sửa thành công !');
        }

        this.router.navigate(['system-categories/tour-resources']);
        this.activeModal.dismiss();
      },
      err => {
        this.toastService.openErrorToast(this.type === 'add' ? 'Thêm mới không thành công' : 'Sửa thất bại');
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  trimSpace(element) {
    const value = this.getValueOfField(element);
    if (value) {
      this.setValueToField(element, value.trim());
    }
  }

  onBlurUserCode() {}

  displayFieldHasError(field: string) {
    return {
      'has-error': this.isFieldValid(field)
    };
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  getValueOfField(item) {
    return this.form.get(item).value;
  }

  setValueToField(item, data) {
    this.form.get(item).setValue(data);
  }

  onResize() {
    this.height = this.heightService.onResizeWithoutFooter();
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  getUserDetail(id) {
    this.tourService.getInfo(id).subscribe(
      res => {
        this.userDetail = res.data;

        this.oldEmail = this.userDetail.email ? this.userDetail.email : '';

        this.setDataDefault();
      },
      err => {
        this.userDetail = null;
      }
    );
  }

  setDataDefault() {
    this.form.patchValue(this.userDetail);
    this.post = new Date(this.userDetail);
  }

  getYear() {
    const todays = new Date();
    this.yy = todays.getFullYear();
    for (let i = this.yy; i >= 1970; i--) {
      this.years.push(i);
    }
  }

  xetDataUer() {
    const userToken: any = this.formStoringService.get(STORAGE_KEYS.USER);
    if (userToken.role === 'ROLE_ADMINPART') {
      // this.form.get("partId").setValue(userToken.partId)
      this.checkBoll = true;
    } else {
      this.checkBoll = false;
    }
  }

  private buildForm() {
    if (this.type === 'add') {
      this.title = 'Thêm mới tour';
    } else if (this.type === 'update') {
      this.title = 'Sửa dịch vụ';
    } else this.title = 'Xem chi tiết tour';

    this.form = this.formBuilder.group({
      idtour: null,
      code: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9]+$/)])],
      name: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      venue: [''],
      vehicle: [''],
      price: null,
      service: [''],
      status: 1,
      tourtype: '',
      note: ['', Validators.maxLength(1000)]
    });
    if (this.id) {
      this.getUserDetail(this.id);
      this.xetDataUer();
    } else {
      this.xetDataUer();
    }
    this.getYear();
  }
}

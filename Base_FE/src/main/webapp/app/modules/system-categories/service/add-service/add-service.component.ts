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
import { Router } from '@angular/router';
import { STORAGE_KEYS } from 'app/shared/constants/storage-keys.constants';
import { ServiceService } from 'app/core/services/service/service.service';
import { ConfimModalImgComponent } from 'app/shared/components/confim-modal-img/confim-modal-img.component';
import { ImageApiService } from 'app/core/services/image-api/image-api.service';

@Component({
  selector: 'jhi-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
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
  listurl = [];
  dataStringPath: any;
  listDataImg = [];
  dataIm: any = [];
  msg = '';
  url;

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
    private imageApiService: ImageApiService,
    private formStoringService: FormStoringService,
    private serviceService: ServiceService,
    protected router: Router
  ) {
    this.height = this.heightService.onResize();
  }

  get formControl() {
    return this.form.controls;
  }

  ngOnInit() {
    this.buildForm();
    this.getFileImg();
  }
  getFileImg() {
    console.warn(this.dataStringPath);
    if (this.dataStringPath === undefined || this.dataStringPath === []) {
      return;
    }
    for (const p of this.dataStringPath) {
      this.imageApiService.getFile(p).subscribe(value => {
        const data = value;
        this.getFile(data, true);
      });
    }
  }
  deleteImgCustom(i) {
    const modalRef = this.modalService.open(ConfimModalImgComponent, { centered: true, backdrop: 'static' });
    modalRef.componentInstance.type = 'delete';
    modalRef.componentInstance.param = 'ảnh đính kèm';
    modalRef.componentInstance.status = this.type;
    modalRef.componentInstance.role = true;
    modalRef.componentInstance.imgData = this.listurl[i].data;
    modalRef.componentInstance.onCloseModal.subscribe(value => {
      if (value === true) {
        this.cleanAnh(i);
      }
    });
  }

  cleanAnh(i) {
    this.listDataImg.splice(i, 1);
    this.listurl.splice(i, 1);
  }
  selectFile(event) {
    for (const p of event.target.files) {
      this.getFile(p, true);
    }
  }

  getFile(file, check) {
    if (!file || file.length === 0) {
      this.msg = 'You must select an image';
      return;
    }

    const mimeType = file.type;
    this.listDataImg.push(file);
    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = _event => {
      this.msg = '';
      this.url = reader.result;
      this.listurl.push({ chech: check, data: reader.result, url: null });
    };
  }
  onSubmitData() {
    if (this.form.invalid) {
      this.commonService.validateAllFormFields(this.form);
      return;
    }

    if (this.type === 'add') {
      if (this.isDuplicateUserCode) {
        return;
      }
    }
    this.spinner.show();
    if (this.form.value.status == true) {
      this.form.value.status = 1;
    } else {
      this.form.value.status = 0;
    }
    this.serviceService.save(this.form.value).subscribe(
      res => {
        if (this.type === 'add') {
          const tyle = 2;
          const formData = new FormData();
          for (const c of this.listDataImg) {
            formData.append('file', c);
          }

          this.imageApiService.save(res.data.serviceId, tyle, formData).subscribe(
            res1 => {
              this.toastService.openSuccessToast('Thêm mới anh thành công !');
            },
            error => {}
          );
          this.toastService.openSuccessToast('Thêm mới thành công !');
        }
        if (this.type === 'update') {
          const tyle = 2;
          const formData = new FormData();
          for (const c of this.listDataImg) {
            formData.append('file', c);
          }
          formData.append('data', this.dataIm);
          this.imageApiService.update(this.id, tyle, formData).subscribe(
            value => {
              this.toastService.openSuccessToast('Sửa ảnh thành công !');
            },
            error => {}
          );

          this.toastService.openSuccessToast('Sửa thành công !');
        }
        this.router.navigate(['system-categories/service-resources']);
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
    this.serviceService.getInfo(id).subscribe(
      res => {
        this.userDetail = res.data;

        this.oldEmail = this.userDetail.email ? this.userDetail.email : '';

        this.setDataDefault();
      },
      err => {
        this.userDetail = null;
      }
    );
    // this.imageApiService.getListDevice(this.id,this.data.idEquipmentGroup).subscribe(

    this.imageApiService.getListDevice(id, id).subscribe(value => {
      this.dataStringPath = value;
      if (this.dataStringPath !== []) {
        for (const p of this.dataStringPath) {
          this.imageApiService.getFile(p.url).subscribe(value1 => {
            const data = value1;
            this.getFile(data, p.group);
          });
        }
      }
    });
  }

  setDataDefault() {
    this.form.patchValue(this.userDetail);
    this.post = new Date(this.userDetail);
    // if (this.userDetail.dateGraduate) {
    //   this.form.get('experience').setValue(new Date().getFullYear() - toNumber(this.userDetail.dateGraduate));
    // }
    // if (this.userDetail.dateMajor) {
    //   this.form.get('majorExperience').setValue(new Date().getFullYear() - toNumber(this.userDetail.dateMajor));
    // }
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
      this.title = 'Thêm mới dịch vụ';
    } else if (this.type === 'update') {
      this.title = 'Sửa dịch vụ';
    } else this.title = 'Xem chi tiết dịch vụ';

    this.form = this.formBuilder.group({
      serviceId: null,
      hourPrice: null,
      servicecode: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9]+$/)])],
      servicename: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      status: [''],
      price: null,
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

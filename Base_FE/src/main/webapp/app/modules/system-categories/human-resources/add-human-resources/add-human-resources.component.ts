import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { HeightService } from 'app/shared/services/height.service';
import { HumanResourcesApiService } from 'app/core/services/Human-resources-api/human-resources-api.service';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { JhiEventManager } from 'ng-jhipster';
import { ToastService } from 'app/shared/services/toast.service';
import { CommonService } from 'app/shared/services/common.service';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { debounceTime } from 'rxjs/operators';
import { TIME_OUT } from 'app/shared/constants/set-timeout.constants';
import { SysUserService } from 'app/core/services/system-management/sys-user.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpResponse } from '@angular/common/http';
import { STATUS_CODE } from 'app/shared/constants/status-code.constants';
import { REGEX_PATTERN } from 'app/shared/constants/pattern.constants';
import { ConfirmModalComponent } from 'app/shared/components/confirm-modal/confirm-modal.component';
import { Router } from '@angular/router';
import { STORAGE_KEYS } from 'app/shared/constants/storage-keys.constants';
import { FormStoringService } from 'app/shared/services/form-storing.service';

@Component({
  selector: 'jhi-add-human-resources',
  templateUrl: './add-human-resources.component.html',
  styleUrls: ['./add-human-resources.component.scss'],
  providers: [DatePipe]
})
export class AddHumanResourcesComponent implements OnInit {
  oldEmail: any;
  @Input() type;
  @Input() id: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  ngbModalRef: NgbModalRef;
  form: FormGroup;
  listUnit$ = new Observable<any[]>();
  unitSearch;
  debouncer: Subject<string> = new Subject<string>();
  roleList: any[] = [];
  departmentList: any[] = [];
  partList: any[] = [];
  majorList: any[] = [];
  positionList: any[] = [];
  historyList: any[] = [];
  majorRequired = false;
  isDuplicateEmail = false;
  isDuplicateUserCode = false;
  height: number;
  post: Date;
  name: string;
  maxlength = 4;
  isError = false;
  userDetail: any;
  dateRecruitmentValid = false;
  dateGraduateValid = false;
  dateMajorValid = false;
  idDev: number;
  isYear = false;
  yy: number;
  years: number[] = [];
  checkBoll = false;
  statusList = [
    {
      id: 1,
      status: 'Đang làm việc'
    },
    {
      id: 2,
      status: 'Đã thôi việc'
    }
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
    private humanResourceService: HumanResourcesApiService,
    private translateService: TranslateService,
    private datepipe: DatePipe,
    private formStoringService: FormStoringService,
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
    this.getPositionList();
    // this.getPartList();
  }

  private getRoleList() {
    this.roleList = [{ id: 1, name: 'USER' }, { id: 2, name: 'ADMIN' }];
  }

  private buildForm() {
    if (this.type === 'add') {
      this.title = 'Thêm mới nhân sự';
    } else if (this.type === 'update') {
      this.title = 'Sửa nhân sự';
    } else this.title = 'Xem chi tiết nhân sự';
    this.form = this.formBuilder.group({
      humanResourceId: null,
      username: null,
      code: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9]+$/)])],
      fullName: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      positionId: [null, Validators.compose([Validators.required])],
      roleId: [1],
      cmt: ['', Validators.compose([Validators.required, Validators.maxLength(12)])],
      address: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      contractCode: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      taxCode: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      status: this.statusList[0].id,
      note: ['', Validators.maxLength(1000)],
      phone: [],
      dateOfBirth: []
    });
    if (this.id) {
      this.getUserDetail(this.id);
      this.xetDataUer();
    } else {
      this.xetDataUer();
    }
    this.getYear();
  }

  getDefaultData() {
    if (this.type && this.id) {
      this.commonService.clearDataTranfer('type');
      this.commonService.clearDataTranfer('id');
    } else {
      if (this.type !== 'add') {
        this.router.navigate(['system-categories/human-resources']);
      }
    }
  }

  setDataDefault() {
    this.form.patchValue(this.userDetail);
    this.post = new Date(this.userDetail);
  }

  getUserDetail(id) {
    this.humanResourceService.getInfo(id).subscribe(
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

  getDeparmentList() {
    this.humanResourceService.getDepartmentList().subscribe(
      res => {
        if (res) {
          this.departmentList = res.data;
          const DEV = this.departmentList.find(item => {
            return item.name === 'DEV';
          });
          this.idDev = DEV.id;
        } else {
          this.departmentList = [];
        }
      },
      err => {
        this.departmentList = [];
      }
    );
  }

  getPositionList() {
    this.humanResourceService.getPositionList().subscribe(
      res => {
        if (res) {
          this.positionList = res.data;
        } else {
          this.positionList = [];
        }
      },
      err => {
        this.positionList = [];
      }
    );
  }

  getPartList() {
    this.humanResourceService.getPartList().subscribe(
      res => {
        if (res) {
          this.partList = res.data;
        } else {
          this.partList = [];
        }
      },
      err => {
        this.partList = [];
      }
    );
  }

  getMajorList() {
    this.humanResourceService.getMajorList().subscribe(
      res => {
        if (res) {
          this.majorList = res.data;
        } else {
          this.majorList = [];
        }
      },
      err => {
        this.majorList = [];
      }
    );
  }

  dateGraduate() {
    if (this.form.value.dateGraduate) {
      if (this.form.value.dateGraduate > new Date().getFullYear()) {
        this.dateGraduateValid = true;
        this.form.get('dateGraduate').reset();
        this.form.get('experience').reset();
      } else {
        const experience = new Date().getFullYear() - this.form.value.dateGraduate;
        this.form.get('experience').setValue(experience);
        this.dateGraduateValid = false;
      }
    } else {
      return;
    }
  }

  onBlurEmail(field) {
    this.setValueToField(field, this.getValueOfField(field).trim());
    if (!REGEX_PATTERN.EMAIL.test(this.getValueOfField(field))) {
      if (this.getValueOfField(field) !== '') {
        this.form.controls[field].setErrors({ invalid: true });
      }
    } else {
      if (this.getValueOfField(field) !== '') {
        // check trùng
        if (this.type === 'add' || (this.type === 'update' && this.userDetail.email !== this.form.value.email)) {
          this.humanResourceService.checkEmail(this.form.value.email).subscribe(
            res => {
              this.isDuplicateEmail = false;
            },
            err => {
              this.isDuplicateEmail = true;
            }
          );
        }
      }
    }
  }

  onBlurUserCode() {
    if (this.type === 'add') {
      this.humanResourceService.checkUserCode(this.form.value.code).subscribe(
        res => {
          this.isDuplicateUserCode = false;
        },
        err => {
          this.isDuplicateUserCode = true;
        }
      );
    }
  }

  dateMajor() {
    if (this.form.value.dateMajor) {
      if (this.form.value.dateMajor > new Date().getFullYear()) {
        this.dateMajorValid = true;
        this.form.get('dateMajor').reset();
        this.form.get('majorExperience').reset();
      } else {
        const majorExperience = new Date().getFullYear() - this.form.value.dateMajor;
        this.form.get('majorExperience').setValue(majorExperience);
        this.dateMajorValid = false;
      }
    } else {
      return;
    }
  }

  dateRecruit() {
    if (this.type === 'add') {
      if (this.form.value.dateRecruitment) {
        if (new Date(this.form.value.dateRecruitment) > new Date()) {
          this.dateRecruitmentValid = true;
          this.form.get('dateRecruitment').reset();
        } else {
          this.dateRecruitmentValid = false;
        }
        this.isError = false;
      } else {
        this.isError = true;
        this.dateRecruitmentValid = true;
      }
    }
  }

  clearMajor() {
    if (this.form.value.departmentId !== this.idDev) {
      return this.form.get('majorId').reset();
    }
  }

  clearRole() {
    // if (this.form.value.departmentId !== this.idDev) {
    //   return this.form.get('roleId').reset();
    // }
  }

  onCancel() {
    if (this.type === 'update') {
      if (
        this.form.value.humanResourceId === this.userDetail.humanResourceId &&
        this.form.value.code === this.userDetail.code &&
        this.form.value.email === this.userDetail.email &&
        this.form.value.fullName === this.userDetail.fullName &&
        this.form.value.partId === this.userDetail.partId &&
        this.form.value.status === this.userDetail.status &&
        this.form.value.majorId === this.userDetail.majorId &&
        this.form.value.dateMajor === this.userDetail.dateMajor &&
        this.form.value.note === this.userDetail.note
      ) {
        this.activeModal.dismiss();
      } else {
        const modalRef = this.modalService.open(ConfirmModalComponent, { centered: true, backdrop: 'static' });
        modalRef.componentInstance.type = 'confirm';
        modalRef.componentInstance.onCloseModal.subscribe(value => {
          if (value === true) {
            this.activeModal.dismiss();
          }
        });
      }
    }
    if (this.type === 'add') {
      if (
        this.form.value.humanResourceId === null &&
        this.form.value.code === '' &&
        this.form.value.email === '' &&
        this.form.value.fullName === '' &&
        this.form.value.positionId === null &&
        this.checkNull() &&
        this.form.value.status === this.statusList[0].id &&
        this.form.value.note === ''
      ) {
        this.activeModal.dismiss();
      } else {
        const modalRef = this.modalService.open(ConfirmModalComponent, { centered: true, backdrop: 'static' });
        modalRef.componentInstance.type = 'confirm';
        modalRef.componentInstance.onCloseModal.subscribe(value => {
          if (value === true) {
            this.activeModal.dismiss();
          }
        });
      }
    }
    if (this.type === 'detail') {
      this.activeModal.dismiss();
    }
  }

  onSubmitData() {
    if (this.form.invalid) {
      this.commonService.validateAllFormFields(this.form);
      return;
    }
    if (this.isDuplicateEmail) {
      return;
    }
    if (this.type === 'add') {
      if (this.isDuplicateUserCode) {
        return;
      }
    }
    this.form.get('dateOfBirth').setValue(new Date(this.form.get('dateOfBirth').value));
    this.spinner.show();
    this.binDataUsername(this.form.value.email);
    this.humanResourceService.save(this.form.value).subscribe(
      res => {
        if (this.type === 'add') {
          this.toastService.openSuccessToast('Thêm mới thành công !');
        }
        if (this.type === 'update') {
          if (this.oldEmail !== this.form.value.email) {
            this.toastService.openSuccessToast('Thông tin đăng nhập mới đã được gửi về địa chỉ email ' + this.form.value.email);
          } else {
            this.toastService.openSuccessToast('Sửa thành công !');
          }
        }
        this.router.navigate(['system-categories/human-resources']);
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

  binDataUsername(email) {
    if (this.form.get('email').valid) {
      if (email.includes('.iist@gmail.com')) {
        this.form.value.username = email.slice(0, email.indexOf('.iist@gmail.com'));
      } else if (email.includes('@iist.vn')) {
        this.form.value.username = email.slice(0, email.indexOf('@iist.vn'));
      } else {
        this.form.value.username = email.slice(0, email.indexOf('@iist.com.vn'));
      }
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

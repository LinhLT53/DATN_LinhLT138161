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
import { RoomApiServiceService } from 'app/core/services/room-api/room-api-service.service';
import { STORAGE_KEYS } from 'app/shared/constants/storage-keys.constants';

@Component({
  selector: 'jhi-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit {
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
  assetList: any[] = [];
  roomTypeList: any[] = [];
  roomFloorList: any[] = [];
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
    private roomApiServiceService: RoomApiServiceService,
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
    this.buildForm();
    this.getAssetList();
    this.getRoomTypeList();
    this.getRoomFloorList();
  }

  getRoomFloorList() {
    this.roomApiServiceService.getRoomFloorList().subscribe(
      res => {
        if (res) {
          this.roomFloorList = res.data;
        } else {
          this.roomFloorList = [];
        }
      },
      err => {
        this.roomFloorList = [];
      }
    );
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
  getAssetList() {
    this.roomApiServiceService.getAsseList().subscribe(
      res => {
        if (res) {
          this.assetList = res.data;
        } else {
          this.assetList = [];
        }
      },
      err => {
        this.assetList = [];
      }
    );
  }
  /////////////////////////////////////////////////
  onSubmitData() {
    if (this.form.invalid) {
      this.commonService.validateAllFormFields(this.form);
      console.warn('aaaaaaa');
      return;
    }

    if (this.type === 'add') {
      if (this.isDuplicateUserCode) {
        console.warn('duplicate');
        return;
      }
    }
    this.spinner.show();
    this.roomApiServiceService.save(this.form.value).subscribe(
      res => {
        if (this.type === 'add') {
          this.toastService.openSuccessToast('Thêm mới thành công !');
        }
        if (this.type === 'update') {
          this.toastService.openSuccessToast('Sửa thành công !');
        }

        this.router.navigate(['system-categories/room-resources']);
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

  onBlurUserCode() {
    // if (this.type === 'add'&& this.userDetail.code !== this.form.value.code) {
    // if (this.type === 'add') {
    //
    //   this.humanResourceService.checkUserCode(this.form.value.code).subscribe(res => {
    //
    //     this.isDuplicateUserCode = false;
    //
    //   }, err => {
    //     this.isDuplicateUserCode = true;
    //   });
    // }
  }

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

    // if (this.type === 'update') {
    //   if (
    //     this.form.value.humanResourceId === this.userDetail.humanResourceId &&
    //     this.form.value.code === this.userDetail.code &&
    //     this.form.value.email === this.userDetail.email &&
    //     this.form.value.fullName === this.userDetail.fullName &&
    //     this.form.value.partId === this.userDetail.partId &&
    //     this.form.value.status === this.userDetail.status &&
    //     this.form.value.majorId === this.userDetail.majorId &&
    //     this.form.value.dateMajor === this.userDetail.dateMajor &&
    //     this.form.value.note === this.userDetail.note
    //   ) {
    //     this.activeModal.dismiss();
    //   } else {
    //     const modalRef = this.modalService.open(ConfirmModalComponent, {centered: true, backdrop: 'static'});
    //     modalRef.componentInstance.type = 'confirm';
    //     modalRef.componentInstance.onCloseModal.subscribe(value => {
    //       if (value === true) {
    //         this.activeModal.dismiss();
    //       }
    //     });
    //   }
    // }
    // if (this.type === 'add') {
    //   if (
    //     this.form.value.humanResourceId === null &&
    //     this.form.value.code === '' &&
    //     this.form.value.email === '' &&
    //     this.form.value.fullName === '' &&
    //     this.form.value.positionId === null &&
    //     this.checkNull() &&
    //     this.form.value.status === this.statusList[0].id &&
    //     this.form.value.note === ''
    //
    //   ) {
    //     this.activeModal.dismiss();
    //   } else {
    //     const modalRef = this.modalService.open(ConfirmModalComponent, {centered: true, backdrop: 'static'});
    //     modalRef.componentInstance.type = 'confirm';
    //     modalRef.componentInstance.onCloseModal.subscribe(value => {
    //       if (value === true) {
    //         this.activeModal.dismiss();
    //       }
    //     });
    //   }
    // }
    // if (this.type === 'detail') {
    //   this.activeModal.dismiss();
    // }
  }

  getUserDetail(id) {
    this.roomApiServiceService.getInfo(id).subscribe(
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
      this.form.get('partId').setValue(userToken.assetId);
      this.form.get('roomTypeId').setValue(userToken.roomType);
      this.form.get('id').setValue(userToken.roomType);

      this.checkBoll = true;
    } else {
      this.checkBoll = false;
    }
  }

  private buildForm() {
    if (this.type === 'add') {
      this.title = 'Thêm mới phòng';
    } else if (this.type === 'update') {
      this.title = 'Sửa phòng';
    } else this.title = 'Xem chi tiết phòng';

    this.form = this.formBuilder.group({
      roomId: null,
      maxNumber: null,
      roomCode: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9]+$/)])],
      roomName: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      status: 1,
      floorNumber: null,
      roomType: null,
      note: ['', Validators.maxLength(1000)],
      assetId: [null, Validators.compose([Validators.required])]
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

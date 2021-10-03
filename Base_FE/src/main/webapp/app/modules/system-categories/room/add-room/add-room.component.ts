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
import { ConfimModalImgComponent } from 'app/shared/components/confim-modal-img/confim-modal-img.component';
import { ImageApiService } from 'app/core/services/image-api/image-api.service';
import { HumanResourcesApiService } from 'app/core/services/Human-resources-api/human-resources-api.service';

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
  humanresourecsList: any[] = [];

  listurl = [];
  dataStringPath: any;
  listDataImg = [];
  dataIm: any = [];
  msg = '';
  url;
  status: any;
  public tivi: boolean;
  public elevator: boolean;
  public pet: boolean;
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
    protected router: Router,
    private imageApiService: ImageApiService,
    private humanResourcesApiService: HumanResourcesApiService
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
    this.getlistHumanResources();
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

  getlistHumanResources() {
    this.humanResourcesApiService.getAllHumanResources().subscribe(
      res => {
        if (res) {
          this.humanresourecsList = res.data;
        } else {
          this.humanresourecsList = [];
        }
      },
      error => {
        this.humanresourecsList = [];
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
    } else {
      if (this.status === 3) {
        this.toastService.openErrorToast('Phòng đã được đặt chưa được sửa');
        return;
      }
    }

    this.roomApiServiceService.save(this.form.value).subscribe(
      res => {
        if (this.type === 'add') {
          const tyle = 2;
          const formData = new FormData();
          for (const c of this.listDataImg) {
            formData.append('file', c);
          }
          this.toastService.openSuccessToast('Thêm mới thành công !');
          this.imageApiService.save(res.data.roomId, tyle, formData).subscribe(
            res1 => {
              this.toastService.openSuccessToast('Thêm mới anh thành công !');
            },
            error => {}
          );
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
    this.roomApiServiceService.getInfo(id).subscribe(
      res => {
        this.userDetail = res.data;
        this.status = this.userDetail.status;
        this.oldEmail = this.userDetail.email ? this.userDetail.email : '';
        this.tivi = this.userDetail.tivi;
        this.pet = this.userDetail.pet;
        this.elevator = this.userDetail.elevator;

        this.setDataDefault();
      },
      err => {
        this.userDetail = null;
      }
    );

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
      this.form.get('humanResourcesId').setValue(userToken.roomType);

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
      assetId: [null, Validators.compose([Validators.required])],
      humanResourcesId: [],
      tivi: [],
      elevator: [],
      pet: [],
      price: []
    });
    if (this.id) {
      this.getUserDetail(this.id);
      this.xetDataUer();
    } else {
      this.xetDataUer();
    }
    this.getYear();
  }

  public ontivi(value: boolean) {
    this.tivi = value;
    this.form.get('tivi').setValue(this.tivi);
  }
  public onelevator(value: boolean) {
    this.elevator = value;
    this.form.get('elevator').setValue(this.elevator);
  }
  public onpet(value: boolean) {
    this.pet = value;
    this.form.get('pet').setValue(this.pet);
  }
}

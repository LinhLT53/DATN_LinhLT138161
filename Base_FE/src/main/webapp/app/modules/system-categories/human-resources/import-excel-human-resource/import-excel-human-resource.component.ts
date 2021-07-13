import {Component, ElementRef, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {ConfirmModalComponent} from "app/shared/components/confirm-modal/confirm-modal.component";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HeightService} from "app/shared/services/height.service";
import {HumanResourcesApiService} from "app/core/services/Human-resources-api/human-resources-api.service";
import {TranslateService} from "@ngx-translate/core";
import {ToastService} from "app/shared/services/toast.service";
import {NgxSpinnerService} from "ngx-spinner";
import {UploadFileComponent} from "app/shared/components/upload-file/upload-file.component";
import {CommonApiService} from "app/core/services/common-api/common-api.service";
import {JhiEventManager} from "ng-jhipster";
import {ActivatedRoute} from "@angular/router";
import {DownloadService} from "app/shared/services/download.service";
import {CommonUtils} from "app/shared/util/common-utils.service";
import {STATUS_CODE} from "app/shared/constants/status-code.constants";
import 'core-js/features/array/includes';

@Component({
  selector: 'jhi-import-excel-human-resource',
  templateUrl: './import-excel-human-resource.component.html',
  styleUrls: ['./import-excel-human-resource.component.scss']
})
export class ImportExcelHumanResourceComponent implements OnInit {
  @Input() type;
  @ViewChild('UploadFileInput', {static: false}) uploadFileInput: ElementRef;
  @ViewChild('fileImport', {static: false}) fileImport: UploadFileComponent;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  form: FormGroup;
  height: number;

  @Input() public isClose;
  @ViewChild('cancelBtn', {static: false}) cancelBtn: ElementRef;
  @ViewChild('closeBtn', {static: false}) closeBtn: ElementRef;
  @ViewChild('deleteFileElem', {static: false}) deleteFileElem: ElementRef;
  @ViewChild('downloadTemplateBtn', {static: false}) downloadTemplateBtn: ElementRef;
  @ViewChild('downloadResultBtn', {static: false}) downloadResultBtn: ElementRef;

  file: any;
  successRecord = 0;
  totalRecord = 0;
  formatIncorrect = false;
  exceedMaxSize = false;
  uploadSuccess = false;
  resultImportTrue = false;
  resultImportFalse = false;
  fileNotChoose = false;
  importResult = false;
  errImport = false;
  successImport = false;
  successMessage;
  errMessage;
  path: any;
  isCancel = false;
  isKeyPress = false;
  isEsc = false;
  isClick = false;
  errorFileStatus = false;
  dataFileResultExcel: any;
  isProcess = true;
  checkTaskTimeHandle = null;
  validMaxSize = 5;


  constructor(
    public activeModal: NgbActiveModal,
    private humanResourcesApiService: HumanResourcesApiService,
    private commonApiService: CommonApiService,
    private eventManager: JhiEventManager,
    private activatedRoute: ActivatedRoute,
    private heightService: HeightService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private toastService: ToastService,
    private translateService: TranslateService,
    private downloadService: DownloadService,
    private commonUtils: CommonUtils,
  ) {
  }

  ngOnInit() {
  }

  onClickedOutside() {
    if (
      this.isClose &&
      this.isCancel &&
      !this.isKeyPress &&
      document.activeElement !== this.cancelBtn.nativeElement &&
      document.activeElement !== this.closeBtn.nativeElement &&
      document.activeElement !== this.downloadTemplateBtn.nativeElement &&
      document.activeElement !== this.deleteFileElem.nativeElement &&
      document.activeElement !== this.downloadResultBtn.nativeElement
    ) {
      this.isClose = false;
      this.onCloseAddModal();
      this.isClick = true;
    }
    !this.isClose ? (this.isCancel = false) : (this.isCancel = true);
    !this.isEsc ? (this.isKeyPress = false) : (this.isKeyPress = true);
  }


  onCloseAddModal() {
    if (this.file && !this.importResult) {
      this.isClose = false;
      this.isEsc = true;
      this.isClick = true;
      const modalRef = this.modalService.open(ConfirmModalComponent, {centered: true, backdrop: 'static'});
      modalRef.componentInstance.type = 'confirm';
      modalRef.componentInstance.onCloseModal.subscribe(value => {
        if (value === true) {
          this.activeModal.dismiss();
        }
        this.isClose = true;
        this.isEsc = false;
        this.isClick = false;
      });
    } else {
      this.activeModal.dismiss();
      this.activeModal.dismiss(true);
    }
  }

  deleteFileImport() {
    this.file = '';
    this.fileImport.delete();
    this.errImport = false;
    this.successImport = false;
    this.importResult = false;
  }

  onError(event) {
    if (event === '') {
      this.errImport = false;
      this.successImport = true;
      this.successMessage = this.translateService.instant('common.import.success.upload');
    } else {
      this.errImport = true;
      this.successImport = false;
      this.errMessage = event;
    }
  }

  onChangeFile(event) {
    this.file = event;
    if (CommonUtils.tctGetFileSize(this.file) > this.validMaxSize) {
      this.errImport = true;
      this.successImport = false;
      this.errMessage = this.translateService.instant('common.import.error.exceedMaxSize');
      return false;
    }
  }

  onFocusOut() {
    this.isClose = true;
    this.isCancel = true;
  }

  downloadFileTemplate(excelType) {
    this.spinner.show();
    if ('xlsx' === excelType) {
      this.humanResourcesApiService.downloadTemplateFileExcel(excelType).subscribe(res => {
        this.spinner.hide();
        console.warn(111, res);
        if (res) {
          this.downloadService.downloadFile(res);
        }
      });
    } else if ('xls' === excelType) {
      this.humanResourcesApiService.downloadTemplateFileExcel(excelType).subscribe(res => {
        this.spinner.hide();
        console.warn(111, res);
        if (res) {
          this.downloadService.downloadFile(res);
        }
      });
    }
  }

  downloadFileImport() {
    console.warn(this.dataFileResultExcel);
    this.downloadService.downloadFile(this.dataFileResultExcel);
  }

  onSubmitImport() {
    this.isProcess = true;
    this.resetMess();
    if (CommonUtils.tctGetFileSize(this.file) > this.validMaxSize) {
      this.errImport = true;
      this.successImport = false;
      this.errMessage = this.translateService.instant('common.import.error.exceedMaxSize');
      return false;
    }
    if (!this.file) {
      this.errImport = true;
      this.successImport = false;
      this.errMessage = this.translateService.instant('common.import.error.notChooseFile');
    } else {
      this.spinner.show();
      this.humanResourcesApiService.doImport(this.file).subscribe(
        res => {
          this.spinner.hide();
          // if (res) {
          //   console.warn(res);
          //   const idTask = res.body.id;
          //   this.checkTaskTimeHandle = setInterval(() => {
          //     console.warn('CALL API CHECK TASK PROCESS: ' + idTask);
          //     console.warn('---- START CHECK ------');
          //     this.checkProcessTaskImport(idTask);
          //     console.warn('---- END CHECK ------');
          //     // neu truong hop import thanh cong hoa co loi xay ra => dung check task
          //   }, 10000); // 10s
          // }
          this.errImport = false;
          this.successImport = true;
          this.successMessage = this.translateService.instant('common.import.success.importsuccess');
          // , {
          //   successRecord: this.successRecord,
          //   totalRecord: this.totalRecord
          // });
          this.importResult = true;
          console.warn("123245" + res);
          this.dataFileResultExcel = res;

        },
        err => {
          console.warn(err);
          this.spinner.hide();
          this.successImport = false;
          this.errImport = true;
          this.errMessage = this.translateService.instant('common.import.error.default');
          this.importResult = true;

          // if (err.status === STATUS_CODE.BAD_REQUEST) {
          //   this.commonUtils.parseErrorBlob(err).subscribe(rs => {
          //     this.errMessage = rs.message;
          //   });
          //   this.errImport = true;
          //   this.successImport = false;
          //   this.errMessage = err.error.data ? err.error.data : this.translateService.instant('common.import.error.default');
          // } else {
          //   this.errImport = true;
          //   this.successImport = false;
          //   this.errMessage = this.translateService.instant('common.import.error.default');
          // }
        }
      );
    }
  }

  resetMess() {
    this.formatIncorrect = false;
    this.exceedMaxSize = false;
    this.uploadSuccess = false;
    this.resultImportTrue = false;
    this.resultImportFalse = false;
    this.fileNotChoose = false;
    this.importResult = false;
    this.errImport = false;
    this.successImport = false;
  }


  // check trang thai cua task import
  // checkProcessTaskImport(id: number) {
  //   console.warn('CHECK TASK IMPORT');
  //   this.humanResourcesApiService.checkProcessTaskAsyncImport(id).subscribe(
  //     res => {
  //       if ('PROCESSING' === res.body.statusCode) {
  //         // TH: task import dang thuc hien
  //         this.isProcess = true;
  //       } else if ('SUCCESS' === res.body.statusCode) {
  //         // TH: task Import thanh cong
  //         this.spinner.hide();
  //         this.isProcess = false;
  //         this.eventManager.broadcast({ name: 'searchAllPartnerCapacityProf' });
  //         // goi api download file
  //         this.humanResourcesApiService.downloadFileImport(id).subscribe(
  //           resDownload => {
  //             // truong hop thanh cong
  //             this.successRecord = Number(resDownload.headers.get('successRecord'));
  //             this.totalRecord = Number(resDownload.headers.get('totalRecord'));
  //             this.dataFileResultExcel = resDownload;
  //             console.warn(this.dataFileResultExcel);
  //             this.importResult = true;
  //             this.errImport = false;
  //             this.successImport = true;
  //             this.successMessage = this.translateService.instant('common.import.success.import', {
  //               successRecord: this.successRecord,
  //               totalRecord: this.totalRecord
  //             });
  //
  //             if (!this.isProcess) {
  //               this.spinner.hide();
  //               if (this.checkTaskTimeHandle !== null) {
  //                 clearInterval(this.checkTaskTimeHandle);
  //               }
  //             }
  //           },
  //           error => {
  //             if (!this.isProcess) {
  //               this.spinner.hide();
  //               if (this.checkTaskTimeHandle !== null) {
  //                 clearInterval(this.checkTaskTimeHandle);
  //               }
  //             }
  //           }
  //         );
  //       } else {
  //         // TH: task Import bi loi
  //         console.warn('TASK ' + id + 'ERROR ');
  //         this.spinner.hide();
  //         // truong hop loi
  //         this.errImport = true;
  //         this.successImport = false;
  //         this.errMessage = res.body.message ? res.body.message : this.translateService.instant('common.import.error.default');
  //         this.isProcess = false;
  //
  //         if (!this.isProcess) {
  //           console.warn('----- CLEAR TIMEOUT -----');
  //           this.spinner.hide();
  //           if (this.checkTaskTimeHandle !== null) {
  //             clearInterval(this.checkTaskTimeHandle);
  //           }
  //         }
  //       }
  //     },
  //     error => {
  //       this.isProcess = false;
  //       this.errImport = true;
  //       this.successImport = false;
  //       this.errMessage = this.translateService.instant('common.import.error.default');
  //
  //       if (!this.isProcess) {
  //         this.spinner.hide();
  //         if (this.checkTaskTimeHandle !== null) {
  //           clearInterval(this.checkTaskTimeHandle);
  //         }
  //       }
  //     }
  //   );
  // }
}

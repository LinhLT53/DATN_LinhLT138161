import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'app/shared/services/toast.service';
import { CommonUtils } from 'app/shared/util/common-utils.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'jhi-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => UploadFileComponent),
      multi: true
    }
  ]
})
export class UploadFileComponent implements OnInit {
  @ViewChild('inputFile', { static: false }) inputFile: ElementRef;
  @Input() property: FormControl;
  @Input() typeScreen: string;
  @Input() multiple = false;
  @Input() accept: string;
  @Input() validMaxSize = 5; // MB
  @Input() isButton = false;
  @Input() fileType: string;
  @Input() labelName: string;
  @Input() suggest = '';
  @Input() messErrorInvalid: string;
  @Input() messErrorMaxSize: string;
  @Input() required: string;
  @Output() onFileChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<any> = new EventEmitter<any>();
  @Output() onReset = new EventEmitter();
  @Input() title: string;
  @Input() isFocus = true;
  @Input() isDisable = false;
  @Input() strType: string;
  @Input() isError: boolean;
  @Input() touched = false;
  @Input() msgErrTouch = '';
  @Input() showCheck: false;
  @Input() msgTooltip: '';

  file: File;
  files: File[]; //ThucDV modifi
  fileName: string;
  dateUpload:any;
  localUrl: any;
  test: any;
  imgResultAfterCompress: string;
  ratio: number;

  constructor(
    private toastService: ToastService,
    private imageCompress: NgxImageCompressService,
    private translateService: TranslateService
  ) {}

  set _file(file) {
    if (file) {
      this.file = file;
    }
  }

  setEmptyFile() {
    if (this.inputFile.nativeElement) {
      this.inputFile.nativeElement.value = '';
    }

    this.ngOnInit();
  }

  ngOnInit() {
    this.strType === undefined ? (this.strType = 'file') : (this.strType = this.strType);
    this.file = null;
    console.warn(80,"type", this.typeScreen)
  }

  // public resizeImage() {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(this.file);
  //   reader.onload = (ev: any) => {
  //     this.localUrl = reader.result;
  //     this.compressFile(this.localUrl, this.fileName, this.file.type);
  //   };
  // }

  // compressFile(image, fileName, types) {
  //   const orientation = -1;
  //   this.imageCompress.compressFile(image, orientation, this.ratio, 50).then(
  //     result => {
  //       this.imgResultAfterCompress = result;
  //       const imageBlob = this.dataUriToBlob(this.imgResultAfterCompress.split(',')[1], types);
  //       this.file = new File([imageBlob], this.fileName, {type: types});
  //       this.onChangeFile();
  //     });
  // }

  // dataUriToBlob(dataUri, types) {
  //   const byteString = window.atob(dataUri);
  //   const arrayBuffer = new ArrayBuffer(byteString.length);
  //   const int8Array = new Uint8Array(arrayBuffer);
  //   for (let i = 0; i < byteString.length; i++) {
  //     int8Array[i] = byteString.charCodeAt(i);
  //   }
  //   const blob = new Blob([int8Array], {type: types});
  //   return blob;
  // }


  public onChange(event) {
    // this.file = null;
    // this.files = null;
    this.files = event.target.files;
    // if(this.files.length === 0) {
    //   this.onChangeFile();
    // }
    if (this.files && this.files.length > 0) {
      const files = [];
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        if (this.isValidFile(file)) {
          this.onError.emit('');
          files.push(file);
        }
      }
      if (files.length > 0) {
        this.files = files;
        this.file = this.files[0];
        this.fileName = this.file.name;
        this.dateUpload = this.convertDate(new Date());
        this.onChangeFile();
        // this.checkFile();
      } else {
        this.inputFile.nativeElement.value = '';
      }
    }
  }
  convertDate(str) {
    const date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('/');
  }
  public isValidFile(files): boolean {
    if (!files) {
      return true;
    }
    if (this.accept) {
      const fileName = files.name;
      const temp = fileName.split('.');
      const ext = temp[temp.length - 1].toLowerCase();
      const ruleFile = ',' + this.accept;
      if (!ruleFile.toLowerCase().includes(ext)) {
        this.onError.emit(
          this.translateService.instant(
            this.messErrorInvalid ? this.messErrorInvalid : 'common.import.error.formatIncorrect',
            this.messErrorInvalid ? '' : { accept: this.accept }
          )
        );
        // this.file = null;
        // this.onChangeFile();
        return false;
      }
    }
    if (this.validMaxSize > 0) {
      if (CommonUtils.tctGetFileSize(files) > this.validMaxSize) {
        this.onError.emit(
          this.translateService.instant(this.messErrorMaxSize ? this.messErrorMaxSize : 'common.import.error.exceedMaxSize')
        );
        // this.file = null;
        // this.onChangeFile();
        return false;
      }
    }
    return true;
  }

  // public checkFile() {
  //   const mineType = this.file.type;
  //   const mineSize = this.file.size;
  //   if (mineType.startsWith('image') && mineSize >= 1048576) {
  //     if (1048575 < mineSize && mineSize < 2097152) {
  //       this.ratio = 30;
  //     } else {
  //       if (2097152 < mineSize && mineSize < 3145728) {
  //         this.ratio = 15;
  //       } else {
  //         this.ratio = 12;
  //       }
  //     }
  //     this.resizeImage();
  //   } else {
  //     this.onChangeFile();
  //   }
  // }

  public onChangeFile() {
    let files: any[] = [];
    if (this.multiple && this.property) {
      files = this.property.value || [];
    } else if (this.property && this.property.value != null) {
      const file = this.property.value;
      files.push(file);
    }
    const oldArr: any[] = [];
    files.forEach(file => oldArr.push(file));
    if (!this.files) {
      this.files = [];
    }
    this.files.forEach(file => {
      let isDuplicate = false;
      oldArr.forEach(oldFile => {
        if (oldFile.name === file.name) {
          this.onError.emit(
            this.translateService.instant(this.messErrorMaxSize ? this.messErrorMaxSize : 'common.import.error.exceedMaxSize')
          );
          // this.app.warningMessage('controls.fileExist', null, {file: file.name});
          isDuplicate = true;
          return;
        }
      });
      if (!isDuplicate) {
        files.unshift(file);
      }
    });
    if (files && files.length > 0) {
      this.files = files;
    }
    if (this.property) {
      this.property.setValue(this.multiple ? this.files : this.file);
    }

    this.onFileChange.emit(this.multiple ? this.files : this.file);
    if (this.files && this.files.length > 0) {
      if (!this.multiple) {
        this.fileName = this.file.name;
        // this.inputFile.nativeElement.value = this.fileName;
      } else {
        this.fileName = ' ';
        // this.inputFile.nativeElement.value = ' ';
      }
    } else {
      this.fileName = '';
      // this.inputFile.nativeElement.value = '';
    }
  }

  public delete() {
    this.inputFile.nativeElement.value = '';
    this.ngOnInit();
  }

  public onFocus() {
    this.inputFile.nativeElement.focus();
  }

  onTouchChangeFile() {
    if (this.touched && !this.files) {
      this.emitLog();
    }
  }

  emitLog() {
    this.msgErrTouch
      ? this.onError.emit(this.msgErrTouch)
      : this.onError.emit(this.translateService.instant('common.import.error.fileNotChoose'));
  }
}

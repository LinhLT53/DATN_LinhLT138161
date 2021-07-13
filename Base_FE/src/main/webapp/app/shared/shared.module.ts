import {forwardRef, NgModule} from '@angular/core';
import {DatePipe} from '@angular/common';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {InvoiceWebappSharedLibsModule} from './shared-libs.module';
import {FindLanguageFromKeyPipe} from './language/find-language-from-key.pipe';
import {DecodeHtmlPipe} from 'app/shared/pipes/decode-html.pipe';
import {JhiAlertComponent} from './alert/alert.component';
import {JhiAlertErrorComponent} from './alert/alert-error.component';
import {NgbDatePickerFormatter} from 'app/shared/util/datepicker-formatter';
import {PageSizeComponent} from 'app/shared/components/page-size/page-size.component';
import {ErrorMessagesComponent} from 'app/shared/components/error-messages/error-messages.component';
import {SpinnerComponent} from 'app/shared/components/spinner/spinner.component';
import {DatePickerComponent} from 'app/shared/components/date-picker/date-picker.component';
import {DateTimePickerComponent} from 'app/shared/components/date-time-picker/date-time-picker.component';
import {DateRangePickerComponent} from 'app/shared/components/date-range-picker/date-range-picker.component';
import {UploadFileComponent} from 'app/shared/components/upload-file/upload-file.component';
import {ConfirmModalComponent} from './components/confirm-modal/confirm-modal.component';
import {CommonService} from 'app/shared/services/common.service';
import {DataFormatService} from 'app/shared/services/data-format.service';
import {RegexInputDirective} from 'app/shared/directives/regex-input.directive';
import {AutoFocusFieldDirective} from 'app/shared/directives/auto-focus-field.directive';
import {NotificationComponent} from './components/notification/notification.component';
import {ModalDragDirective} from 'app/shared/directives/modal-drag.directive';
import {HasPermissionDirective} from 'app/shared/directives/has-permission.directive';
import {HasMultiPermissionDirective} from 'app/shared/directives/has-multi-permission.directive';
import {AutoThousandPipe} from "app/shared/pipes/auto-thousand.pipe";
import {ConvertStatusPipe} from "app/shared/pipes/convert-status.pipe";
import {MaxLengthTextPipe} from "app/shared/pipes/max-length-text.pipe";
import {EmptyDataComponent} from "app/shared/components/empty-data/empty-data.component";
import {NgZorroAntdModule} from "ng-zorro-antd";
import { ConfimModalImgComponent } from './components/confim-modal-img/confim-modal-img.component';
@NgModule({
  imports: [InvoiceWebappSharedLibsModule, NgZorroAntdModule],
  declarations: [
    FindLanguageFromKeyPipe,
    DecodeHtmlPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    SpinnerComponent,
    ErrorMessagesComponent,
    DatePickerComponent,
    DateTimePickerComponent,
    DateRangePickerComponent,
    PageSizeComponent,
    UploadFileComponent,
    RegexInputDirective,
    AutoFocusFieldDirective,
    ConfirmModalComponent,
    ConfimModalImgComponent,
    ModalDragDirective,
    NotificationComponent,
    AutoThousandPipe,
    HasMultiPermissionDirective,
    HasPermissionDirective,
    ConvertStatusPipe,
    MaxLengthTextPipe,
    EmptyDataComponent
  ],
  entryComponents: [ConfirmModalComponent, NotificationComponent,ConfimModalImgComponent],
  exports: [
    InvoiceWebappSharedLibsModule,
    FindLanguageFromKeyPipe,
    DecodeHtmlPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    SpinnerComponent,
    ErrorMessagesComponent,
    DatePickerComponent,
    DateTimePickerComponent,
    DateRangePickerComponent,
    PageSizeComponent,
    UploadFileComponent,
    RegexInputDirective,
    ModalDragDirective,
    AutoFocusFieldDirective,
    NotificationComponent,
    HasPermissionDirective,
    HasMultiPermissionDirective,
    ConvertStatusPipe,
    MaxLengthTextPipe,
    EmptyDataComponent
  ],
  providers: [
    CommonService,
    DataFormatService,
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    },
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DateRangePickerComponent)
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PageSizeComponent),
      multi: true
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadFileComponent),
      multi: true
    },
    AutoThousandPipe,
    {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter},
    {provide: NgbDateParserFormatter, useClass: NgbDatePickerFormatter}
  ]
})
export class InvoiceWebappSharedModule {
}

import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, forwardRef, Injector, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbDatepicker, NgbPopover, NgbPopoverConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateTimeModel } from 'app/core/models/base.model';
import { noop } from 'rxjs';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask.js';

@Component({
  selector: 'jhi-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true
    },
    {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}
  ]
})
export class DateTimePickerComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  @Input() dateString: string;
  @Input() inputDatetimeFormat = 'dd/MM/yyyy HH:mm:ss';
  @Input() hourStep = 1;
  @Input() minuteStep = 1;
  @Input() secondStep = 1;
  @Input() seconds = true;
  @Input() disabled = false;
  @Input() showTimePicker = false;
  @Input() isFocus = false;
  @Input() minDate;
  @Input() maxDate;
  @Input() typeDate;
  @Output() onError: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('dateTimepicker', {static: false}) dateTimepicker: NgbDatepicker;
  @ViewChild('timepicker', {static: false}) timepicker: NgbDatepicker;
  @ViewChild('input', {read: ViewContainerRef, static: true}) public input;
  @ViewChild(NgbPopover, {static: false}) private popover: NgbPopover;

  mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM:SS');
  maskedInputController;

  // showTimePickerToggle = false;
  datetime: any = new DateTimeModel();
  firstTimeAssign = true;
  onTouched: () => void = noop;
  onChange: (_: any) => void = noop;
  disabledTime = true;
  ngControl: NgControl;
  hasErr = false;
  msg = 'Ngày giờ nhập không hợp lệ.';

  constructor(
    private config: NgbPopoverConfig,
    private inj: Injector
  ) {
    config.autoClose = 'outside';
    config.placement = 'auto';
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.maskedInputController = textMask.maskInput({
        inputElement: this.input.element.nativeElement,
        mask: this.mask,
        pipe: this.autoCorrectedDatePipe,
        keepCharPositions: true
      });
    });
  }

  ngOnInit(): void {
    this.ngControl = this.inj.get(NgControl);
  }

  writeValue(newModel: string) {
    if (newModel) {
      this.disabledTime = false;
      this.datetime = Object.assign(this.datetime, DateTimeModel.fromLocalString(newModel));
      this.dateString = (Number(this.datetime.day) < 10 ? '0' + this.datetime.day : this.datetime.day) + '/' + (Number(this.datetime.month) < 10 ? '0' + this.datetime.month : this.datetime.month) + '/' + this.datetime.year + ' ' + (Number(this.datetime.hour) < 10 ? '0' + this.datetime.hour : this.datetime.hour) + ':' + (Number(this.datetime.minute) < 10 ? '0' + this.datetime.minute : this.datetime.minute) + ':' + (Number(this.datetime.second) < 10 ? '0' + this.datetime.second : this.datetime.second);
      this.datetime = new Date(newModel);
      this.datetime.day = this.datetime.getDate();
      this.datetime.month = this.datetime.getMonth() + 1;
      this.datetime.year = this.datetime.getFullYear();
      this.datetime.hour = this.datetime.getHours();
      this.datetime.minute = this.datetime.getMinutes();
      this.datetime.second = this.datetime.getSeconds();
      this.setDateStringModel();
    } else {
      this.datetime = new DateTimeModel();
      this.setDateStringModel();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleDateTimeState($event) {
    // this.showTimePickerToggle = !this.showTimePickerToggle;
    // $event.stopPropagation();
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange($event: any) {
    const value = $event.target.value;
    this.commitValue(value);
  }
  commitValue(value) {
    const temp1 = value.split(' ');
    if (temp1.length === 0) {
      this.onChange('');
      this.datetime = new DateTimeModel();
      return;
    }
    const temp2 = temp1[0].split(/\//);
    let convertDate;
    if (temp2.length < 3) {
      this.datetime = new DateTimeModel();
      this.onChange('');
    } else if (temp2.length === 3) {
      convertDate = ([temp2[1], temp2[0], temp2[2]]).join('/') + ' ' + temp1[1];
    }
    const dt = DateTimeModel.fromLocalString(convertDate);
    if (dt) {
      this.disabledTime = false;
      this.datetime = new Date(convertDate);
      this.datetime.hour = dt.hour;
      this.datetime.minute = dt.minute;
      this.datetime.second = dt.second;
      this.datetime.year = dt.year;
      this.datetime.month = dt.month;
      this.datetime.day = dt.day;
      this.onChange(this.datetime);
      this.checkDateValid(this.datetime);
    } else if (value.trim() === '') {
      this.disabledTime = true;
      this.datetime = new DateTimeModel();
      this.dateString = '';
      this.onChange(this.dateString);
    } else {
      this.disabledTime = true;
      this.dateString = '';
      this.datetime = new DateTimeModel();
      this.onChange('');
    }
  }

  /**
   * Hàm dùng để check date khi nhập bằng tay
   * Author: ThienDq
   */
  checkMaxDateInput(year, month, day, dateS, type) {
    if ( (type === 1 && year > dateS.year) || (type === 2 && year < dateS.year) ) {
      return true;
    } else if (year === dateS.year) {
      return this.checkMonth(month, day, dateS, type);
    }
    this.hasErr = false;
    return false;
  }

  checkMonth(month, day, dateS, type) {
    if ( (type === 1 && month > dateS.month) || (type === 2 && month < dateS.month)) {
      return true;
    } else if (month === dateS.month) {
      return this.checkDay(day, dateS, type);
    }
    this.hasErr = false;
    return false;
  }

  checkDay(day, dateS, type) {
    if ((type === 1 && day > dateS.day) || (type === 2 && day < dateS.day)) {
      return true;
    } else if (day === dateS.day) {
      return this.validDateOfMaxDate(this.datetime, dateS, type);
    }
    this.hasErr = false;
    return false;
  }

  onDateChange($event) {
    if ($event.year) {
      $event = `${$event.year}-${$event.month}-${$event.day}`;
    }
    const date = DateTimeModel.fromLocalString($event);
    if (!date) {
      return;
    }
    if (!this.datetime) {
      this.datetime = date;
    }
    this.datetime = new Date($event);
    this.datetime.year = date.year;
    this.datetime.month = date.month;
    this.datetime.day = date.day;
    this.datetime.hour = date.hour;
    this.datetime.minute = date.minute;
    this.datetime.second = date.second;
    // this.dateTimepicker.navigateTo({year: this.datetime.year, month: this.datetime.month});

    this.setDateStringModel();
    this.disabledTime = false;
    // this.popover.close();
  }

  onTimeChange(event: NgbTimeStruct) {
    this.datetime.hour = event.hour;
    this.datetime.minute = event.minute;
    this.datetime.second = event.second;
    this.setDateStringModel();
  }

  /**
   * Sử dụng khi có sử dụng date. Được gọi trong hàm onTimeChange
   * Mục đích sử dụng: so sánh thời gian được chọn của datetimepicker với maxDate
   * return true khi ngày = ngày hiện tại của maxDate thời gian không thỏa mãn
   *  Author: ThienDq
   */
  validDateOfMaxDate(event: NgbTimeStruct, dateS, type) {
    if (this.datetime.year === dateS.year && this.datetime.month === dateS.month && this.datetime.day === dateS.day) {
      if (event.hour > dateS.hour && type === 1 || event.hour < dateS.hour && type === 2) {
        return true;
      } else if (event.hour === dateS.hour) {
        if (event.minute > dateS.minute && type === 1 || event.minute < dateS.minute && type === 2) {
          return true;
        } else if (event.minute === dateS.minute) {
          if (event.second > dateS.second && type === 1 || event.second < dateS.second && type === 2) {
            return true;
          }
        }
      }
      this.hasErr = false;
      return false;
    }
    this.hasErr = false;
    return false;
  }

  setDateStringModel() {
    if (!this.firstTimeAssign) {
      this.dateString = (Number(this.datetime.day) < 10 ? '0' + this.datetime.day : this.datetime.day) + '/' + (Number(this.datetime.month) < 10 ? '0' + this.datetime.month : this.datetime.month) + '/' + this.datetime.year + ' ' + (Number(this.datetime.hour) < 10 ? '0' + this.datetime.hour : this.datetime.hour) + ':' + (Number(this.datetime.minute) < 10 ? '0' + this.datetime.minute : this.datetime.minute) + ':' + (Number(this.datetime.second) < 10 ? '0' + this.datetime.second : this.datetime.second);
      this.commitValue(this.dateString);
    } else {
      // Skip very first assignment to null done by Angular
      if (this.dateString !== null) {
        this.firstTimeAssign = false;
      }
    }
  }

  inputBlur($event) {
    this.onTouched();
  }

  isDateTimeInput(inputDate) {
    const isDateTime = inputDate.trim().match(/^(0[1-9]|1[0-9]|2[0-4])([0-5][1-9]|6[0])|(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])((19|2[0-9])[0-9]{2})$/gi);
    return isDateTime !== null;
  }

  /**
   * Hàm này sử dung check validate  với maxDate = new Date()
   * minDate được truyền từ bên kia sang
   *
   */
  checkDateValid(date) {
    const maxDates  = {
      year: new Date().getFullYear(),
      month:  new Date().getMonth() + 1,
      day:   new Date().getDate(),
      hour:  new Date().getHours(),
      minute: this.typeDate ? new Date().getMinutes() + 5 : new Date().getMinutes(),
      second: new Date().getSeconds()
    };
    if(this.maxDate !=  null && this.maxDate && !this.minDate) {
     this.hasErr = this.checkMaxDateInput(date.year, date.month, date.day, maxDates, 1)
    } else if (this.minDate != null && this.minDate && !this.maxDate) {
      this.hasErr = this.checkMaxDateInput(date.year, date.month, date.day, this.minDate, 2)
    }else if(this.maxDate && this.minDate) {
      this.hasErr = (this.checkMaxDateInput(date.year, date.month, date.day, this.minDate, 2) || this.checkMaxDateInput(date.year, date.month, date.day, maxDates, 1))
    }else {
      this.hasErr = false;
    }
    this.onError.emit(this.hasErr);
  }


}

import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, forwardRef, Injector, OnDestroy, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { NgControl, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbDateParserFormatter, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { DateTimeModel } from 'app/core/models/base.model';
import autoCorrectedDatePipe from 'app/shared/pipes/auto-corrected-date.pipe';
import { noop } from 'rxjs';
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask';

const now = new Date();
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'jhi-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => DateRangePickerComponent),
      multi: true
    },
    {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}
  ]
})
export class DateRangePickerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('datePicker', {static: false}) input: NgbInputDatepicker;
  @ViewChild(NgModel, {static: false}) datePick: NgModel;
  // @ViewChild('dateRangePicker', {static: false}) dateRangePicker: ElementRef;
  @ViewChild('dateRangePicker', {read: ViewContainerRef, static: true}) public dateRangePicker;

  onTouched: () => void = noop;
  onChange: (_: any) => void = noop;
  startDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  minDate: NgbDateStruct;
  hoveredDate: NgbDateStruct;
  fromDate: any;
  toDate: any;
  model: any;
  ngControl: NgControl;
  mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', '-', ' ', /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = autoCorrectedDatePipe('dd/mm/yyyy - d2/m2/yyy2');
  maskedInputController;

  constructor(
    element: ElementRef,
    private renderer: Renderer2,
    private _parserFormatter: NgbDateParserFormatter,
    private inj: Injector
  ) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.maskedInputController = textMask.maskInput({
        inputElement: this.dateRangePicker.element.nativeElement,
        mask: this.mask,
        pipe: this.autoCorrectedDatePipe,
        keepCharPositions: true
      });
    });
  }

  isHovered = date =>
    this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  ngOnInit() {
    this.startDate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.maxDate = {year: now.getFullYear() + 1, month: now.getMonth() + 1, day: now.getDate()};
    this.minDate = {year: now.getFullYear() - 1, month: now.getMonth() + 1, day: now.getDate()};
    this.ngControl = this.inj.get(NgControl);
  }

  ngOnDestroy() {
    if (this.maskedInputController) {
      this.maskedInputController.destroy();
    }
  }

  onDateSelection(date: NgbDateStruct) {
    let parsed = '';
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && (after(date, this.fromDate) || equals(date, this.fromDate))) {
      this.toDate = date;
      // this.model = `${this.fromDate.year} - ${this.toDate.year}`;
      this.input.close();
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    if (this.fromDate) {
      parsed += this._parserFormatter.format(this.fromDate);
    }
    if (this.toDate) {
      parsed += ' - ' + this._parserFormatter.format(this.toDate);
    }
    this.renderer.setProperty(this.dateRangePicker.element.nativeElement, 'value', parsed);
    this.onChange(parsed);
  }

  writeValue(val) {
    if (typeof val === 'string') {
      this.onInputChange(val);
    } else if (typeof val === 'number') {
      this.model = val ? new Date(val) : '';
    } else {
      this.model = val ? val : '';
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  onInputChange($event: any) {
    const value = $event.target ? $event.target.value : $event;
    let isInputFromParent = false;
    if (!$event.target) {
      isInputFromParent = true;
    }
    if (value === '') {
      this.toDate = null;
      this.fromDate = null;
      this.onChange('');
      return;
    }
    const dateArr = value.split('-');
    const temp1 = dateArr[0].split(/\//);
    const temp2 = dateArr[1].split(/\//);
    let convertDate1, convertDate2;
    // neu nhu da nhap thi ko bao gio vao truong hop nay, vi no se la array ["__","___","___"]
    if (temp1.length < 3 && temp2.length < 3) {
      this.renderer.setProperty(this.dateRangePicker.element.nativeElement, 'value', '');
      this.toDate = null;
      this.fromDate = null;
      this.onChange('');
      if (this.input) {
        this.input.close();
      }

    } else if (temp1.length === 3 && temp2.length === 3) {
      convertDate1 = ([temp1[1], temp1[0], temp1[2]]).join('/');
      convertDate2 = ([temp2[1], temp2[0], temp2[2]]).join('/');
      const dt1 = DateTimeModel.fromLocalString(convertDate1);
      const dt2 = DateTimeModel.fromLocalString(convertDate2);
      if (dt1 && dt2) {
        if (this.input) {
          this.input.close();
        }
        this.fromDate = dt1;
        this.toDate = dt2;
        // truong hop den ngay < tu ngay
        if (after(dt1, dt2)) {
          this.toDate = null;
          this.fromDate = null;
          this.onChange('');
          this.renderer.setProperty(this.dateRangePicker.element.nativeElement, 'value', '');
          return;
        }

        if (isInputFromParent) {
          this.renderer.setProperty(this.dateRangePicker.element.nativeElement, 'value', value);
        }
        this.onChange(value);
        return;
      } else if (dt1) {
        const duplicateDate1 = dateArr[0] + ' - ' + dateArr[0];
        this.renderer.setProperty(this.dateRangePicker.element.nativeElement, 'value', duplicateDate1);
        this.onChange(duplicateDate1);
        if (this.input) {
          this.input.close();
        }
        this.fromDate = dt1;
        this.toDate = dt1;
        return;
      } else if (dt2) {
        const duplicateDate2 = dateArr[1] + ' - ' + dateArr[1];
        this.renderer.setProperty(this.dateRangePicker.element.nativeElement, 'value', duplicateDate2);
        this.onChange(duplicateDate2);
        if (this.input) {
          this.input.close();
        }
        this.fromDate = dt2;
        this.toDate = dt2;
        return;
      } else {
        this.renderer.setProperty(this.dateRangePicker.element.nativeElement, 'value', '');
        this.toDate = null;
        this.fromDate = null;
        this.onChange('');
        if (this.input) {
          this.input.close();
        }
        return;
      }
    }
  }
}

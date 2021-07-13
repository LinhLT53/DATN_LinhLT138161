import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DateTimeModel } from 'app/core/models/base.model';
import { noop } from 'rxjs';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask.js';

@Component({
  selector: 'jhi-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    },
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }
  ]
})
export class DatePickerComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  @Input() dateString: string;
  @ViewChild('input', { read: ViewContainerRef, static: true }) public input;
  @Input() minDate;
  @Output() onChooseDate = new EventEmitter<any>();
  @Input() touched = 0;
  @Input() msgError: string;
  @Input() placement = 'bottom-left';
  @Input() isDisabled = false;

  onTouched: (_: any) => void = noop;
  onChange: (_: any) => void = noop;
  date: any = new DateTimeModel();
  firstTimeAssign = true;
  mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy');
  maskedInputController;
  ngControl: NgControl;
  isError = false;

  constructor(private renderer: Renderer2, private inj: Injector) {}

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

  ngOnDestroy() {
    if (this.maskedInputController) {
      this.maskedInputController.destroy();
    }
  }

  setDisabledState?(isDisabled: boolean): void {}

  // write value from parent component
  writeValue(newModel: string) {
    if (newModel) {
      const dateFromParent = Object.assign(this.date, DateTimeModel.fromLocalString(newModel));
      this.date = new Date(dateFromParent);
      this.dateString = newModel;
      this.firstTimeAssign = true;
      this.setDateStringModel();
    } else {
      this.firstTimeAssign = false;
      this.date = new DateTimeModel();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onChangeBlur() {
    this.touched ? (this.isError = this.date.toString() === null || this.date.toString() === '') : (this.isError = false);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDateStringModel() {
    this.onChangeBlur();
    this.dateString = this.date.toString();
    if (!this.firstTimeAssign) {
      this.onChange(this.dateString);
      this.onChooseDate.emit(this.dateString);
    } else {
      if (this.dateString !== null) {
        this.firstTimeAssign = false;
      }
    }
  }

  onInputChange($event: any) {
    const value = $event.target.value;
    const temp = value.split(/\//);
    let convertDate;
    if (temp.length < 3) {
      this.date = new DateTimeModel();
      this.onChange('');
    } else if (temp.length === 3) {
      convertDate = [temp[1], temp[0], temp[2]].join('/');
    }
    const dt = DateTimeModel.fromLocalString(convertDate);
    if (!dt) {
      this.date = new DateTimeModel();
      this.onChange('');
      return;
    } else if (value.trim() === '') {
      this.date = new DateTimeModel();
      this.dateString = '';
      this.onChange(this.dateString);
      return;
    }
    if (dt.year < 1000 || dt.year > 9999) {
      this.date = new DateTimeModel();
      this.dateString = '';
      this.onChange('');
      return;
    }
    if (!this.date) {
      this.date = dt;
    }
    this.date.setYear(dt.year);
    this.date.month = dt.month;
    this.date.day = dt.day;
    const parsed =
      (Number(dt.day) < 10 ? '0' + dt.day : dt.day) + '/' + (Number(dt.month) < 10 ? '0' + dt.month : dt.month) + '/' + dt.year;
    this.renderer.setProperty(this.input.element.nativeElement, 'value', parsed);
    this.setDateStringModel();
  }

  onDateChange($event) {
    // if ($event) {
    //   this.touched ++;
    // }
    if ($event.year) {
      $event = `${$event.year}-${$event.month}-${$event.day}`;
    }
    const date = DateTimeModel.fromLocalString($event);
    if (!date) {
      return;
    }
    if (!this.date) {
      this.date = date;
    }
    this.date.year = date.year;
    this.date.month = date.month;
    this.date.day = date.day;
    this.setDateStringModel();
  }
}

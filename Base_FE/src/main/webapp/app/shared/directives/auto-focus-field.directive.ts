import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {TIME_OUT} from 'app/shared/constants/set-timeout.constants';

@Directive({
  selector: '[jhiAutoFocusField]'
})
export class AutoFocusFieldDirective implements AfterViewInit {
  private appAutoFocus = true;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    if (this.appAutoFocus) {
      setTimeout(args => {
        this.el.nativeElement.focus();
      }, TIME_OUT.FOCUS_FIELD);
    }
  }

  @Input() set autofocus(condition: boolean) {
    this.appAutoFocus = condition !== false;
  }
}

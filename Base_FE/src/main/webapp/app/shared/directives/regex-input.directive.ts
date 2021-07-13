import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[jhiRegexInput]'
})
export class RegexInputDirective {
  private _value: any;
  regExp: RegExp;
  constructor(private _el: ElementRef) { }

  @Input()
  set regexInput(paramName: string) {
    this._value = paramName;
    // regex chi nhap chu so
    if (paramName === 'Number') {
      this.regExp = /[^0-9]*/g;
    }
    // regex chu cai, chu so, dau "-", dau "_"
    if (paramName === 'idNo') {
      this.regExp = /[^a-zA-Z0-9-_]*/g;
    }
    if (paramName === 'taxCode') {
      // regex so, dau "-"
      this.regExp = /[^0-9-]*/g;
    }
    if (paramName === 'countryCode') {
      // regex chu so, chu cai
      this.regExp = /[^a-zA-Z0-9]*/g;
    }
    if (paramName === 'Text_Number_{-_/}') {
      // regex chu so, dau "-" and "_" and "/"
      this.regExp = /[^a-zA-Z0-9-_/]*/g;
    }
    if (paramName === 'Number_{.,}') {
      // regex so, dau "." and ","
      this.regExp = /[^0-9.,]*/g;
    }
    if (paramName === 'userName') {
      // regex chu cai (khong dau), so va cac ky tu - _ .
      this.regExp = /[^a-zA-Z0-9-._]*/g
    }
    if (paramName === 'ipAddress') {
      // regex so, dau "-"
      this.regExp = /[^0-9.]*/g;
    }
    if (paramName === 'email') {
      // regex so, dau "-"
      this.regExp = /[^a-zA-Z0-9@.]*/g
    }
    if (paramName === 'decimalConfig') {
      // regex so, dau "." and ","
      this.regExp = /[^.,]*/g;
    }

    if (paramName === 'test') {
      // regex so, dau "." and ","
      this.regExp = /[^A-Za-z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ-_ ]*/g;
    }
  }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initValue.replace(this.regExp, '');
    if (initValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}

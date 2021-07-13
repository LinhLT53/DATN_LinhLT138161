import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { KEY_CODE } from 'app/shared/constants/key-code.constants';
import { noop } from 'rxjs';

@Component({
  selector: 'jhi-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Input() type;
  @Input() param;
  @Input() message;
  @Input() item;
  @Output() onCloseModal = new EventEmitter<any>();
  @ViewChild('submitBtn', {static: false}) submitBtn: ElementRef;

  onTouched: () => void = noop;
  onChange: (_: any) => void = noop;

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router
  ) {
  }

  writeValue(newModel: string) {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit() {
  }

  @HostListener('document:keypress', ['$event'])
  onKeyPress(e: KeyboardEvent) {
    if (e.code === KEY_CODE.ENTER) {
      if (document.activeElement === this.submitBtn.nativeElement) {
        this.onSubmitClose(true);
      } else {
        this.onSubmitClose(false);
      }
    }
  }

  onSubmitClose(value) {
    this.activeModal.dismiss();
    this.onCloseModal.emit(value);
  }

  onLogin() {
    this.activeModal.dismiss();
    localStorage.setItem('INVOICE_SEARCH_DATA', JSON.stringify(this.item));
    this.router.navigate(['/account/login']);
  }
}


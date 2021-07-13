import {Component, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {noop} from 'rxjs';
import {ITEMS_PER_PAGE} from 'app/shared/constants/pagination.constants';

@Component({
  selector: 'jhi-page-size',
  templateUrl: './page-size.component.html',
  styleUrls: ['./page-size.component.scss']
})
export class PageSizeComponent implements OnInit {
  @Output() onChangePageSize = new EventEmitter<any>();
  @ViewChild('select', {read: ViewContainerRef, static: true}) public select;

  itemsPerPage: any = ITEMS_PER_PAGE;
  onTouched: () => void = noop;
  onChange: (_: any) => void = noop;

  constructor() {
  }

  ngOnInit() {
  }

  writeValue(newModel: string) {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  loadPage() {
    this.onChange(this.itemsPerPage);
    this.onChangePageSize.emit(this.itemsPerPage);
  }
}

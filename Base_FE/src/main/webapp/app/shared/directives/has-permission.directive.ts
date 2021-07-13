import { Directive, ElementRef, Input, OnInit, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { CommonService } from 'app/shared/services/common.service';
import { STORAGE_KEYS } from 'app/shared/constants/storage-keys.constants';
import { FormStoringService } from 'app/shared/services/form-storing.service';
import { AUTHEN, QUYEN } from 'app/shared/constants/authen';
@Directive({
  selector: '[jhiHasPermission]'
})
export class HasPermissionDirective implements OnInit {
  private _value: any;
  private _value1: any;

  private user: any;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private commonService: CommonService,
    private formStoringService: FormStoringService
  ) {}

  @Input()
  set jhiHasPermission(value) {
    this._value1 = value;
    this.updateViewAll(this._value1);
  }

  private updateViewAll(value) {
    const userToken: any = this.formStoringService.get(STORAGE_KEYS.USER);
    // if(userToken.positionId===AUTHEN.GIAMDOC){
    //   this.viewContainer.createEmbeddedView(this.templateRef);
    // }

    if (value === QUYEN.BIEUDO) {
      if (userToken.positionId === AUTHEN.GIAMDOC) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    } else if (value === QUYEN.NHANSU) {
      if (userToken.positionId === AUTHEN.GIAMDOC || userToken.positionId === AUTHEN.NHANSU) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    } else if (value === QUYEN.TAISAN) {
      if (userToken.positionId === AUTHEN.QUANLY || userToken.positionId === AUTHEN.LETAN) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    } else if (value === QUYEN.KHACHHANG) {
      if (userToken.positionId === AUTHEN.QUANLY || userToken.positionId === AUTHEN.LETAN) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    } else if (value === QUYEN.KHUYENMAI) {
      if (userToken.positionId === AUTHEN.QUANLY || userToken.positionId === AUTHEN.LETAN) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    } else if (value === QUYEN.PHONG) {
      if (userToken.positionId === AUTHEN.QUANLY || userToken.positionId === AUTHEN.LETAN) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    } else if (value === QUYEN.DICHVU) {
      if (userToken.positionId === AUTHEN.QUANLY || userToken.positionId === AUTHEN.LETAN) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    } else if (value === QUYEN.PHONGLE) {
      if (userToken.positionId === AUTHEN.LETAN) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    } else if (value === QUYEN.PHONGTRUOC) {
      if (userToken.positionId === AUTHEN.LETAN) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    } else if (value === QUYEN.LOAIPHONG) {
      if (userToken.positionId === AUTHEN.QUANLY || userToken.positionId === AUTHEN.LETAN) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    } else if (
      value === QUYEN.THEMSUADICHVU ||
      value === QUYEN.THEMSUAKHUYENMAI ||
      value === QUYEN.THEMSUALOAIPHONG ||
      value === QUYEN.THEMSUAPHONG ||
      value === QUYEN.THEMSUATAISAN
    ) {
      if (userToken.positionId === AUTHEN.QUANLY) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    } else if (value === QUYEN.THEMSUAKHACHHANG) {
      if (userToken.positionId === AUTHEN.QUANLY || userToken.positionId === AUTHEN.LETAN) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    }
  }

  private updateView(value) {
    this.viewContainer.createEmbeddedView(this.templateRef);

    // if (this.commonService.havePermission(value[0])) {
    //   this.viewContainer.createEmbeddedView(this.templateRef);
    // } else {
    //   this.viewContainer.clear();
    // }
  }

  ngOnInit(): void {}
}

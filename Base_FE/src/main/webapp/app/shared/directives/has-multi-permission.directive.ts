import {Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {CommonService} from 'app/shared/services/common.service';
import {STORAGE_KEYS} from "app/shared/constants/storage-keys.constants";
import {FormStoringService} from "app/shared/services/form-storing.service";

@Directive({
  selector: '[jhiHasMultiPermission]'
})
export class HasMultiPermissionDirective implements OnInit {
  private _value: any;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private commonService: CommonService,
    private formStoringService: FormStoringService,
  ) {
  }

  @Input()
  set jhiHasMultiPermission(value) {
    this._value = value;
    this.updateView(this._value);
  }

  private updateView(value) {
    const userToken: any = this.formStoringService.get(STORAGE_KEYS.USER);
    if (value.tyleDto === "WAREHOUSE") {
      if (userToken.role === 'ROLE_ALL') {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else if (userToken.role === "ROLE_ADMINPART" && userToken.partId === value.partId) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    }
    if (value.tyleDto === "DEVICE") {
      if (value.status === 1) {
        if (userToken.role === 'ROLE_ALL') {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else if (userToken.role === "ROLE_ADMINPART" && userToken.partId === value.partId) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      } else if (value.status === 2) {
        if (userToken.humanResourceId === value.useHummerId) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      } else {
        this.viewContainer.clear();
      }
    }
    if (value.tyleDto === "SUPPLIER") {
      if (userToken.role === 'ROLE_ALL' || userToken.role === "ROLE_ADMINPART") {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }

    }
    if (value.tyleDto === "HUMMER") {
      if (userToken.role === 'ROLE_ALL') {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else if (userToken.role === "ROLE_ADMINPART" && (userToken.partId === value.partId)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    }
    if (value.tyleDto === "REQUEST") {
      if (value.status === 1) {
        if (value.tyle === 'PYCM' || value.tyle === 'PT') {
          if (userToken.role === "ROLE_ADMINPART" && userToken.partId === value.partId) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainer.clear();
          }

        } else if (value.tyle === 'YCM') {
          if (userToken.role === "ROLE_ALL") {
            this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainer.clear();
          }
        }
      } else {
        this.viewContainer.clear();
      }


    }
    // if (this.commonService.hasMultiPermission(value)) {
    //   this.viewContainer.createEmbeddedView(this.templateRef);
    // } else {
    //   this.viewContainer.clear();
    // }
    // for (let i = 1; i < value.length; i++) {
    //   if (!value[i]) {
    //     this.viewContainer.clear();
    //   }
    // }
  }

  ngOnInit(): void {
  }
}

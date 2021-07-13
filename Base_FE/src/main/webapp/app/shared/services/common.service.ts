import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastService} from 'app/shared/services/toast.service';
import {FormStoringService} from 'app/shared/services/form-storing.service';
import {STORAGE_KEYS} from 'app/shared/constants/storage-keys.constants';
import {AUTHORITY_CODE} from 'app/shared/constants/app-config.constants';
import {AppParamsService} from 'app/core/services/common-api/app-params.service';
import {TranslateService} from '@ngx-translate/core';
import {STATUS_CODE} from 'app/shared/constants/status-code.constants';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(
    private toastService: ToastService,
    private formStoringService: FormStoringService,
    private appParamsService: AppParamsService,
    private translateService: TranslateService
  ) {

  }

  setDataTranfer(key, obj: object) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  getDataTranfer(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  clearDataTranfer(key) {
    return localStorage.removeItem(key);
    ;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  getAppParams() {
    this.appParamsService.getAllAppParams().subscribe(res => {
      if (res && res.body && res.body.data) {
        // res.body.data.sort((a, b) => (a.parName > b.parName) ? 1 : -1);
        res.body.data.sort((a, b) => a.parName.localeCompare(b.parName)); // HopTQ sap xep theo tieng viet
        this.formStoringService.set(STORAGE_KEYS.APP_PARAMS, res.body.data);
      }
    });
  }

  getAppParamsConfig(key) {
    this.appParamsService
      .getAllAppParamsConfig({
        parType: key
      })
      .subscribe(res => {
        if (res && res.body && res.body.data) {
          this.formStoringService.set(STORAGE_KEYS.DECIMAL_PARAMS, res.body.data);
        }
      });
  }

  trimSpaceFormValue(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        const value = control.value;
        if (typeof value === 'string') {
          control.setValue(value.trim());
        }
      } else if (control instanceof FormGroup) {
        this.trimSpaceFormValue(control);
      }
    });
  }

  setValueIsNull(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        const value = control.value;
        if (value === '') {
          control.setValue(null);
        }
      } else if (control instanceof FormGroup) {
        this.trimSpaceFormValue(control);
      }
    });
  }

  getPermissionCode(code: string): string {
    // Check by key
    // const key = Object.keys(AUTHORITY_CODE);
    // const data = key.find(it => AUTHORITY_CODE[it] === code);
    // return data ? code : '';
    return AUTHORITY_CODE[code] || '';
  }

  havePermission(resourceCode: string): boolean {
    let permissionCode = this.getPermissionCode(resourceCode);
    if (permissionCode === '') {
      permissionCode = resourceCode;
    }
    const userToken: any = this.formStoringService.get(STORAGE_KEYS.USER);
    if (!userToken.humanResourceId) {
      return false;
    }
    const userPermissionList = userToken.lstPermission;
    if (userPermissionList == null || userPermissionList.length <= 0) {
      return false;
    }
    for (const userPermission of userPermissionList) {
      const check = userPermission;
      if (check === permissionCode) {
        return true;
      }
    }
    return false;
  }

  hasMultiPermission(resourceCode: string[]): boolean {
    for (let resource in resourceCode){
      if(this.havePermission(resource)){
        return true;
      }
    }
    return false;
  }

  openToastMess(statusCode: any, search?: boolean, type?: any) {
    if (statusCode === STATUS_CODE.AUTH) {
      // if (!search) {
      this.toastService.openWarningToast(this.translateService.instant('common.toastr.messages.error.auth', {type}));
      // }
    } else {
      if (!search) {
        this.toastService.openErrorToast(this.translateService.instant('common.toastr.messages.error.action', {type}));
      } else {
        this.toastService.openErrorToast(this.translateService.instant('common.toastr.messages.error.load'));
      }
    }
  }
}

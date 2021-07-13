import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AUTHEN, QUYEN } from 'app/shared/constants/authen';
import { LocalStorage } from 'ngx-webstorage';

var authen: any = localStorage.getItem('user');
@Injectable({
  providedIn: 'root'
})
export class Authen {
  constructor(protected router: Router) {}
  public checkAuthen(role) {
    console.log(role);

    let quyen = authen.positionId;
    if (role === QUYEN.BIEUDO && quyen !== AUTHEN.GIAMDOC) {
      this.navigeteRole4();
    }

    if (role === QUYEN.DICHVU && !(quyen === AUTHEN.LETAN || quyen === AUTHEN.QUANLY)) {
      this.navigeteRole4();
    }

    if (role === QUYEN.KHACHHANG && !(quyen === AUTHEN.LETAN || quyen === AUTHEN.QUANLY)) {
      this.navigeteRole4();
    }

    if (role === QUYEN.KHUYENMAI && !(quyen === AUTHEN.LETAN || quyen === AUTHEN.QUANLY)) {
      this.navigeteRole4();
    }
    if (role === QUYEN.NHANSU && !(quyen === AUTHEN.GIAMDOC || quyen === AUTHEN.NHANSU)) {
      this.navigeteRole4();
    }
    if (role === QUYEN.LOAIPHONG && !(quyen === AUTHEN.QUANLY || quyen === AUTHEN.NHANSU)) {
      this.navigeteRole4();
    }
    if (role === QUYEN.PHONG && !(quyen === AUTHEN.QUANLY || quyen === AUTHEN.NHANSU)) {
      this.navigeteRole4();
    }
    if (role === QUYEN.PHONGLE && quyen !== AUTHEN.LETAN) {
      this.navigeteRole4();
    }
    if (role === QUYEN.TAISAN && !(quyen === AUTHEN.LETAN || quyen === AUTHEN.QUANLY)) {
      this.navigeteRole4();
    }
    if (role === QUYEN.LOAIPHONG && !(quyen === AUTHEN.NHANSU || quyen === AUTHEN.QUANLY)) {
      this.navigeteRole4();
    }
  }

  private navigeteRole4() {
    // console.log(authen.positionId);

    if (authen.positionId === AUTHEN.BUONGPHONG) {
      this.router.navigate(['/system-categories/service-resources']);
    } else if (authen.positionId === AUTHEN.GIAMDOC) {
      this.router.navigate(['/system-categories/human-resources']);
    } else if (authen.positionId === AUTHEN.LETAN) {
      this.router.navigate(['/system-categories/book-room']);
    } else if (authen.positionId === AUTHEN.NHANSU) {
      this.router.navigate(['/system-categories/human-resources']);
    } else if (authen.positionId === AUTHEN.QUANLY) {
      this.router.navigate(['/system-categories/customer-resource']);
    }
  }
}

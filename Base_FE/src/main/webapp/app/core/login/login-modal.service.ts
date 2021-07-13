import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginModalService {
  private isOpen = false;

  constructor(private modalService: NgbModal, private router: Router) {}

  open() {
    // if (this.isOpen) {
    //   return;
    // }
    // this.isOpen = true;
    // const modalRef = this.modalService.open(JhiLoginModalComponent);
    // modalRef.result.finally(() => (this.isOpen = false));
    this.router.navigate(['/account/login']);
    return null;
  }
}

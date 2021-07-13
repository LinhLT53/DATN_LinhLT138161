import { Component, Input, OnInit } from '@angular/core';
import { ChangePasswordService } from 'app/core/services/changepassword/change-password.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeightService } from 'app/shared/services/height.service';
import { ConfirmModalComponent } from 'app/shared/components/confirm-modal/confirm-modal.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'app/shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  submitted = false;
  changePasswordForm: FormGroup;
  @Input() id;
  noMatchPassWord = false;
  checkPass = true;
  height: number;
  form: FormGroup;
  isModalConfirmShow = false;
  user = JSON.parse(localStorage.getItem('user'));

  pass: '';
  //
  // messError = '';
  constructor(
    private changePasswordService: ChangePasswordService,
    private formBuilder: FormBuilder,
    private heightService: HeightService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.onResize();
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      username: this.user.username,
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,}$/)
        ]
      ],
      newPasswordConfirm: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,}$/)
        ]
      ]
    });
  }

  onResize() {
    this.height = this.heightService.onResizeWithoutFooter();
  }

  get f() {
    return this.changePasswordForm.controls;
  }

  // onCancel() {
  //
  //   this.isModalConfirmShow = true;
  //
  //   const modalRef = this.modalService.open(ConfirmModalComponent, {centered: true, backdrop: 'static'});
  //   modalRef.componentInstance.type = 'confirm';
  //   modalRef.componentInstance.onCloseModal.subscribe(value => {
  //     if (value === true) {
  //       this.activeModal.dismiss();
  //     }
  //     this.isModalConfirmShow = false;
  //   });
  //   this.activeModal.dismiss();
  //   this.form.reset();
  //   this.activeModal.dismiss(true);
  // }

  closeChangePassModal() {
    this.activeModal.dismiss();
  }

  onCancel() {
    if (this.form.value.password === '' && this.form.value.newPassword === '' && this.form.value.newPasswordConfirm === '') {
      this.closeChangePassModal();
    } else {
      const modalRef = this.modalService.open(ConfirmModalComponent, { centered: true, backdrop: 'static' });
      modalRef.componentInstance.type = 'confirm';
      modalRef.componentInstance.onCloseModal.subscribe(value => {
        if (value === true) {
          this.closeChangePassModal();
        }
      });
    }
  }

  onSubmitData() {
    this.submitted = true;
    if (this.form.get('newPassword').invalid) {
      this.toastService.openErrorToast('Mật khẩu  mới không đúng định dạng');
      return;
    }
    if (this.form.value.newPassword !== this.form.value.newPasswordConfirm) {
      this.noMatchPassWord = true;
      this.toastService.openErrorToast('Nhập lại mật khẩu không khớp');
      return;
    }
    if (this.form.get('newPasswordConfirm').invalid) {
      this.toastService.openErrorToast('Nhập lại mật khẩu mới không đúng định dạng');
    } else {
      this.changePasswordService.changePassword(this.form.value).subscribe(
        res => {
          this.toastService.openSuccessToast('Đổi mật khẩu thành công');
          this.activeModal.dismiss();
          this.router.navigate(['/login/']);
        },
        err => {
          this.toastService.openErrorToast(err.error.msgCode);
        }
      );
    }
    if (this.form.invalid) {
      // Got focus to the error field
      const invalidFields = [].slice.call(document.getElementsByClassName('ng-invalid'));
      invalidFields[1].focus();
    }
  }

  get formControl() {
    return this.form.controls;
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  checkPassword(password) {
    if ('' !== this.form.value.password.trim()) {
      this.changePasswordService.checkPassword({ email: this.user.email, password: this.form.get(password).value }).subscribe(
        res => {
          this.checkPass = true;
        },
        error => {
          this.toastService.openErrorToast('Mật khẩu hiện tại không đúng');
          this.checkPass = false;
        }
      );
    }
  }
}

import { AfterViewInit, Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from 'app/core/login/login.service';
import { TranslateService } from '@ngx-translate/core';
import { JhiEventManager } from 'ng-jhipster';
import { CommonApiService } from 'app/core/services/common-api/common-api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'app/shared/services/toast.service';
import { ChangePasswordComponent } from 'app/layouts/navbar/change-password/change-password.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from 'app/account/login/forgot-password/forgot-password.component';
import { ReCaptcha2Component, ReCaptchaV3Service } from 'ngx-captcha';

@Component({
  selector: 'jhi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit, OnInit {
  @ViewChild('captchaElem', { static: false }) captchaElem: ReCaptcha2Component;
  loginForm = this.fb.group({
    username: [''],
    password: [''],
    remember: [false]
  });
  isError = false;
  errorMsg = '';
  token = '';
  user: any;
  authenticationError: boolean;
  distable = true;
  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private loginService: LoginService,
    private renderer: Renderer,
    private eventManager: JhiEventManager,
    private elementRef: ElementRef,
    private commonApiService: CommonApiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private reCaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit(): void {
    const user: any = localStorage.getItem('RememberUser') ? JSON.parse(localStorage.getItem('RememberUser')) : '';
    if (user) {
      this.loginForm = this.fb.group({
        username: [user.username],
        password: [user.password],
        remember: [user.remember],
        recaptcha: ''
      });
    }
  }

  ngAfterViewInit() {
    // this.user = this.parseJwt('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MjEiLCJodW1hblJlc291cmNlSWQiOjUsInVzZXJuYW1lIjoidGVzdDIxIiwibGlzdFBlcm1pc3Npb24iOlt7ImF1dGhvcml0eSI6ImNuMyJ9LHsiYXV0aG9yaXR5IjoiY240In1dLCJjcmVhdGVkIjoxNTk0OTg2MDI4MjMyLCJpYXQiOjE1OTQ5ODYwMjgsImV4cCI6MTU5NTE2NjAyOH0.FQCIdXEEuzfFHu__YZwLP6MsBsokh5DNI33r7A2T5dQ');
    // localStorage.setItem('tokenA', JSON.stringify(this.user));
    // // eslint-disable-next-line no-console
    // console.log('a');
    // // eslint-disable-next-line no-console
    // console.log("Token: ", JSON.parse(localStorage.getItem('tokenA')));
    setTimeout(() => this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []), 0);
  }

  getcapcha() {
    const response = this.captchaElem.getResponse();
    if (response.length === 0) {
      console.warn(response);
      return;
    } else {
      this.distable = false;
    }
    // this.loginForm.set
  }
  checkError() {
    this.isError = false;
  }
  login() {
    this.spinner.show();
    if (!this.loginForm.get('username').value && this.loginForm.get('password').value) {
      this.isError = true;
      this.errorMsg = this.translateService.instant('login.userName.required');
      return;
    } else if (this.loginForm.get('username').value && !this.loginForm.get('password').value) {
      this.isError = true;
      this.errorMsg = this.translateService.instant('login.password.required');
      return;
    } else if (!this.loginForm.get('username').value && !this.loginForm.get('password').value) {
      this.isError = true;
      this.errorMsg = this.translateService.instant('login.messages.error.inputAllField');
      return;
    }
    const response = this.captchaElem.getResponse();
    if (response.length === 0) {
      console.warn(response);
      return;
    }
    const data = {
      email: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value,
      recaptchare: response
    };
    this.loginService.login(data).subscribe(
      res => {
        this.isError = false;
        this.authenticationError = false;
        // this.formStoringService.set(STORAGE_KEYS.CURRENT_USER_ADMIN, res);
        this.eventManager.broadcast({
          name: 'authenticationSuccess',
          content: 'Sending Authentication Success'
        });
        console.warn(96, 'Data', data);
        if (this.loginForm.get('remember').value) {
          console.warn(98, 'Form', this.loginForm.value);
          localStorage.setItem('RememberUser', JSON.stringify(this.loginForm.value));
        } else {
          if (localStorage.getItem('RememberUser')) {
            localStorage.removeItem('RememberUser');
          }
        }
        this.getUserLogin(data, res);
      },
      err => {
        this.spinner.hide();
        if (err.status === 302) {
          this.errorMsg = 'Tài khoản đang hiện tại bị khóa vui lòng đợi 10p đăng nhập lại';
        } else {
          this.errorMsg = this.translateService.instant('login.messages.error.authentication');
        }
        this.isError = true;
        this.distable = true;
        this.captchaElem.resetCaptcha();
      }
    );
  }

  getUserLogin(data, res) {
    // this.token = data.data;
    this.token = res.data;
    this.getUserPermission(data, this.token);
  }

  getUserPermission(data, token) {
    this.commonApiService.getUserPermission(data.email, token).subscribe(
      res => {
        if (res && res.body && res.body) {
          const userData: any = res.body ? res.body : '';
          localStorage.setItem('user', JSON.stringify(res.body));
          localStorage.setItem('token', token);
          console.warn(129, 'UserData', res.body);

          if (userData.status === 0) {
            // console.warn(108, "isActive", userData.isActive);
            this.spinner.hide();
            this.toastService.openErrorToast('Tài khoản đã bị khóa');
            return;
          } else if (userData.status === 1) {
            // console.warn(113, "status", userData.isActive);
            if (userData.isNew === 0) {
              this.spinner.hide();
              console.warn(140, userData);
              this.router.navigate(['/system-categories/']);
            } else {
              this.spinner.hide();
              this.openChangePassword();
            }
          }
          // if (userData.isActive === 3) {
          //   console.warn(108, "isActive", userData.isActive);
          //   this.spinner.hide();
          //   this.toastService.openErrorToast('Tài khoản đã bị khóa');
          //   return;
          // } else if (userData.isActive === 1) {
          //   console.warn(113, "isActive", userData.isActive);
          //   if (userData.isNew === 0) {
          //     this.spinner.hide();
          //     this.router.navigate(['/system-categories/project-management']);
          //   } else {
          //     this.spinner.hide();
          //     this.openChangePassword();
          //   }
          // }
        }
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  openChangePassword() {
    const modalRef = this.modalService.open(ChangePasswordComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'myCustomModalClass'
    });
    //modalRef.componentInstance.onCloseModal.subscribe();
  }

  openForgotPassword() {
    const modalRef = this.modalService.open(ForgotPasswordComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
    modalRef.result.then(result => {}).catch(() => {});
  }
}

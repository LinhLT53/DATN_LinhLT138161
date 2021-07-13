import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HumanResourcesApiService } from 'app/core/services/Human-resources-api/human-resources-api.service';
import { ToastService } from 'app/shared/services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'jhi-verify-forgot-password',
  templateUrl: './verify-forgot-password.component.html',
  styleUrls: ['./verify-forgot-password.component.scss']
})
export class VerifyForgotPasswordComponent implements OnInit {
  email: any;
  key: any;
  constructor(
    private route: ActivatedRoute,
    private userService: HumanResourcesApiService,
    private toastService: ToastService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.email = this.route.snapshot.params.email;
    this.key = this.route.snapshot.params.key;
    this.userService.resetPasswordByEmail(this.email, this.key).subscribe(
      res => {
        this.spinner.hide();
        this.toastService.openSuccessToast('Vào email của bạn để nhận mật khẩu mới');
        this.router.navigate(['/login/']);
      },
      err => {
        this.spinner.hide();
        this.toastService.openErrorToast('Email của bạn đã được gửi, vui long kiểm tra lại email');
        this.router.navigate(['/login/']);
      }
    );
  }
}

import {Component, OnInit} from '@angular/core';
import {ConfirmModalComponent} from "app/shared/components/confirm-modal/confirm-modal.component";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "app/shared/services/common.service";
import {ToastService} from "app/shared/services/toast.service";
import {NgxSpinnerService} from "ngx-spinner";
import {JhiEventManager} from "ng-jhipster";
import {HeightService} from "app/shared/services/height.service";
import {HumanResourcesApiService} from "app/core/services/Human-resources-api/human-resources-api.service";

@Component({
  selector: 'jhi-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  height: number;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private eventManager: JhiEventManager,
    private heightService: HeightService,
    private humanResoucesService: HumanResourcesApiService
  ) {
  }

  get formControl() {
    return this.form.controls;
  }

  ngOnInit() {
    this.buildForm();
  }

  onCancel() {
    if (
      this.form.value.email === ''
    ) {
      this.closeModal();
    } else {
      const modalRef = this.modalService.open(ConfirmModalComponent, {centered: true, backdrop: 'static'});
      modalRef.componentInstance.type = 'confirm';
      modalRef.componentInstance.onCloseModal.subscribe(value => {
        if (value === true) {
          this.closeModal();
        }
      });
    }
  }

  closeModal() {
    this.activeModal.dismiss('Cross click');
    this.activeModal.dismiss(true);
  }

  onResize() {
    this.height = this.heightService.onResize();
  }

  onSubmitData() {
    this.spinner.show();
    this.humanResoucesService.forgotPassword(this.getValueOfField('email')).subscribe(
      res => {
        this.spinner.hide()
        this.activeModal.dismiss(true);
        this.toastService.openSuccessToast('Vào email để nhận thông tin mật khẩu')
      },
      err => {
        this.spinner.hide();
        this.activeModal.dismiss(true);
        this.toastService.openErrorToast('Thất bại');
      }
    )
  }

  displayFieldHasError(field: string) {
    return {
      'has-error': this.isFieldValid(field)
    };
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  setValueToField(item, data) {
    this.form.get(item).setValue(data);
  }

  getValueOfField(item) {
    return this.form.get(item).value;
  }

  trimSpace(element) {
    const value = this.getValueOfField(element);
    if (value) {
      this.setValueToField(element, value.trim());
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.email])]
    });
  }
}

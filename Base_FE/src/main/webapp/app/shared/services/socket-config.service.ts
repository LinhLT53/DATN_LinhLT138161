import {Injectable, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {ToastService} from 'app/shared/services/toast.service';
import {FormStoringService} from 'app/shared/services/form-storing.service';
import {Subscription} from 'rxjs';
import {EventBusService} from 'app/shared/services/event-bus.service';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmModalComponent} from 'app/shared/components/confirm-modal/confirm-modal.component';
import {INVOICE_ERROR_CODE, STATUS_CODE} from 'app/shared/constants/status-code.constants';
import {NgxSpinnerService} from 'ngx-spinner';
import {DownloadService} from 'app/shared/services/download.service';
import {JhiEventManager} from 'ng-jhipster';


const USB_TOKEN_SOCKET_URL = 'wss://localhost:8006';

@Injectable({
  providedIn: 'root'
})
export class SocketConfigService implements OnDestroy {
  private socket: WebSocket;

  token: 'Token';
  dataSign: '';
  type: number;
  serialCert: '';
  // messageCode: string;
  // idSignMessage; //Use whens igning invoice
  idCertString;
  idSerial;
  idSignValue;
  subscription: Subscription;
  dataToSign;
  mess = this.translateService.instant('invoiceDelete.toastr.messages.success.save');

  constructor(
    protected router: Router,
    private toastService: ToastService,
    private formStoringService: FormStoringService,
    private spinner: NgxSpinnerService,
    private eventBusService: EventBusService,
    private translateService: TranslateService,
    private downloadService: DownloadService,
    private modalService: NgbModal,
    private eventManager: JhiEventManager
  ) {
  }

  /**
   *  Gửi dữ liệu lên tool ký để lấy ra signValue và gửi sang hàm submitData để lưu
   * @param type
   * @param dataToSign chính là hashValue BE trả về
   * @param serialCert
   * @param idObj
   * @param dataOrigin
   * @param invoiceService
   * @param submitData
   * @param eventBusService
   * @param router
   * @param toastService
   * @param finish
   */
  onSign(type, dataToSign, serialCert, idObj, dataOrigin, invoiceService, submitData, eventBusService?: any, router?: any, toastService?: any, finish?: any,
         spinner?: any, downloadFile?: any, eventManager?: any, mess?: any) {
    const sign = {'token': 'Token', 'dataSign': dataToSign, 'serialToCheck': serialCert, 'type': 'sign'};
    const signString = JSON.stringify(sign);
    const sockets = new WebSocket(USB_TOKEN_SOCKET_URL);
    sockets.onopen = function () {
      sockets.send(signString);
    };
    sockets.onmessage = (evt) => {
      submitData(type, evt, idObj, dataOrigin, invoiceService, eventBusService, router, toastService, downloadFile, spinner, eventManager, mess);
      if (type !== 113) {
        finish('SIGN_SUCCESS', sockets);
      }
    };
    if (type !== 113) {
      sockets.onclose = function (evt) {
        finish('SIGN_SUCCESS', sockets);
      };
    }
  }

  /**
   * Sau khi có SignValu goi API after-sign để lưu
   * @param type
   * @param evt
   * @param idObj
   * @param dataOrigin
   * @param invoiceService
   * @param eventBusService
   * @param router
   * @param toastService
   */
  submitData(type, evt, idObj, dataOrigin, invoiceService, eventBusService, router, toastService, downloadService, spinner,
             eventManager?, mess?) {
    const signValues = JSON.parse(evt.data);
    dataOrigin['signatureValue'] = signValues.signValue;
    dataOrigin['id'] = idObj;
    console.warn(222, dataOrigin, type);
    switch (type) {
      case 1:
        invoiceService.saveDataByUSBToken(dataOrigin).subscribe(res => {
          if (res.body.code === STATUS_CODE.SUCCESS) {
            console.warn('Gửi dữ liệu lên rồi ');
            eventBusService.emit({
              type: 1,
              code: 200,
              data: res.body.data
            });
            router.navigate(['/invoice-management/invoice']);
          }
        }, err => {
          err.error.data !== '' ? toastService.openErrorToast(err.error.data) : toastService.openErrorToast('Có lỗi xảy ra');
        });
        break;
      case 2:
        invoiceService.saveDataByUSBTokenHasId(dataOrigin).subscribe(res => {
          if (res.body.code === STATUS_CODE.SUCCESS) {
            eventBusService.emit({
              type: 1,
              code: 200,
              data: res.body.data
            });
            router.navigate(['/invoice-management/invoice-announcement']);
          }
        }, err => {
          spinner.hide();
          err.error.data !== '' ? toastService.openErrorToast(err.error.data) : toastService.openErrorToast('Có lỗi xảy ra');
        });
        break;
      case 3:
        console.warn(2121, dataOrigin);
        invoiceService
          .downloadFileTemplateByUSB({
            invoiceTemplateId: dataOrigin.invoiceTemplateId,
            signValue: dataOrigin.signatureValue,
            typeFile: dataOrigin.typeFile,
            view: dataOrigin.view,
            certString: dataOrigin.certString,
            serial: dataOrigin.serial
          })
          .subscribe(res => {
              spinner.hide();
              if (res) {
                downloadService.downloadFile(res);
              }
            }, err => {
              spinner.hide();
              err.error.data !== '' ? toastService.openErrorToast(err.error.data) : toastService.openErrorToast('Không tải được file');
            }
          );
        break;
      case 7:
        invoiceService.saveDataByUsbTokenDeleteInvoiceReleaseAfter(dataOrigin).subscribe(res => {
          if (res.body.code === STATUS_CODE.SUCCESS) {
            console.warn('Gửi ');
            eventBusService.emit({
              type: 7,
              code: 200,
              data: null
            });
            router.navigate(['/invoice-management/invoice']);
            // toastService.openSuccessToast(mess);
            // eventManager.broadcast({ name: 'invoiceList' });
          }
        }, err => {
          spinner.hide();
          err.error.data !== '' ? toastService.openErrorToast(err.error.data) : toastService.openErrorToast('Có lỗi xảy ra');
        });
        break;
      case 113:
        invoiceService.saveDataByUSBTokenHasId(dataOrigin).subscribe(res => {
          if (res.body.code === STATUS_CODE.SUCCESS) {
            console.warn('Gửi dữ liệu lên rồi Nhiều nhiều ');
          }
        }, err => {
          spinner.hide();
          err.error.data !== '' ? toastService.openErrorToast(err.error.data) : toastService.openErrorToast('Có lỗi xảy ra');
        });
        break;
    }
  }

  /**
   *  Mục đich của hàm để lấy cerString và seri gửi lên API befor cho BE
   * @param receiveFunc Hàm gọi sinh chữ ký
   * @param errorFunc Hàm gọi báo lỗi
   */
  getCert(receiveFunc, errorFunc) {
    const hashData = {'token': 'Token', 'type': 'getCert'};
    const signString = JSON.stringify(hashData);
    //Connection opened
    const socket = new WebSocket(USB_TOKEN_SOCKET_URL);
    socket.onopen = function () {
      socket.send(signString);
    };
    socket.onclose = (evt) => {
      errorFunc(evt, this.toastService, this.socket, this.spinner);
    };
  }

  uploadCert(receiveFunc, errorFunc) {
    const hashData = {'token': this.token, 'type': 'uploadCert'};
    const signString = JSON.stringify(hashData);
    this.socket.send(signString);
    this.socket.onmessage = (evt) => {
      // eslint-disable-next-line no-console
      console.log(evt.data);
      receiveFunc(evt);
      this.socket.close();
    };
    this.socket.onclose = function (evt) {
      errorFunc(evt);
    };
  }

  finish(msg, socket) {
    const hashData = {'token': 'Token', 'type': 'finish', 'messageCode': msg};
    const signString = JSON.stringify(hashData);
    socket.send(signString);
    socket.onmessage = (evt) => {
      alert(evt);
      console.warn('Message in finish');
      console.warn(evt);
    };
    socket.onclose = function (evt) {
      console.warn('Error Finish');
      console.warn(evt);
    };
    // socket = new WebSocket(USB_TOKEN_SOCKET_URL);
    // socket.onopen = function(ev) { // connection is open
    //   alert('sucessful connected');
    // }
  }


  signFileXml() {
    this.subscription = this.eventBusService.signDataChange.subscribe(res => {
      if (res) {
        this.type = res.type;
        this.dataToSign = res.dataToSign;
      }
    });
    this.getCert(this.receiveFunc, this.errorFunction);
    return false;
  }

  /**
   *  Gọi API befor của BE để trả về hashValue rồi gọi sang onSing để ký
   * @param type
   * @param evt
   * @param invoiceService
   * @param dataToSign
   * @param issueDates
   * @param onSign
   * @param submitData
   * @param eventBusService
   * @param router
   * @param toastService
   * @param modalService
   * @param sendData
   * @param handleSigningErrorCode
   * @param errTemp
   * @param finish
   * @param spinner
   */
  receiveFunc(type, evt, invoiceService, dataToSign, onSign?: any, submitData?: any, eventBusService?: any,
              router?: any, toastService?: any, modalService?: any, sendData?: any, handleSigningErrorCode?: any, errTemp?: any, finish?: any, spinner?: any, downloadService?: any,
              eventManager?: any, mess?: any) {
    const signValue = JSON.parse(evt.data);
    dataToSign['certString'] = signValue.certRaw;
    dataToSign['serial'] = signValue.serial;
    if (signValue.messageCode !== '' && signValue.messageCode !== null) {
      alert(signValue.messageCode);
      console.warn('Message code in receiveFunc: ' + signValue.messageCode);
      handleSigningErrorCode(signValue.messageCode, toastService);
      spinner.hide();
    } else if (signValue.certRaw !== '' && signValue.certRaw !== null) {
      console.warn('// gọi hasFile()');
      // gọi hasFile() trên Java
      switch (type) {
        case 1: {  // lâp hóa đơn
          invoiceService.signByUsbToken(dataToSign).subscribe(res => {
            if (res && (res.body.code === STATUS_CODE.SUCCESS || res.body.code === STATUS_CODE.CREATED)) {
              onSign(1, res.body.data['hashValue'], res.body.data['serial'], res.body.data['id'], dataToSign,
                invoiceService, submitData, eventBusService, router, toastService, finish, spinner, downloadService);
            }
          }, err => {
            errTemp(err, modalService);
            spinner.hide();
          });
          break;
        }
        case 2: { // phát hành 1 hóa đơn
          invoiceService.signByUsbTokenHasId(dataToSign).subscribe(res => {
              if (res && res.body) {
                onSign(2, res.body.data['hashValue'], res.body.data['serial'], res.body.data['id'], dataToSign,
                  invoiceService, submitData, eventBusService, router, toastService, finish, spinner, downloadService);
              }
            },
            err => {
              errTemp(err, modalService);
              spinner.hide();
            }
          );
          break;
        }
        case 3: { // Hóa đơn điều chỉnh thông tin
          invoiceService.signByUsbTokenWithAdjustmentInfo(dataToSign).subscribe(res => {
              if (res && res.body) {
                onSign(1, res.body.data['hashValue'], res.body.data['serial'], res.body.data['id'], dataToSign,
                  invoiceService, submitData, eventBusService, router, toastService, finish, spinner, downloadService);
              }
            },
            err => {
              errTemp(err, modalService);
              spinner.hide();
            }
          );
          break;
        }
        case 4: { // Hóa đơn điều chỉnh tiền
          invoiceService.signByUsbTokenWithAdjustmentCurrency(dataToSign).subscribe(res => {
              if (res && res.body) {
                onSign(1, res.body.data['hashValue'], res.body.data['serial'], res.body.data['id'], dataToSign,
                  invoiceService, submitData, eventBusService, router, toastService, finish, spinner, downloadService);
              }
            },
            err => {
              errTemp(err, modalService);
              spinner.hide();
            }
          );
          break;
        }
        case 5: { // Lâp hóa đơn thay thế
          invoiceService.signByUsbTokenWithAdjustReplaceInfo(dataToSign).subscribe(res => {
              if (res && res.body) {
                onSign(1, res.body.data['hashValue'], res.body.data['serial'], res.body.data['id'], dataToSign,
                  invoiceService, submitData, eventBusService, router, toastService, finish, spinner, downloadService);
              }
            },
            err => {
              errTemp(err, modalService);
              spinner.hide();
            }
          );
          break;
        }
        case 6: { // tải hóa đơn trắng
          const data = {
            'certString': dataToSign.certString,
            'invoiceTemplateId': dataToSign.invoiceTemplateId,
            'serial': dataToSign.serial
          };
          invoiceService.hashValueOfAnnouncementAddPdf(data).subscribe(res => {
              if (res && res.body) {
                onSign(3, res.body.data['hashValue'], res.body.data['serial'], res.body.data['id'], dataToSign,
                  invoiceService, submitData, eventBusService, router, toastService, finish, spinner, downloadService);
              }
            },
            err => {
              errTemp(err, modalService);
              spinner.hide();
            }
          );
          break;
        }
        case 7: { // xoa bo hoa don
          invoiceService.saveDataByUsbTokenDeleteInvoiceReleaseBefor(dataToSign).subscribe(res => {
              if (res && res.body) {
                onSign(7, res.body.data['hashValue'], res.body.data['serial'], res.body.data['id'], dataToSign,
                  invoiceService, submitData, eventBusService, router, toastService, finish, spinner, downloadService, eventManager, mess);
              }
              spinner.hide();
            },
            err => {
              errTemp(err, modalService);
              spinner.hide();
            }
          );
          break;
        }
        case 113: { // Phát hành nhiều hóa đơn
          let rs = [];
          let ArrSign;
          invoiceService.hasValueReleaseInvoices({
            'supplierId.equals': dataToSign.supplierId,
            'invoiceTypeId.equals': dataToSign.invoiceTypeId,
            'invoiceTemplateId.equals': dataToSign.invoiceTemplateId,
            'invoiceSeri.equals': dataToSign.invoiceSeri,
            'startDate.greaterThanOrEqual': dataToSign.fromDate,
            'endDate.lessThanOrEqual': dataToSign.toDate,
            'fileIdImport.equals': dataToSign.fileNameImport,
            'buyerCode.equals': dataToSign.buyerCode,
            'buyerName.contains': dataToSign.buyerName,
            'buyerUnitName.contains': dataToSign.buyerUnitName,
            'buyerTaxCode.contains': dataToSign.buyerTaxCode,
            'createdBy.contains': dataToSign.createdBy,
            'issueDate': dataToSign.issueDate,
            'certString': dataToSign.certString,
            'serial': dataToSign.serial
          }).subscribe(res => {
            spinner.hide();
            if (res && (res.body.code === STATUS_CODE.SUCCESS) && res.body.data) {
              console.warn(122222222223, res.body.data);
              rs = res.body.data;
              ArrSign = {
                lstInvoiceDTO: [],
                lstInvoiceListUpdate: rs['lstInvoiceListUpdate'],
                hashCode: rs['hashCode']
              };
            }
          }, (err) => {
            errTemp(err, modalService);
            spinner.hide();
          }, () => {
            console.warn('Vào complete:', rs);
            let i = 0;
            let j = 0;
            while (i < rs['lstInvoiceDTO'].length) {
              const signs = {
                'token': 'Token',
                'dataSign': rs['lstInvoiceDTO'][i].hashValue,
                'serialToCheck': rs['lstInvoiceDTO'][i].serial,
                'type': 'sign'
              };
              ArrSign.lstInvoiceDTO.push(
                {
                  id: rs['lstInvoiceDTO'][i].id,
                  certString: rs['lstInvoiceDTO'][i].certString,
                  serial: rs['lstInvoiceDTO'][i].serial,
                  hashValue: rs['lstInvoiceDTO'][i].hashValue,
                  signValue: rs['lstInvoiceDTO'][i].signValue
                });
              const signString = JSON.stringify(signs);
              const sockets = new WebSocket(USB_TOKEN_SOCKET_URL);
              sockets.onopen = function () {
                sockets.send(signString);
              };
              sockets.onmessage = (event) => {
                console.warn(i, 'THIỆN 102', event);
                const signValues = JSON.parse(event.data);
                ArrSign.lstInvoiceDTO[j].signValue = signValues.signValue;
                j++;
                console.warn('Mảng đạt được: ', ArrSign);
                if (j === rs['lstInvoiceDTO'].length) {
                  console.warn('saveData', ArrSign);
                  invoiceService.saveDataByUsbTokenReleaseInvoice(ArrSign).subscribe(res => {
                    if (res.body.code === STATUS_CODE.SUCCESS) {
                      eventBusService.emit({
                        type: 1,
                        code: 200,
                        data: res.body.data
                      });
                      router.navigate(['/invoice-management/invoice-announcement']);
                    }
                  }, err => {
                    spinner.hide();
                    err.error.data !== '' ? toastService.openErrorToast(err.error.data) : toastService.openErrorToast('Có lỗi xảy ra');
                  });
                }
                finish('SIGN_SUCCESS', sockets);
              };
              i += 1;
              console.warn('Mảng đạt được: ', i, ArrSign);
              console.warn('THiện', i);
            }
          });
          console.warn('Vào phát hành nhiều nhiều cho chạy for nè', dataToSign.length);
          console.warn('OKKKKKKKKKKKKK done:', ArrSign);

          break;
        }
        default: {
          finish('EMPTY_TRANSFERED_CERT');
          spinner.hide();
          break;
        }
      }
    }
  }

  sendData(it, issueDates, signValue, submitData, invoiceService, eventBusService, router, toastService, modalService, finish) {
    // const objTemp = {
    //   id: it.id,
    //   issueDate: issueDates,
    //   certString: signValue.certRaw,
    //   serial:  signValue.serial
    // };
    // invoiceService.signByUsbTokenHasId(objTemp).subscribe(res => {
    //     if (res && res.body) {
    //       // eslint-disable-next-line no-console
    //       // console.log('Gửi ojb lần :', i, res, objTemp);
    //       const sign = {'token': 'Token', 'dataSign': res.body.data['hashValue'], 'serialToCheck': res.body.data['serial'], 'type': 'sign'};
    //       const signString = JSON.stringify(sign);
    //       // console.warn('gửi ký lần :',i, sign);
    //       socket.send(signString);
    //       // eslint-disable-next-line no-shadow
    //       socket.onmessage = (evt) => {
    //         console.warn('onmessage Lần :' , evt)
    //         success(res.body.data['id']);
    //         // submitData(113, evt,  res.body.data['id'], objTemp, invoiceService, eventBusService, router, toastService);
    //       }
    //     }
    //   },
    //   err => {
    //     // falses ++;
    //     this.errTemp(err, modalService);
    //   }
    // );
  }

  errTemp(err, modalService) {
    if (err.error.message === INVOICE_ERROR_CODE.INVOICE_PACKAGE_EMPTY) {
      const modalRef = modalService.open(ConfirmModalComponent, {centered: true, backdrop: 'static'});
      modalRef.componentInstance.type = 'confirmWithMsg';
      modalRef.componentInstance.message = 'Lập hóa đơn thất bại! Đơn vị đã dùng hết số hóa đơn đăng ký';
    } else if (err.error.message === INVOICE_ERROR_CODE.INVOICE_SIGNATURE_INVALID) {
      const modalRef = modalService.open(ConfirmModalComponent, {centered: true, backdrop: 'static'});
      modalRef.componentInstance.type = 'confirmWithMsg';
      modalRef.componentInstance.message = 'Bạn không thể lập hóa đơn! Đơn vị chưa kích hoạt chứng thư số';
    } else if (err.error.message === INVOICE_ERROR_CODE.INVOICE_INVOICE_LIST_EMPTY) {
      const modalRef = modalService.open(ConfirmModalComponent, {centered: true, backdrop: 'static'});
      modalRef.componentInstance.type = 'confirmWithMsg';
      modalRef.componentInstance.message = 'Lập hóa đơn thất bại! Đơn vị đã dùng hết số hóa đơn đã phát hành';
    } else if (err.error.message === INVOICE_ERROR_CODE.INVOICE_NULL) {
      const modalRef = modalService.open(ConfirmModalComponent, {centered: true, backdrop: 'static'});
      modalRef.componentInstance.type = 'confirmWithMsg';
      modalRef.componentInstance.message = 'Hóa đơn không hợp lệ';
    } else if (err.error.message === INVOICE_ERROR_CODE.INVOICE_SERIAL_ACCESS_DENIED) {
      const modalRef = modalService.open(ConfirmModalComponent, {centered: true, backdrop: 'static'});
      modalRef.componentInstance.type = 'confirmWithMsg';
      modalRef.componentInstance.message = 'Không có quyền thao tác với ký hiệu hóa đơn này!';
    } else if (err.error.message === INVOICE_ERROR_CODE.INVOICE_ACTION_INVALID) {
      const modalRef = modalService.open(ConfirmModalComponent, {centered: true, backdrop: 'static'});
      modalRef.componentInstance.type = 'confirmWithMsg';
      modalRef.componentInstance.message = 'Không có quyền thao tác này trên hóa đơn!';
    } else if (err.error.message === INVOICE_ERROR_CODE.INVOICE_ISSUE_DATE_INVALID) {
      const modalRef = modalService.open(ConfirmModalComponent, {centered: true, backdrop: 'static'});
      modalRef.componentInstance.type = 'confirmWithMsg';
      modalRef.componentInstance.message = 'Ngày lập hóa đơn không hợp lệ!';
    } else if (err.error.data !== null && err.error.data !== '') {
      const modalRef = modalService.open(ConfirmModalComponent, {centered: true, backdrop: 'static'});
      modalRef.componentInstance.type = 'confirmWithMsg';
      modalRef.componentInstance.message = err.error.data;
    } else {
      const modalRef = modalService.open(ConfirmModalComponent, {centered: true, backdrop: 'static'});
      modalRef.componentInstance.type = 'confirmWithMsg';
      modalRef.componentInstance.message = 'Hệ thống không thể phát hành hóa đơn';
    }
  }

  errorFunction(event, toastService?: any, socket?: any, spinner?: any) {
    console.warn('====>>>errorFunction<<<===');
    console.warn(event.code);
    spinner.hide();
    // let textMessage = '#{lang[\'common.msg.error\']}';
    // const messageType = 'error';
    // let reason;
    // // console.log("Error code: " + event.code);
    // if (event.code === 1000) {
    //   toastService.openErrorToast('Normal closure, meaning that the purpose for which the connection was established has been fulfilled.');
    // } else if (event.code === 1001) {
    //   toastService.openErrorToast('An endpoint is "going away", such as a server going down or a browser having navigated away from a page.');
    //   textMessage = '#{lang[\'sign.invoice.session.time.out\']}';
    // } else if (event.code === 1002)
    //   toastService.openErrorToast('An endpoint is terminating the connection due to a protocol error');
    // else if (event.code === 1003)
    //   toastService.openErrorToast('An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).');
    // else if (event.code === 1004)
    //   toastService.openErrorToast('Reserved. The specific meaning might be defined in the future.');
    // else if (event.code === 1005)
    //   toastService.openErrorToast('No status code was actually present.');
    // else
    if (event.code === 1006) {
      //   //        reason = "The connection was closed abnormally, e.g., without sending or receiving a Close control frame";
      toastService.openErrorToast('Không thể kết nối đến USB token. Yêu cầu cắm USB-TOKEN và cài đặt phần mềm ký số của Viettel');
      //   textMessage = '#{lang[\'message.einvoice.tool.not.found\']}';
    }
    // else if (event.code === 1007)
    //   toastService.openErrorToast('An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [http://tools.ietf.org/html/rfc3629] data within a text message).');
    // else if (event.code === 1008)
    //   toastService.openErrorToast('An endpoint is terminating the connection because it has received a message that "violates its policy". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.');
    // else if (event.code === 1009)
    //   toastService.openErrorToast('An endpoint is terminating the connection because it has received a message that is too big for it to process.');
    // else if (event.code === 1010) // Note that this status code is not used by the server, because it can fail the WebSocket handshake instead.
    //   toastService.openErrorToast('An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn\'t return them in the response message of the WebSocket handshake. <br /> Specifically, the extensions that are needed are: ' + event.reason);
    // else if (event.code === 1011)
    //   toastService.openErrorToast('A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.');
    // else if (event.code === 1015)
    //   toastService.openErrorToast('The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can\'t be verified).');
    // else
    //   toastService.openErrorToast('Unknown reason');
    // // eslint-disable-next-line no-console
    // console.log(event.code);
  }

  handleSigningErrorCode(errorCode, toastService) {
    // eslint-disable-next-line no-console
    console.log('handleSigningErrorCode');
    // eslint-disable-next-line no-console
    console.log(errorCode);
    // try {
    //   const message = {
    //     textMessage: '',
    //     messageType: ''
    //   };
    //   if (errorCode === 'SESSION_TIME_OUT') {
    //     toastService.openErrorToast('SESSION_TIME_OUT Hết thời gian kết nỗi với tool ký');
    //   } else if (errorCode === 'IS_SIGNING') {
    //     toastService.openErrorToast('IS_SIGNING Lỗi ký');
    //   } else if (errorCode === 'FORCE_CLOSE') {
    //     toastService.openErrorToast('msg.stop.sign.usb-token');
    //   } else if (errorCode === 'DEFAULT_CERT_NOT_IN_USB_TOKEN') {
    //     toastService.openErrorToast('default.cert.not.in.usb.token');
    //   } else if (errorCode === 'NO_INTERNET_CONNECTION_TO_VALIDATE_DEFAUT_CERT') {
    //     toastService.openErrorToast('default.cert.validation.connection.fail');
    //   } else if (errorCode === 'NO_INTERNET_CONNECTION') {
    //     toastService.openErrorToast('cert.validation.connection.fail');
    //   } else if (errorCode === 'DEFAULT_CERT_HAVE_ERROR') {
    //     toastService.openErrorToast('default.cert.error.message');
    //   } else if (errorCode === 'INVALID_DEFAULT_CERT') {
    //     toastService.openErrorToast('default.cert.invalid');
    //   } else if (errorCode === 'NO_CERT_IN_USB') {
    //     toastService.openErrorToast('no.cert.in.usb.token');
    //   } else if (errorCode === 'NO_INTERNET_CONNECTION_SETUP_TABLE') {
    //     toastService.openErrorToast('cert.validation.connection.fail');
    //   } else if (errorCode === 'VALUE_EMPTY') {
    //     toastService.openErrorToast('message.value.empty.to.sign');
    //   } else if (errorCode === 'EMPTY_INVOICE') {
    //     toastService.openErrorToast('empty.invoice.exist');
    //   } else if (errorCode === 'NO_INTERNET_CONNECTION_TO_VALIDATE_CERT_TO_SIGN') {
    //     toastService.openErrorToast('cert.validation.connection.fail');
    //   } else if (errorCode === 'HAVE_ERROR_WHEN_SIGING') {
    //     toastService.openErrorToast('have.error.when.signing');
    //   } else if (errorCode === 'INVALID_CERT') {
    //     toastService.openErrorToast('message.invalid.cert');
    //   } else if (errorCode === 'NO_USB_TOKEN_TO_SIGN') {
    //     toastService.openErrorToast('no.usb.token');
    //   } else if (errorCode === 'MORE_THAN_ONE_USB_TOKEN_TO_SIGN') {
    //     toastService.openErrorToast('two.usb.token.found');
    //   } else if (errorCode === 'USB-UNPLUG') {
    //     toastService.openErrorToast('disconnect.usb.token');
    //   } else if (errorCode === 'HAVE_ERROR') {
    //     toastService.openErrorToast('HAVE_ERROR! Có lỗi xả ra');
    //   }
    //   // eslint-disable-next-line no-empty
    // } catch (e) {
    // }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

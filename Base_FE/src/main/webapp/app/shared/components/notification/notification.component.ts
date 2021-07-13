import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DownloadService} from 'app/shared/services/download.service';

@Component({
  selector: 'jhi-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  data;
  public show;
  listTimeOut = [];
  selectedData;
  ngbModalRef: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private downloadService: DownloadService
  ) {
  }

  ngOnInit() {
  }

  closeAll() {
    this.show = false;
  }

  public setData(data) {
    if (data) {
      this.data = Array.from(data);
    }
    this.show = true;
    this.clearAllTimeOut();
    this.setTimeOutForAll();
  }

  // setTimeOutForAll() {
  //   this.listTimeOut = new Array(this.data);
  //   const notiSize = this.data.length;
  //   for (let index = 0; index < notiSize; index++) {
  //     const element = this.data[index];
  //     this.listTimeOut[index] = setTimeout(() => {
  //       this.hideOne();
  //     }, Number(element.displayTime) * 1000);
  //   }
  // }

  // hideOne(index) {
  //   if (this.listTimeOut[index]) {
  //     clearTimeout(this.listTimeOut[index]);
  //     this.listTimeOut.splice(index, 1);
  //   }
  //   this.data.splice(index, 1);
  // }

  setTimeOutForAll() {
    this.listTimeOut = new Array(this.data.length);
    const notiSize = this.data.length;
    for (let index = notiSize - 1; index >= 0; index--) {
      const element = this.data[index];
      this.listTimeOut[index] = setTimeout(() => {
        this.hideOne();
      }, Number(element.displayTime) * 1000);
    }
  }

  hideOne() {
    if (this.listTimeOut[this.listTimeOut.length - 1]) {
      clearTimeout(this.listTimeOut[this.listTimeOut.length - 1]);
      this.listTimeOut.splice(this.listTimeOut.length - 1, 1);
    }
    this.data.splice(this.listTimeOut.length - 1, 1);
  }

  clearAllTimeOut() {
    for (let index = 0; index < this.listTimeOut.length; index++) {
      const element = this.listTimeOut[index];
      if (element) {
        clearTimeout(element);
      }
    }
  }

  public hide() {
    this.clearAllTimeOut();
    this.show = false;
  }

}

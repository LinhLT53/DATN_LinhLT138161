import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';
import { SessionStorageService } from 'ngx-webstorage';

import { VERSION } from 'app/app.constants';
import { JhiLanguageHelper } from 'app/core/language/language.helper';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { FormStoringService } from 'app/shared/services/form-storing.service';
import { DownloadService } from 'app/shared/services/download.service';
import { NotificationComponent } from 'app/shared/components/notification/notification.component';
import { STORAGE_KEYS } from 'app/shared/constants/storage-keys.constants';
 import {ChangePasswordComponent} from "app/layouts/navbar/change-password/change-password.component";
import {NotificationService} from "app/core/services/notification/notification.service";
import {Observable} from "rxjs";
import "rxjs-compat/add/observable/interval";
import {HumanResourcesApiService} from "app/core/services/Human-resources-api/human-resources-api.service";
import {WebsocketService} from "app/core/services/websocket/websocket.service";

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild(NotificationComponent, { static: true }) notification;
  idUser: any;
  inProduction: boolean;
  isNavbarCollapsed: boolean;
  languages: any[];
  currentlogin: any;
  swaggerEnabled: boolean;
  modalRef: NgbModalRef;
  version: string;
  notificationList: any[];
  notificationPopupList: any[];
  notificationTotalList: any[] = [];
  selectedItem;
  selectedIndex;
  hasPermission = true;
  count :any;
  show =false;
  countNew :any;
  listNotification :any[];
  public notifications1 :any;
  SHOW_HIDE_COL_HEIGHT=40;
  userToken:any;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private languageService: JhiLanguageService,
    private languageHelper: JhiLanguageHelper,
    private sessionStorage: SessionStorageService,
    private profileService: ProfileService,
    private formStoringService: FormStoringService,
    private downloadService: DownloadService,
    private notificationService : NotificationService,
    private webSocketService: WebsocketService
  ) {
    this.version = VERSION ? (VERSION.toLowerCase().startsWith('v') ? VERSION : 'v' + VERSION) : '';
    this.isNavbarCollapsed = true;
    const stompClient = this.webSocketService.connect();
    stompClient.connect({}, frame => {

      // Subscribe to notification topic
      stompClient.subscribe('/topic/notification', notifications => {

        this.notifications1 = notifications.body;
        if(this.notifications1!==undefined){
          this.getAllNotification();
        }
        console.warn(this.notifications1)
        console.warn(notifications)
      })
    });
  }

  ngOnInit() {
    this.userToken = this.formStoringService.get(STORAGE_KEYS.USER);
    this.languages = this.languageHelper.getAll();
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });
    this.currentlogin = this.formStoringService.getCurrentUserFromToken();
    this.formStoringService.get(STORAGE_KEYS.CURRENT_USER);
    this.getAllNotification();
  }

 

  getSelected(index) {
    if (index === this.selectedIndex) {
      return true;
    } else {
      return false;
    }
  }

  showNotification() {
    this.notification.setData(this.notificationPopupList);
  }

  changeLanguage(languageKey: string) {
    this.sessionStorage.store('locale', languageKey);
    this.languageService.changeLanguage(languageKey);
  }

  collapseNavbar() {
    this.isNavbarCollapsed = true;
  }

  logout() {
    this.collapseNavbar();
    this.router.navigate(['']);
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  get currentUser() {
    console.warn(999, this.formStoringService.getCurrentUserFromToken())
    return  this.formStoringService.get(STORAGE_KEYS.CURRENT_USER);
  }


  getUserName(){
    return this.formStoringService.get(STORAGE_KEYS.USER);
  }
  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }

  closeNotification() {
    if (this.notification.show === true) {
      this.notification.closeAll();
    }
  }

  openChangePassword() {
    const modalRef = this.modalService.open(ChangePasswordComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'myCustomModalClass'
    });
    // modalRef.componentInstance.onCloseModal.subscribe();
  }

  //dangnp
  getAllNotification(){
    if(this.userToken.role==="ROLE_USER"){
      this.notificationService.getNotiveUser(this.userToken.humanResourceId).subscribe(success=>{
        this.count=success.sum;
        this.listNotification=success.list;
      },error => {
  
          }
          );
    }else if(this.userToken.role==="ROLE_ADMINPART"){
      this.notificationService.getNotiveAdmin(this.userToken.humanResourceId,this.userToken.partId).subscribe(success=>{
        this.count=success.sum;
        this.listNotification=success.list;
      },error => {
  
          }
          );
    }else if(this.userToken.role==="ROLE_ALL"){
      this.notificationService.getNotiveAdminAll(this.userToken.humanResourceId).subscribe(success=>{
        this.count=success.sum;
        this.listNotification=success.list;
      },error => {
  
          }
          );
    }
    //   this.notificationService.findAllNotification().subscribe(success=>{
    //   this.count=success.count;
    //   this.listNotification=success.listNotification;
    //     this.listNotification.forEach(value => {
    //       if(value.isSeen===0){
    //         this.countNew++;
    //       }
    //     });
    // },error => {

    //     }
    //     );
  }

  convertJson(value){
    return JSON.parse(value);
  }

  openNotification(){
    this.show = !this.show;
    // if (this.count>0&&!this.show){
    //   this.notificationService.updateIsSeen().subscribe(success=>{
    //     this.count=0;
    //     this.countNew=0;
    //     this.listNotification.map(value => {
    //       value.isSeen=1;
    //       return value;
    //     });
    //   })
    // }
  }

  outSideNotification(){
    console.warn("TTTTTTTTTT")
    // if (this.count>0){
    //   this.notificationService.updateIsSeen().subscribe(success=>{
    //     this.show = false;
    //     this.count=0;
    //     this.countNew=0;
    //     this.listNotification.map(value => {
    //       value.isSeen=1;
    //       return value;
    //     });
    //   })
    // }else {
    //   this.show=false;
    // }
  }

  updateIteam(id){
    this.show=!this.show
    console.warn("chuyen")
    this.router.navigate(['/system-categories/request-form']);
    if(this.userToken.role==="ROLE_USER"){
          this.notificationService.getupdateUser(id).subscribe(success=>{
      this.getAllNotification();
    },error => {

        }
        );
    }else if(this.userToken.role==="ROLE_ADMINPART"){
        this.notificationService.getupdateAdmin(this.userToken.humanResourceId ,id).subscribe(success=>{
        this.getAllNotification();
         },error => {

      }
      );
  }else if(this.userToken.role==="ROLE_ALL"){
    this.notificationService.getupdateAdminAll(this.userToken.humanResourceId ,id).subscribe(success=>{
      this.getAllNotification();

    },error => {

        }
        );
  }
  }
}

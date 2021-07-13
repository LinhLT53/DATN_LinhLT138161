import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { LOCAL_STORAGE, SessionStorageService } from 'ngx-webstorage';

import { VERSION } from 'app/app.constants';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { JhiLanguageHelper } from 'app/core/language/language.helper';
import { FormStoringService } from 'app/shared/services/form-storing.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'app/shared/services/toast.service';
import { CommonApiService } from 'app/core/services/common-api/common-api.service';
import { MENU_TITLE } from 'app/shared/constants/sidebar-menu.constants';
import { STORAGE_KEYS } from 'app/shared/constants/storage-keys.constants';
import { STATUS } from 'app/shared/constants/app-params.constants';
import { ProjectManagementService } from 'app/core/services/project-management/project-management.service';
import { QUYEN } from 'app/shared/constants/authen';

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  inProduction: boolean;
  isNavbarCollapsed: boolean;
  languages: any[];
  swaggerEnabled: boolean;
  version: string;
  currentUser;
  hasPermission = false;
  categories: any[] = [];
  reports: any[] = [];
  quyen = QUYEN;
  supplier = {
    name: MENU_TITLE.HRM.SUPPLIER,
    url: '/system-categories/supplier-resources',
    class: 'fa-home',
    resourceCode: 'menu.hddt_qlht_chdn'
  };
  asset = {
    name: MENU_TITLE.HRM.ASSET,
    url: '/system-categories/asset-resource',
    class: 'fa-home',
    resourceCode: 'menu.hddt_qlht_chdn'
  };

  chart = {
    name: MENU_TITLE.HRM.CHART,
    url: '/system-categories/chart-resources',
    class: 'fa-home',
    resourceCode: 'menu.hddt_qlht_chdn'
  };

  warehouse = {
    name: MENU_TITLE.HRM.WAREHOUSE,
    url: '/system-categories/warehouse-resources',
    class: 'fa-home',
    resourceCode: 'menu.hddt_qlht_chdn'
  };

  customer = {
    name: MENU_TITLE.HRM.CUSTOMER,
    url: '/system-categories/customer-resources',
    class: 'fa-home',
    resourceCode: 'menu.hddt_qlht_chdn'
  };

  groupPermission = {
    name: MENU_TITLE.GROUP_PERMISSION.GP,
    url: '/system-categories/group-permissions',
    class: 'fa-street-view',
    resourceCode: 'menu.hddt_qlht_chdn'
  };
  humanResources = {
    name: MENU_TITLE.HRM.USER_MANAGEMENT,
    url: '/system-categories/human-resources',
    class: 'fa-users',
    resourceCode: 'menu.hddt_qlht_chdn'
  };

  room = {
    name: MENU_TITLE.HRM.ROOM,
    url: '/system-categories/room-resources',
    class: 'fa-users',
    resourceCode: 'menu.hddt_qlht_chdn'
  };

  promotion = {
    name: MENU_TITLE.HRM.PROMOTION,
    url: '/system-categories/promotion-resources',
    class: 'fa-users',
    resourceCode: 'menu.hddt_qlht_chdn'
  };

  roomType = {
    name: MENU_TITLE.HRM.ROOM_TYPE,
    url: '/system-categories/room-type-resources',
    class: 'fa-users',
    resourceCode: 'menu.hddt_qlht_chdn'
  };

  service = {
    name: MENU_TITLE.HRM.SERVICE,
    url: '/system-categories/service-resources',
    class: 'fa-users',
    resourceCode: 'menu.hddt_qlht_chdn'
  };

  riskList = {
    name: MENU_TITLE.RISKLIST.VIEW_LIST,
    url: '/system-categories/project-management/risk-list',
    class: 'fa-asterisk',
    resourceCode: 'menu.hddt_qlht_chdn'
  };
  projectManager = {
    name: MENU_TITLE.HRM.PROJECT_MANAGEMENT,
    url: '/system-categories/project-management',
    class: 'fa-product-hunt',
    resourceCode: 'menu.hddt_qlht_chdn'
  };
  partnerManager = {
    name: MENU_TITLE.PARTNER_MANAGEMENT.NAME,
    url: '/system-categories/partner-management',
    class: 'fa-handshake-o',
    resourceCode: 'menu.hddt_qlht_chdn'
  };
  chartManager = {
    name: MENU_TITLE.CHART_MANAGEMENT.NAME,
    url: '/system-categories/chart',
    class: 'fa-bar-chart',
    resourceCode: 'menu.hddt_qlht_chdn'
  };
  issuesMember = {
    name: MENU_TITLE.ISSUES_MEMBER.NAME,
    url: '/system-categories/issues-member',
    class: 'fa-question-circle',
    resourceCode: 'menu.hddt_qlht_chdn'
  };
  resourcesManagement = {
    name: MENU_TITLE.RESOURCES_MANAGEMENT.NAME,
    class: 'fa-tachometer',
    resourceCode: 'menu.hddt_qlht_chdn'
  };
  resourcesManagementProject = {
    name: MENU_TITLE.RESOURCES_MANAGEMENT_PROJECT.NAME,
    url: '/system-categories/resources-management',
    class: 'fa-tachometer',
    resourceCode: 'menu.hddt_qlht_chdn'
  };
  resourcesManagementHumanResource = {
    name: MENU_TITLE.RESOURCES_MANAGEMENT_HUMAN_RESOURCE.NAME,
    url: '/system-categories/resources-human',
    class: 'fa-tachometer',
    resourceCode: 'menu.hddt_qlht_chdn'
  };
  requestform = {
    name: MENU_TITLE.REQUEST_FORM.NAME,
    url: '/system-categories/request-form',
    class: 'fa-tachometer',
    resourceCode: 'menu.hddt_qlht_chdn'
  };
  listDevice = {
    name: MENU_TITLE.LIST_DEVICE.NAME,
    url: '/system-categories/list-device',
    class: 'fa-tachometer',
    resourceCode: 'menu.hddt_qlht_chdn'
  };

  bookRoom = {
    name: MENU_TITLE.BOOK_ROOM.NAME,
    url: '/system-categories/book-room',
    class: 'fa-tachometer',
    resourceCode: 'menu.hddt_qlht_chdn'
  };

  bookRoomFuture = {
    name: MENU_TITLE.BOOK_ROOM_FUTURE.NAME,
    url: '/system-categories/book-room-future',
    class: 'fa-tachometer',
    resourceCode: 'menu.hddt_qlht_chdn'
  };
  user: any;
  constructor(
    private languageService: JhiLanguageService,
    private languageHelper: JhiLanguageHelper,
    private sessionStorage: SessionStorageService,
    private profileService: ProfileService,
    private router: Router,
    private formStoringService: FormStoringService,
    private toastService: ToastService,
    private translateService: TranslateService,
    private commonApiService: CommonApiService,
    private cdref: ChangeDetectorRef,
    private projectManagementService: ProjectManagementService
  ) {
    this.version = VERSION ? 'v' + VERSION : '';
    this.isNavbarCollapsed = true;
  }

  ngOnInit() {
    this.languages = this.languageHelper.getAll();
    this.getUser();
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });
  }

  ngAfterViewInit(): void {
    this.currentUser = this.formStoringService.get(STORAGE_KEYS.CURRENT_USER);
    if (!this.currentUser) {
      this.hasPermission = false;

      this.cdref.detectChanges();
      return;
    } else {
      if (this.currentUser.userState === STATUS.ACTIVE && this.currentUser.tenantState === STATUS.ACTIVE) {
        this.hasPermission = true;
        // this.getMenuFunction();
        this.cdref.detectChanges();
      }
    }
  }

  changeLanguage(languageKey: string) {
    this.sessionStorage.store('locale', languageKey);
    this.languageService.changeLanguage(languageKey);
  }

  collapseNavbar() {
    this.isNavbarCollapsed = true;
  }

  isAuthenticated() {}

  login() {}

  logout() {
    this.collapseNavbar();
    this.router.navigate(['']);
  }

  // toggleNavbar() {
  //   this.isNavbarCollapsed = !this.isNavbarCollapsed;
  // }
  //
  // getImageUrl() {
  // }
  //
  // setPermission() {
  //   this.getActiveRouter(this.systemCategories_, 0);
  // }

  // getActiveRouter(arr: any[] = [], number: any) {
  //   for (let index = 0; index < arr.length; index++) {
  //     if (number === 0) {
  //       this.systemManagements.push(arr[index]);
  //     } else if (number === 1) {
  //       this.categories.push(arr[index]);
  //     } else if (number === 2) {
  //       this.announcementManagements.push(arr[index]);
  //     } else if (number === 3) {
  //       this.invoiceManagements.push(arr[index]);
  //     } else if (number === 4) {
  //       this.reports.push(arr[index]);
  //     } else if (number === 5) {
  //       this.utilities.push(arr[index]);
  //     }
  //   }
  // }

  /* public getMenuFunctionNotAuth() {
    this.commonApiService.getMenuFunctionNotAuth().subscribe(res => {
      if (res && res.body.code === STATUS_CODE.SUCCESS) {
        this.menuFunctionListNotAuth = res.body.data;
      } else {
        this.menuFunctionListNotAuth = [];
      }
    }, () => {
      // this.toastService.openErrorToast(this.translateService.instant('common.toastr.messages.error.load'));
    });
  }*/

  /* public getMenuFunction() {
    this.commonApiService.getMenuFunction().subscribe(res => {
      if (res && res.body.code === STATUS_CODE.SUCCESS) {
        this.menuFunctionList = res.body.data;
      } else {
        this.menuFunctionList = [];
      }
    }, () => {
      // this.toastService.openErrorToast(this.translateService.instant('common.toastr.messages.error.load'));
    });
  }*/

  // filterParent(menuFunctionList) {
  //   if (menuFunctionList && menuFunctionList.length > 0) {
  //     const result = menuFunctionList.filter(it => it.parentId === null);
  //     return result;
  //   }
  // }
  //
  // filterDetails(menuFunctionList, data) {
  //   if (menuFunctionList && menuFunctionList.length > 0) {
  //     return menuFunctionList.filter(it => it.parentId === data.id);
  //   }
  // }
  //
  // clearCacheOutsource() {
  //   this.projectManagementService.navigation(null);
  // }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  getRoll() {
    return true;
  }
}

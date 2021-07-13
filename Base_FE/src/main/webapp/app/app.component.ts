import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRouteSnapshot, NavigationEnd, NavigationError, Router} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language/language.helper';
import {ScriptService} from 'app/shared/services/script.service';
import {NotificationComponent} from 'app/shared/components/notification/notification.component';

@Component({
  selector: 'jhi-main',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(NotificationComponent, {static: true}) notification;

  constructor(private jhiLanguageHelper: JhiLanguageHelper, private router: Router, private scriptService: ScriptService) {
  }

  ngOnInit() {
    const userToken: any = localStorage.getItem("user");
    if(userToken === null){
      this.router.navigate(['/login'])
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
      }
      if (event instanceof NavigationError && event.error.status === 404) {
        this.router.navigate(['/404']);
      }
    });
  }

  ngAfterViewInit(): void {
    this.scriptService.load('jquery-1.11.1.min.js', 'pace.min.js', 'tether.min.js').then(() => {
      this.scriptService.load('bootstrap.min.js', 'modernizr.custom.js', 'jquery.scrollbar.min.js', 'ckeditor.js').then(() => {
        this.scriptService.load('pages.min.js', 'scripts.js', 'demo.js').then(() => {
        });
      });
    });
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'invoiceWebappApp';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }
}

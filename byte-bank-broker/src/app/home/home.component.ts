import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  PoMenuItem,
  PoToolbarAction,
  PoToolbarProfile,
} from '@po-ui/ng-components';
import { User } from '../authorization/model/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization/authorization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy {
  public logo: string;
  public title: string;
  public menu: Array<PoMenuItem>;
  public user: User;
  public profileActions: Array<PoToolbarAction> = [];
  public profile: PoToolbarProfile = {
    avatar: '',
    title: '',
  };
  private subs = new Subscription();

  public name: string;

  constructor(
    private router: Router,
    private authService: AuthorizationService
  ) {
    this.title = environment.name;
    this.logo = `../../${environment.imagesPath}/bytebank.png`;
  }

  ngOnInit() {
    this.setHomeInfo();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  private setHomeInfo(): void {
    this.user = this.authService.getAuthenticatedUser();
    this.profileActions.push({
      label: 'Logout',
      action: () => this.logout(),
    });
    this.menu = this.getMenus();
    this.profile.title = this.user.name;
  }

  private getMenus(): Array<PoMenuItem> {
    const menu: Array<PoMenuItem> = [
      {
        label: 'Home',
        link: '/home',
      },
      {
        label: 'Ações',
        link: '/home/acoes',
      },
      {
        label: 'Portfolio',
        link: '/home/portfolio',
      },
    ];
    return menu;
  }
}

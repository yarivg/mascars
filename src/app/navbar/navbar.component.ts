import {Component, OnInit, ViewChild} from '@angular/core';
import {version, supportMail, releaseDate} from '../../../package.json';
import {AuthService} from '../services/auth.service';
import {User} from '../entities/user';
import {NavbarComponent as MDBNavbar} from 'angular-bootstrap-md';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  version: string = version;
  supportMail: string = supportMail;
  releaseDate: string = releaseDate;
  currentUser$: Observable<User | undefined>;
  @ViewChild(MDBNavbar)
  private mdbNavbar: MDBNavbar;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.currentUser$ = this.authService.loggedInUser$;
    this.currentUser$.subscribe(() => this.toggleShownNavbar());
  }

  signOut(): void {
    this.authService.signOut();
  }

  toggleShownNavbar(): void {
    if (this.mdbNavbar.isShown) {
      this.toggleNavbar();
    }
  }

  toggleNavbar(): void {
    this.mdbNavbar.toggle();
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {version, supportMail, releaseDate} from '../../../package.json';
import {AuthService} from '../services/auth.service';
import {User} from '../entities/user';
import {NavbarComponent as MDBNavbar} from 'angular-bootstrap-md';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  version: string = version;
  supportMail: string = supportMail;
  releaseDate: string = releaseDate;
  user: User | undefined;
  @ViewChild('navbarID')
  private mdbNavbar: MDBNavbar;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe((user: User | undefined) => {
      this.user = user;
    });
  }

  signOut(): void {
    this.authService.signOut();
    this.toggleNavbar();
  }

  toggleNavbar(): void {
    if (this.mdbNavbar.shown) {
      this.mdbNavbar.toggle();
    }
  }
}

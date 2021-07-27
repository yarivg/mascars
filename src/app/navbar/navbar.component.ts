import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../entities/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: User | undefined;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe((user: User | undefined) => {
      this.user = user;
    });
  }

}

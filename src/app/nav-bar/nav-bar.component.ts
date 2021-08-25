import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth-service.service';
import { NavbarService } from '../shared/services/navbar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public navService: NavbarService,
              public authService: AuthService) { }

  ngOnInit(): void {
  }

  logOut(){
    this.authService.SignOut();
  }

}

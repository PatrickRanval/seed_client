import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TrayViewComponent } from './tray-view/tray-view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';
import { LandingComponent } from './landing/landing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingComponent, TrayViewComponent, NavbarComponent, LoginComponent, RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  //Change Title Maybe??
  title = 'seed_client';

  constructor (private authService:AuthService, private userService:UserService){}

  ngOnInit() {
    if(this.authService.getToken()){
      let token =  this.authService.getToken();
      this.userService.setUserFromDecodedToken(token);
    }
  }
}
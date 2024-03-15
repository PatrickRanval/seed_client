import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  public isUser:boolean = false;

  constructor(private router:Router, private userService:UserService, private authService:AuthService) {}

  checkUser():void {
    this.isUser = !!this.userService.getUserId();
  }

  onSeedShelf(){
    let id = this.userService.getUserId()
    this.router.navigate([`/user/${id}/shelf`]);
  }
  onTrays(){
    let id = this.userService.getUserId()
    this.router.navigate([`/user/${id}/trays`]);
  }
  onLogout(){
    this.authService.logout()
    this.userService.logout()
  }

}

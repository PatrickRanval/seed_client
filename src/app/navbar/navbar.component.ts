import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private router:Router, private userService:UserService) {}

  onSeedShelf(){
    let id = this.userService.getUserId()
    this.router.navigate([`/user/${id}/shelf`]);
  }
  onTrays(){
    let id = this.userService.getUserId()
    this.router.navigate([`/user/${id}/trays`]);
  }

}

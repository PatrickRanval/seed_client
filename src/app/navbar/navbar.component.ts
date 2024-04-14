import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {

  public isUser: boolean = false;
  private currentUserSubscription: Subscription | undefined;

  constructor(private router: Router, private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.userService.currentUserSubject.subscribe((user: User | null) => {
      this.isUser = !!user; // Set isUser based on whether user is present
    });
  }

  ngOnDestroy(): void {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

  onSeedShelf(): void {
    this.router.navigate(['user', this.userService.getUserId(), 'shelf']);
  }

  onTrays(): void {
    this.router.navigate(['user', this.userService.getUserId(), 'trays']);
  }

  onLogout(): void {
    this.authService.logout();
    this.userService.logout();
    this.router.navigate(['']);
  }
}
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authService:AuthService, private router:Router, private userService:UserService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  // login() {
  //   if(this.loginForm.valid) {
  //     this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
  //       next: (res: any) => {
  //         console.log('Logged in with token:', res);
  //         this.authService.setToken(res.token);
  //         // Goin off the rails
  //         this.userService.setUserFromDecodedToken(res.token);
  //         let id = this.userService.getUserId()
  //         this.router.navigate([`/user/${id}`]);
  //       },
  //       error: (error: any) => {
  //         console.error('All aboard the failboat! There has been a login error.', error);
  //       },
  //     });
  //   }
  // }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (res: any) => {
          console.log('Logged in with token:', res);
          this.authService.setToken(res.token);
          //We're going to decode user information from the token. This takes time.
          //We subscribe to the result and once it returns we route the user away.
          this.userService.setUserFromDecodedToken(res.token).subscribe({
            next: () => {
              let id = this.userService.currentUserSubject.value?.userId
              this.router.navigate([`/user/${id}/trays`]);
            },
            error: (err) => {
              console.error('Error setting user from decoded token:', err);
            }
          });
        },
        error: (error: any) => {
          console.error('All aboard the failboat! There has been a login error.', error);
        },
      });
    }
  }

  // DEBUG METHOD
  manuallyNavigateAway() {
    let id = this.userService.getUserId();
    this.router.navigate([`/user/${id}/trays`]);
  }
}

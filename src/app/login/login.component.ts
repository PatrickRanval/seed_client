import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

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
          this.userService.setUserFromDecodedToken(res.token);
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

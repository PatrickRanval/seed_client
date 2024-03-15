import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  signupForm: FormGroup;


  constructor(private authService:AuthService, private router:Router, private userService:UserService) {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordConfirm: new FormControl('', Validators.required)
    }, { validators: this.passwordMatchValidator });
  }

  signup() {
    if (this.signupForm.valid) {
      this.authService.signup(
        this.signupForm.value.email,
        this.signupForm.value.firstName,
        this.signupForm.value.lastName,
        this.signupForm.value.password,
        this.signupForm.value.passwordConfirm)
        .subscribe({
        next: (res: any) => {
          console.log('Signed Up Successfully:', res);

          //There may be an issue here:
          this.authService.login(this.signupForm.value.email, this.signupForm.value.password).subscribe({
            next: (resLogin: any) => {
              console.log('Logged in with token:', resLogin);
              this.authService.setToken(resLogin.token);
              this.userService.setUserFromDecodedToken(resLogin.token);
            },
            error: (error: any) => {
              console.error('All aboard the failboat! There has been a login error.', error);
            },
          });
        },
        error: (error: any) => {
          console.error('All aboard the failboat! There has been a login error.', error);
        },
      });
    }
  }

  passwordMatchValidator:ValidatorFn = (control: AbstractControl): null | { passwordMismatch: boolean } => {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');

    return password && passwordConfirm && password.value !== passwordConfirm.value ? { passwordMismatch: true } : null;
  }

    // DEBUG METHOD
    manuallyNavigateAway() {
      let id = this.userService.getUserId();
      this.router.navigate([`/user/${id}/trays`]);
    }
}

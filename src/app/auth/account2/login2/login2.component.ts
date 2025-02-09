import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-auth-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss']
})
export class Login2Component implements OnInit {

  loginForm2!: UntypedFormGroup;
  formSubmitted: boolean = false;
  loading: boolean = false;
  returnUrl: string = '/';
  error: string = '';
  showPassword: boolean = false;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private fb: UntypedFormBuilder) { }


  ngOnInit(): void {
    this.loginForm2 = this.fb.group({
      email: ['farrell@example.com', [Validators.required, Validators.email]],
      password: ['MFA@123', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard-1';
  }

  /**
   * convenience getter for easy access to form fields
   */
  get formValues() { return this.loginForm2.controls; }


  /**
   * On submit form
   */
  onSubmit(): void {
    console.log('onSubmit');

    this.formSubmitted = true;
    console.log('onSubmit');
    if (this.loginForm2.valid) {
      this.loading = true;
      this.authenticationService.login(this.formValues.email?.value, this.formValues.password?.value)
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.router.navigate(['/admin/dashboard']);
            console.log(data);
          },
          (error: any) => {
            this.error = error;
            this.loading = false;
          });
    }
  }

}

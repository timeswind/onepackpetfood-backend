import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import * as AuthActions from '../../actions/auth.action'
import { first } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Router } from '@angular/router';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        console.log(this.registerForm)
        this.authenticationService.signup(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.login(data)
                },
                error => {
                    // this.loading = false;
                });
    }

    private login(data): void {
        this.store.dispatch(new AuthActions.UserLogin({
            name: data.name,
            email: data.email || "",
            role: data.role || 0,
            avatar: data.avatar || "",
            token: data.token,
            isLogin: true,
            redirectUrl: ""
        }))
        if (data.role === 100) {
            this.router.navigate(['/tagtrace'])
        } else {
            this.router.navigate(['/my_store'])
        }
    }
}
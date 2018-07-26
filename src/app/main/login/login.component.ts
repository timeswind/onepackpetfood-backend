import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { first } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectAuthIsLogin } from '../../reducers/auth.reducer';
import * as AuthActions from '../../actions/auth.action'

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    token: any;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private store: Store<AppState>
    ) {
        this.route.queryParams.subscribe(params => {
            //处理微信登入
            if (!!params["name"] && !!params["role"] && !!params["avatar"] && !!params["token"]) {
                localStorage.setItem('currentUser', JSON.stringify({ token: params["token"], avatar: params["avatar"], name: params["name"], role: params["role"] }));
                let data = {
                    name: params["name"],
                    email: "",
                    role: parseInt(params["role"]) || 0,
                    avatar: params["avatar"] || "",
                    token: params["token"],
                    isLogin: true,
                    redirectUrl: ""
                }
                if (params["state"]) {
                    localStorage.setItem("wx_state", params["state"])
                }
                this.login(data)
            }
        });
    }

    ngOnInit() {
        console.log('ngOnInit')
        this.store.pipe(select(selectAuthIsLogin)).subscribe(data => {
            console.log(data)
        })

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

        // console.log(this.registerForm)
        this.authenticationService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.login(data);
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
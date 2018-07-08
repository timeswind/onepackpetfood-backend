import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { AuthenticationService } from '../../services/authentication.service';
import { AppState } from '../../app.state';
import { first } from 'rxjs/operators';
import { navigationForAdmin, navigationForShopOwnerUser } from 'app/navigation/navigation';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
// import { locale as english } from './i18n/en';
// import { locale as turkish } from './i18n/tr';

@Component({
    selector   : 'login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
 
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private appState: AppState,
        private fuseNavigationService: FuseNavigationService
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

        // console.log(this.registerForm)
        this.authenticationService.login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                console.log(data)
                this.appState.email = data.email;
                this.appState.token = data.token;
                this.appState.islogin = true;
                this.appState.role = data.role;
                this.appState.setName(data.name || "")
                if (data.role === 100) {
                    this.router.navigate(['/tagtrace']);
                } else {
                    console.error('need to fix')
                    alert('see console')
                }
                this.reloadNavigation();
            },
            error => {
                // this.loading = false;
            });
     }

     private reloadNavigation():void {
        let navigation:any;

        if (this.appState.role === 100) {
            navigation = navigationForAdmin;
        } else {
            navigation = navigationForShopOwnerUser;
        }
        // Get default navigation

        // Register the navigation to the service
        this.fuseNavigationService.unregister('main')
        this.fuseNavigationService.register('main', navigation)

        // Set the main navigation as our current navigation
        this.fuseNavigationService.setCurrentNavigation('main');
     }
}
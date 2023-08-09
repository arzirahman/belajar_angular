import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { ResponseType } from 'src/app/utils/response-types';
import { LoginDataType, LoginErrorType } from 'src/app/utils/auth-types';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    email: string = "";
    password: string = "";
    emailError?: string = "";
    passwordError?: string = "";
    messageError?: string = "";

    constructor(
        private title: Title,
        private authService: AuthService,
        private router: Router
    ) {
        title.setTitle('Login');
    }

    clearEmailError() {
        this.emailError = "";
    }

    clearPasswordError() {
        this.passwordError = "";
    }

    login(e: Event) {
        e.preventDefault();
        this.messageError = "";
        this.authService.login({
            email: this.email,
            password: this.password
        }).subscribe(
            (response: ResponseType<LoginDataType, LoginErrorType>) => {
                if (response.code === 200) {
                    this.router.navigate(["/"])
                }
            },
            (error: ResponseType<LoginDataType, LoginErrorType>) => {
                if (error.errors?.message) this.messageError = error.errors?.message;
                if (error.errors?.email) this.emailError = error.errors.email;
                if (error.errors?.password) this.passwordError = error.errors.password;
            }
        )
    }
}
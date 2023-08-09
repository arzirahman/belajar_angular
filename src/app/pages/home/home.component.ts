import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ResponseType } from 'src/app/utils/response-types';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(
        private title: Title,
        private authService: AuthService,
        private router: Router
    ) {
        title.setTitle('Home');
    }

    logout() {
        this.authService.logout()
            .subscribe(
                (response: ResponseType<any, any>) => {
                    if (response.code === 200) this.router.navigate(["/login"]);
                },
                (error: ResponseType<any, any>) => {
                    console.log(error);
                }
            )
    }
}
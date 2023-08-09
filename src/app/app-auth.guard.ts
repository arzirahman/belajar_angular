import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Injectable({
    providedIn: 'root'
})
export class Auth implements CanActivate {
    accessToken: string = "";

    constructor(private authService: AuthService, private router: Router, private sharedDataService: SharedDataService) { }

    ngOnInit(): void {
        this.sharedDataService.accessToken.subscribe(accessToken => {
            this.accessToken = accessToken;
        });
    }

    canActivate(): Observable<boolean> {
        if (this.accessToken) return of(true);
        else return this.authService.refreshToken().pipe(
            map(response => {
                const isLoggedIn = response.code === 200;
                if (!isLoggedIn) {
                    this.router.navigate(['/login']);
                }
                return isLoggedIn;
            }),
            catchError(() => {
                this.router.navigate(['/login']);
                return [false];
            })
        );
    }
}

@Injectable({
    providedIn: 'root'
})
export class NoAuth implements CanActivate {
    accessToken: string = "";

    constructor(private authService: AuthService, private router: Router, private sharedDataService: SharedDataService) { }

    ngOnInit(): void {
        this.sharedDataService.accessToken.subscribe(accessToken => {
            this.accessToken = accessToken;
        });
    }

    canActivate(): Observable<boolean> {
        if (this.accessToken) return of(true);
        else return this.authService.refreshToken().pipe(
            map(response => {
                const isLoggedIn = response.code === 200;
                if (isLoggedIn) {
                    this.router.navigate(['/']);
                }
                return !isLoggedIn;
            }),
            catchError(() => {
                return [true];
            })
        );
    }
}
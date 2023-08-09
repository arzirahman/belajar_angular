import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { baseUrl } from '../utils/constant';
import { ResponseType } from '../utils/response-types';
import { LoginType, LoginDataType, LoginErrorType } from '../utils/auth-types';
import { SharedDataService } from './shared-data.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loginPath: string = `${baseUrl}/auth/login`;
    private refreshTokenPath: string = `${baseUrl}/auth/refresh-token`;
    private logoutPath: string = `${baseUrl}/auth/logout`;

    constructor(private http: HttpClient, private sharedDataService: SharedDataService) { }

    refreshToken(): Observable<ResponseType<LoginDataType, LoginErrorType>> {
        this.sharedDataService.startLoading();
        return this.http.get(this.refreshTokenPath, { withCredentials: true })
            .pipe(
                map((response: any) => {
                    this.sharedDataService.stopLoading();
                    const responseData: ResponseType<LoginDataType, LoginErrorType> = {
                        code: response.code,
                        status: response.status,
                        message: response.message
                    };
                    if (responseData.code === 200) {
                        this.sharedDataService.setAccessToken(responseData.message?.data?.accessToken || '');
                    } else {
                        this.sharedDataService.setAccessToken("");
                    }
                    return responseData;
                }),
                catchError((error: HttpErrorResponse) => {
                    this.sharedDataService.stopLoading();
                    this.sharedDataService.setAccessToken("")
                    const errorResponse: ResponseType<LoginDataType, LoginErrorType> = {
                        code: error.error.code,
                        status: error.error.status,
                        errors: error.error.errors || { message: "Can't connect to the server" }
                    };
                    return throwError(errorResponse);
                })
            );
    }

    login(input: LoginType): Observable<ResponseType<LoginDataType, LoginErrorType>> {
        this.sharedDataService.startLoading();
        return this.http.post(this.loginPath, input, { withCredentials: true })
            .pipe(
                map((response: any) => {
                    this.sharedDataService.stopLoading();
                    const responseData: ResponseType<LoginDataType, LoginErrorType> = {
                        code: response.code,
                        status: response.status,
                        message: response.message
                    };
                    if (responseData.code === 200) {
                        this.sharedDataService.setAccessToken(responseData.message?.data?.accessToken || '');
                    }
                    return responseData;
                }),
                catchError((error: HttpErrorResponse) => {
                    this.sharedDataService.stopLoading();
                    const errorResponse: ResponseType<LoginDataType, LoginErrorType> = {
                        code: error.error.code,
                        status: error.error.status,
                        errors: error.error.errors || { message: "Can't connect to the server" }
                    };
                    return throwError(errorResponse);
                })
            );
    }

    logout(): Observable<ResponseType<any, any>> {
        this.sharedDataService.startLoading();
        return this.http.post(this.logoutPath, {}, { withCredentials: true })
            .pipe(
                map((response: any) => {
                    this.sharedDataService.stopLoading();
                    const responseData: ResponseType<any, any> = {
                        code: response.code,
                        status: response.status,
                        message: response.message
                    };
                    return responseData;
                }),
                catchError((error: HttpErrorResponse) => {
                    this.sharedDataService.stopLoading();
                    const errorResponse: ResponseType<any, any> = {
                        code: error.error.code,
                        status: error.error.status,
                        errors: error.error.errors || { message: "Can't connect to the server" }
                    };
                    return throwError(errorResponse);
                })
            );
    }
}
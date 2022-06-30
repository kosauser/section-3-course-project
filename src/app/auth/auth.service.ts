import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Subject, tap, throwError } from "rxjs";
import { Useer as User } from "./user.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new Subject<User>();

    constructor(private http: HttpClient) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResposeData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBgOhvKLjQyl42mrtxsiXJGbZnOaZd4YWc', {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), 
            tap(resData => {
                this.handleAuthentication(
                    resData.email, 
                    resData.localId, 
                    resData.idToken, 
                    +resData.expiresIn);
            })
        );
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email, 
            userId, 
            token, 
            expirationDate);
        this.user.next(user);
    }

    login(email:string, password: string) {
        return this.http.post<AuthResposeData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBgOhvKLjQyl42mrtxsiXJGbZnOaZd4YWc', {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), 
            tap(resData => {
                this.handleAuthentication(
                    resData.email, 
                    resData.localId, 
                    resData.idToken, 
                    +resData.expiresIn);
            })
        );
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An error occured!';
        if (!errorRes.error || !errorRes.error.error) {
            console.log(errorRes);
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "The email address is already in use by another account.";
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = "Password sign-in is disabled for this project.";
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "There is no user record corresponding to this identifier. The user may have been deleted.";
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "The password is invalid or the user does not have a password.";
                break;
            case 'USER_DISABLED':
                errorMessage = " The user account has been disabled by an administrator.";
                break;
        }
        return throwError(errorMessage);
    }
}

export interface AuthResposeData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private _loading = new BehaviorSubject<boolean>(false);
  private _accessToken = new BehaviorSubject<string>("");

  constructor() { }

  get loading(): BehaviorSubject<boolean> {
    return this._loading;
  }

  get accessToken(): BehaviorSubject<string> {
    return this._accessToken;
  }

  startLoading() {
    this._loading.next(true);
  }

  stopLoading() {
    this._loading.next(false);
  }

  setAccessToken(accessToken: string) {
    this._accessToken.next(accessToken);
  }
}

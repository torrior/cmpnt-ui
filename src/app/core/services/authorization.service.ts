import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { User } from '@app/dto/users';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthorizationService {
  private readonly authenticationUrl = `${environment.apiUrl}/api/authorization`;

  constructor(private http: HttpClient, private storage: TokenStorageService) {}

  logout(): Observable<unknown> {
    return of(
      this.http
        .post<User[]>(`${this.authenticationUrl}/logout`, {})
        .subscribe(() => this.storage.removeUser())
    );
  }

  logon(): Observable<User> {
    return this.http.post<User>(`${this.authenticationUrl}/logon`, {});
  }
}

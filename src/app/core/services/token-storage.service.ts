import { Injectable } from '@angular/core';
import { User } from '@app/dto/users';

const USER_KEY = 'user';
const TOKEN_KEY = 'auth-token';
const LANG_KEY = 'lang';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  getUser(): User {
    const user = JSON.parse(localStorage.getItem(USER_KEY) || '{}') as User;
    return user;
  }

  setUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  removeUser(): void {
    localStorage.removeItem(USER_KEY);
  }

  getUserToken(): string {
    const token = JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}') as string;
    return token;
  }

  setUserToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  }

  removeUserToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  getUserLocale(): string {
    const lang = JSON.parse(localStorage.getItem(LANG_KEY) || '{}') as string;
    return lang;
  }

  setUserLocale(lang: string): void {
    localStorage.setItem(LANG_KEY, JSON.stringify(lang));
  }

  getCookies(name: string): string {
    const value = JSON.parse(localStorage.getItem(name) || '{}') as string;
    return value;
  }

  setCookies(name: string, value: unknown): void {
    localStorage.setItem(name, JSON.stringify(value));
  }

  removeCookies(name: string): void {
    localStorage.removeItem(name);
  }
}

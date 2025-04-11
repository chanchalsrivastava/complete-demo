import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly mockUser = { username: 'user', password: '1234' };

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === this.mockUser.username && password === this.mockUser.password) {
      localStorage.setItem('user', JSON.stringify(this.mockUser));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}

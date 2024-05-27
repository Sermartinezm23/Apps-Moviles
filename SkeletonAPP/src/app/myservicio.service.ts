import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyServicioService {
  private username: string | null = null;

  constructor() {}

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string | null {
    return this.username;
  }
}


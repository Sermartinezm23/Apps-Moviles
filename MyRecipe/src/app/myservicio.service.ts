import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MyServicioService {
  private _storage: Storage | null = null;
  private usersKey: string = 'users';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async addUser(user: Omit<User, 'id'>) {
    const users: User[] = await this._storage?.get(this.usersKey) || [];
    const newUser: User = { id: new Date().getTime(), ...user };
    users.push(newUser);
    return this._storage?.set(this.usersKey, users);
  }

  async getUser(username: string, password: string): Promise<User | undefined> {
    const users: User[] = await this._storage?.get(this.usersKey) || [];
    return users.find((user: User) => user.username === username && user.password === password);
  }

  async saverecipe(recipe: any[]) {
    await this._storage?.set('recipes', recipe);
  }

  async getrecipe(): Promise<any[]> {
    return await this._storage?.get('recipes') ?? [];
  }

  async addrecipe(newrecipe: any) {
    const recipe = await this.getrecipe();
    recipe.push(newrecipe);
    await this.saverecipe(recipe);
  }
}
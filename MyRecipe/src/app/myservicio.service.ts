import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class MyServicioService {
  private _storage: Storage | null = null;
  private usernameKey: string = 'username';
  private recipeKey: string = 'recipe';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  setUsername(username: string) {
    this._storage?.set(this.usernameKey, username);
  }

  async getUsername(): Promise<string | null> {
    return await this._storage?.get(this.usernameKey) ?? null;
  }

  async saverecipe(recipe: any[]) {
    await this._storage?.set(this.recipeKey, recipe);
  }

  async getrecipe(): Promise<any[]> {
    return await this._storage?.get(this.recipeKey) ?? [];
  }

  async addrecipe(newrecipe: any) {
    const recipe = await this.getrecipe();
    recipe.push(newrecipe);
    await this.saverecipe(recipe);
  }
}



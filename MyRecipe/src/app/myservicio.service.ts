import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  username: string;
  password: string;
}

interface Recipe {
  id: number;
  userId: number;
  name: string;
  ingredients: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MyServicioService {
  private _storage: Storage | null = null;
  private userKey: string = 'users';
  private recipeKey: string = 'recipes';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async addUser(user: Omit<User, 'id'>) {
    const users = await this.getUsers();
    const newUser: User = {
      ...user,
      id: new Date().getTime()
    };
    users.push(newUser);
    await this._storage?.set(this.userKey, users);
  }

  async getUsers(): Promise<User[]> {
    return await this._storage?.get(this.userKey) ?? [];
  }

  async getUser(username: string, password: string): Promise<User | null> {
    const users = await this.getUsers();
    return users.find(user => user.username === username && user.password === password) || null;
  }

  async addRecipe(userId: number, recipe: Omit<Recipe, 'id' | 'userId'>) {
    const recipes = await this.getRecipes();
    const newRecipe: Recipe = {
      ...recipe,
      id: new Date().getTime(),
      userId
    };
    recipes.push(newRecipe);
    await this._storage?.set(this.recipeKey, recipes);
  }

  async getRecipes(): Promise<Recipe[]> {
    return await this._storage?.get(this.recipeKey) ?? [];
  }

  async getRecipesByUser(userId: number): Promise<Recipe[]> {
    const recipes = await this.getRecipes();
    return recipes.filter(recipe => recipe.userId === userId);
  }

  async saveRecipes(recipes: Recipe[]) {
    await this._storage?.set(this.recipeKey, recipes);
  }

  async setLoggedInUser(username: string, password: string) {
    await this._storage?.set('loggedInUsername', username);
    await this._storage?.set('loggedInPassword', password);
  }

  async updateUser(updatedUser: User) {
    const users = await this.getUsers();
    const userIndex = users.findIndex(user => user.id === updatedUser.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      await this._storage?.set(this.userKey, users);
    }
  }

  async logout() {
    await this._storage?.remove('loggedInUsername');
    await this._storage?.remove('loggedInPassword');
  }

  async getUserFromSession() {
    const username = await this._storage?.get('loggedInUsername');
    const password = await this._storage?.get('loggedInPassword');
    return this.getUser(username, password);
  }
}
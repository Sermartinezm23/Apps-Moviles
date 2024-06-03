import { Component } from '@angular/core';

@Component({
  selector: 'app-mis-recetas',
  templateUrl: './mis-recetas.page.html',
  styleUrls: ['./mis-recetas.page.scss'],
})
export class MisRecetasPage {
  recipes: any[] = [];

  constructor() {}

  ionViewWillEnter() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);

    localStorage.setItem('recipes', JSON.stringify(this.recipes));
  }
}
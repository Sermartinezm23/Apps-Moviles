import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.page.html',
  styleUrls: ['./crear-receta.page.scss'],
})
export class CrearRecetaPage {
  recipeName: string = '';
  ingredients: string[] = new Array(15).fill('');

  constructor(private navCtrl: NavController) {}

  createRecipe() {
    let recipes = JSON.parse(localStorage.getItem('recipes') || '[]');

    const newRecipe = {
      name: this.recipeName,
      ingredients: this.ingredients.filter(ingredient => ingredient.trim() !== '')
    };

    recipes.push(newRecipe);

    localStorage.setItem('recipes', JSON.stringify(recipes));

    this.recipeName = '';
    this.ingredients = new Array(15).fill('');

    this.navCtrl.navigateRoot('/tabs/mis-recetas');
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
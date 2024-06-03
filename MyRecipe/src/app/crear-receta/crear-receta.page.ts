import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MyServicioService } from '../myservicio.service';

@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.page.html',
  styleUrls: ['./crear-receta.page.scss'],
})
export class CrearRecetaPage {
  recipeName: string = '';
  ingredients: string[] = new Array(15).fill('');

  constructor(private navCtrl: NavController, private myServicio: MyServicioService) {}

  async createRecipe() {
    const newRecipe = {
      name: this.recipeName,
      ingredients: this.ingredients.filter(ingredient => ingredient.trim() !== '')
    };

    await this.myServicio.addrecipe(newRecipe);

    this.recipeName = '';
    this.ingredients = new Array(15).fill('');

    this.navCtrl.navigateRoot('/tabs/mis-recetas');
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
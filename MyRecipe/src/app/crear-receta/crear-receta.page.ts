import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MyServicioService } from '../myservicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.page.html',
  styleUrls: ['./crear-receta.page.scss'],
})
export class CrearRecetaPage {
  recipeName: string = '';
  ingredients: string[] = new Array(15).fill('');

  constructor(private navCtrl: NavController, private myServicio: MyServicioService, private router: Router) {}

  async createRecipe() {
    const user = await this.myServicio.getUserFromSession();

    if (!user) {
      console.log('No se encontró al usuario');
      this.router.navigate(['/login']);
      return;
    }

    const newRecipe = {
      name: this.recipeName,
      ingredients: this.ingredients.filter(ingredient => ingredient.trim() !== '')
    };

    await this.myServicio.addRecipe(user.id, newRecipe);

    this.recipeName = '';
    this.ingredients = new Array(15).fill('');

    this.navCtrl.navigateRoot('/tabs/mis-recetas');
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
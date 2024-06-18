import { Component, OnInit } from '@angular/core';
import { MyServicioService } from '../myservicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-recetas',
  templateUrl: './mis-recetas.page.html',
  styleUrls: ['./mis-recetas.page.scss'],
})
export class MisRecetasPage implements OnInit {
  recipes: any[] = [];

  constructor(private myServicio: MyServicioService, private router: Router) {}

  async ngOnInit() {
    await this.loadRecipes();
  }

  async ionViewWillEnter() {
    await this.loadRecipes();
  }

  async loadRecipes() {
    const user = await this.myServicio.getUserFromSession();

    if (!user) {
      console.log('No se encontró al usuario');
      this.router.navigate(['/login']);
      return;
    }

    this.recipes = await this.myServicio.getRecipesByUser(user.id);
  }

  async deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    await this.myServicio.saveRecipes(this.recipes);
  }
}
import { Component, OnInit } from '@angular/core';
import { MyServicioService } from '../myservicio.service';

@Component({
  selector: 'app-mis-recetas',
  templateUrl: './mis-recetas.page.html',
  styleUrls: ['./mis-recetas.page.scss'],
})
export class MisRecetasPage implements OnInit {
  recipes: any[] = [];

  constructor(private myServicio: MyServicioService) {}

  async ngOnInit() {
    await this.loadRecipes();
  }

  async ionViewWillEnter() {
    await this.loadRecipes();
  }

  async loadRecipes() {
    this.recipes = await this.myServicio.getrecipe();
  }

  async deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    await this.myServicio.saverecipe(this.recipes);
  }
}

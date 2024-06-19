import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.page.html',
  styleUrls: ['./recomendaciones.page.scss'],
})
export class RecomendacionesPage implements OnInit {
  meals: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getMeals().subscribe(data => {
      this.meals = data.meals;
    });
  }
}
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

interface Api {
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strSource: string;
}

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve meals from the API via GET', () => {
    const mockMeals: { meals: Api[] } = {
      meals: [
        {
          strMeal: 'Apple Frangipan Tart',
          strCategory: 'Dessert',
          strArea: 'British',
          strInstructions: 'Preheat the oven to 200C/180C Fan/Gas 6.',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
          strTags: 'Tart,Baking,Fruity',
          strYoutube: 'https://www.youtube.com/watch?v=rp8Slv4INLk',
          strIngredient1: 'Butter',
          strIngredient2: 'Sugar',
          strIngredient3: 'Eggs',
          strIngredient4: 'Ground Almonds',
          strIngredient5: 'Flour',
          strIngredient6: '',
          strIngredient7: '',
          strIngredient8: '',
          strIngredient9: '',
          strIngredient10: '',
          strIngredient11: '',
          strIngredient12: '',
          strIngredient13: '',
          strMeasure1: '100g',
          strMeasure2: '100g',
          strMeasure3: '2',
          strMeasure4: '100g',
          strMeasure5: '200g',
          strMeasure6: '',
          strMeasure7: '',
          strMeasure8: '',
          strMeasure9: '',
          strMeasure10: '',
          strMeasure11: '',
          strMeasure12: '',
          strMeasure13: '',
          strSource: ''
        }
      ]
    };

    service.getMeals().subscribe(meals => {
      expect(meals).toEqual(mockMeals);
    });

    const req = httpTestingController.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockMeals);
  });
});
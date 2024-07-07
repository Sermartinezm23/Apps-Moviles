import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RecomendacionesPage } from './recomendaciones.page';
import { ApiService } from '../api.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RecomendacionesPage', () => {
  let component: RecomendacionesPage;
  let fixture: ComponentFixture<RecomendacionesPage>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(waitForAsync(() => {
    const spyApiService = jasmine.createSpyObj('ApiService', ['getMeals']);

    TestBed.configureTestingModule({
      declarations: [RecomendacionesPage],
      providers: [
        { provide: ApiService, useValue: spyApiService }
      ],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load meals on ngOnInit', () => {
    const mockMeals = [
      {
        strMeal: 'Meal 1',
        strCategory: 'Category 1',
        strArea: 'Area 1',
        strInstructions: 'Instructions 1',
        strMealThumb: 'Thumb 1',
        strTags: 'Tags 1',
        strYoutube: 'Youtube 1',
        strIngredient1: 'Ingredient 1',
        strIngredient2: 'Ingredient 2',
        strIngredient3: 'Ingredient 3',
        strIngredient4: 'Ingredient 4',
        strIngredient5: 'Ingredient 5',
        strIngredient6: 'Ingredient 6',
        strIngredient7: 'Ingredient 7',
        strIngredient8: 'Ingredient 8',
        strIngredient9: 'Ingredient 9',
        strIngredient10: 'Ingredient 10',
        strIngredient11: 'Ingredient 11',
        strIngredient12: 'Ingredient 12',
        strIngredient13: 'Ingredient 13',
        strMeasure1: 'Measure 1',
        strMeasure2: 'Measure 2',
        strMeasure3: 'Measure 3',
        strMeasure4: 'Measure 4',
        strMeasure5: 'Measure 5',
        strMeasure6: 'Measure 6',
        strMeasure7: 'Measure 7',
        strMeasure8: 'Measure 8',
        strMeasure9: 'Measure 9',
        strMeasure10: 'Measure 10',
        strMeasure11: 'Measure 11',
        strMeasure12: 'Measure 12',
        strMeasure13: 'Measure 13',
        strSource: 'Source 1'
      }
    ];

    apiServiceSpy.getMeals.and.returnValue(of({ meals: mockMeals }));

    component.ngOnInit();

    expect(apiServiceSpy.getMeals).toHaveBeenCalled();
    expect(component.meals).toEqual(mockMeals);
  });
});
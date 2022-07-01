import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private recipeService: RecipeService, private http: HttpClient, private authService: AuthService) { }

    storeRecipes() {
        const recipes: Recipe[] = this.recipeService.getRecipes();
        this.http.put(
            'https://ng-course-recipe-book-c1595-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
            recipes)
            .subscribe(response => {
                console.log(response);

            });
    }

    fetchRecipes() {
        // take(1) take only once value (on demand) of this variable and automaticly unsubscribe
        // exhaustMap waits for the first observable - user to complete, after that it gives user and then created secons observable from the exhautMap and returns it

        return this.http.get<Recipe[]>(
            'https://ng-course-recipe-book-c1595-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
        ).pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                });
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            }));
    }
}
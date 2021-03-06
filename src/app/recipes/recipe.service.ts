import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        // new Recipe(
        //     "A Test Recipe",
        //     "This is simply a test",
        //     "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg",
        //     [
        //         new Ingredient('Meat', 1),
        //         new Ingredient('French Frites', 20)
        //     ]),
        // new Recipe(
        //     "A Second Recipe",
        //     "This is simply a second test",
        //     "https://upload.wikimedia.org/wikipedia/commons/e/e9/Moroccan_Fish_Recipe.jpg",
        //     [
        //         new Ingredient('Buns', 2),
        //         new Ingredient('Meat', 1)
        //     ])
    ];

    constructor(private slService: ShoppingListService) { }

    getRecipes(): Recipe[] {
        return this.recipes.slice(); // return a copy of this array
    }
    
    getRecipe(index: number): Recipe {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]): void {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.getRecipes());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.getRecipes());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.getRecipes());
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.getRecipes());
    }
}
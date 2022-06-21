import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient("Apples", 5),
        new Ingredient("Tomatoes", 10)
      ];

    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.getIngredients());
    }

    addIngredients(ingredients: Ingredient[]): void {
        // ingredients.forEach(
        //   (ingredient) => {
        //     this.ingredients.push(ingredient);
        // });
        this.ingredients.push(...ingredients); // spread ingredients array to multiple elemtent
        this.ingredientsChanged.emit(this.getIngredients());
      }
}
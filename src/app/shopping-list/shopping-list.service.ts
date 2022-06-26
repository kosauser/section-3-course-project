import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient("Apples", 5),
        new Ingredient("Tomatoes", 10)
    ];

    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    getIngredient(index: number): Ingredient {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.getIngredients());
    }

    addIngredients(ingredients: Ingredient[]): void {
        // ingredients.forEach(
        //   (ingredient) => {
        //     this.ingredients.push(ingredient);
        // });
        this.ingredients.push(...ingredients); // spread ingredients array to multiple elemtent
        this.ingredientsChanged.next(this.getIngredients());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.getIngredients());
    }

    deleteIngredient(index: number): void {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.getIngredients());
    }
}
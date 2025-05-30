import db from "#db/client";
import { createRecipe } from "./queries/recipes.js";
import { createIngredient } from "./queries/ingredients.js";

async function seed() {
  try {
    await db.connect();

    const recipe1 = await createRecipe({ title: "Lasagna", instructions: "Cook noodles. Layer cheese, noodles, and sauce in a dish. Bake. Top with garnish.", prep_time: 60});
    const recipe2 = await createRecipe({ title: "Pizza", instructions: "Make dough. Roll out into a circle. Top with sauce and cheese. Add toppings. Bake.", prep_time: 20 });
    const recipe3 = await createRecipe({ title: "Cannoli", instructions: "Make dough. Fry dough. Insert ricotta into fried dough. Add toppings.", prep_time: 45 });

    await Promise.all([
      createIngredient({ name: "Noodles", quantity: 10, recipe_id: recipe1.id }),
      createIngredient({ name: "Tomatoes", quantity: 20, recipe_id: recipe1.id }),
      createIngredient({ name: "Seasonings", quantity: 5, recipe_id: recipe1.id }),
      createIngredient({ name: "Ricotta", quantity: 3, recipe_id: recipe1.id }),
      createIngredient({ name: "Parmesan", quantity: 2, recipe_id: recipe1.id }),

      createIngredient({ name: "Flour", quantity: 6, recipe_id: recipe2.id }),
      createIngredient({ name: "Egg", quantity: 1, recipe_id: recipe2.id }),
      createIngredient({ name: "Pizza Sauce", quantity: 4, recipe_id: recipe2.id }),
      createIngredient({ name: "Mozzarella", quantity: 5, recipe_id: recipe2.id }),
      createIngredient({ name: "Pepperoni", quantity: 8, recipe_id: recipe2.id }),

      createIngredient({ name: "Flour", quantity: 4, recipe_id: recipe3.id }),
      createIngredient({ name: "Water", quantity: 1, recipe_id: recipe3.id }),
      createIngredient({ name: "Ricotta", quantity: 6, recipe_id: recipe3.id }),
      createIngredient({ name: "Sugar", quantity: 5, recipe_id: recipe3.id }),
      createIngredient({ name: "Pistachios", quantity: 2, recipe_id: recipe3.id }),
    ]);

    console.log("🌱 Database seeded.");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await db.end();
  }
}

seed();
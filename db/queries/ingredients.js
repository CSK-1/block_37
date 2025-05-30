import db from "#db/client";

export async function createIngredient({ name, quantity, recipe_id }) {
    const sql = `
        INSERT INTO ingredients (name, quantity, recipe_id)
        VALUES ($1, $2, $3)
        RETURNING *;`;
    const { rows: ingredient } = await db.query(sql, [
        name,
        quantity,
        recipe_id,
    ]);
    return ingredient[0];
}

export async function getIngredients() {
    const sql = `
        SELECT * FROM ingredients`;
    const { rows: ingredients } = await db.query(sql);
    return ingredients;
}

export async function getIngredient(id) {
    const sql = `
      SELECT * FROM ingredients WHERE id = $1;
      `;
    const { rows: ingredient } = await db.query(sql, [id]);
    return ingredient[0];
}

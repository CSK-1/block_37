import db from "#db/client";

export async function createRecipe({ title, instructions, prep_time }) {
	const sql = `
        INSERT INTO recipes (title, instructions, prep_time)
        VALUES ($1, $2, $3)
        RETURNING *;`;
	const { rows: recipe } = await db.query(sql, [
		title,
		instructions,
		prep_time,
	]);
	return recipe[0];
}

export async function getRecipes() {
	const sql = `
  SELECT * FROM recipes`;
	const { rows: recipes } = await db.query(sql);
	return recipes;
}

export async function getRecipe(id) {
	const sql = `
      SELECT * FROM recipes WHERE id = $1;
      `;
	const { rows: recipe } = await db.query(sql, [id]);
	return recipe[0];
}

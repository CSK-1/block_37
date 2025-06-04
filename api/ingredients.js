import express from "express";
import { getIngredients, getIngredient } from "../db/queries/ingredients.js";
const router = express.Router();
export default router;
router.use(express.json())

function isValidId(id) {
  const num = Number(id);
  return Number.isInteger(num) && num > 0;
}

router.get("/", async (req, res) => {
	const ingredients = await getIngredients();
	res.send(ingredients);
});

router.get("/:id", async (req, res) => {
	const id = Number(req.params.id);

	if (!isValidId(id)) {
		return res.status(400).send({ error: "ID must be a positive integer" });
	}

	const ingredient = await getIngredient(id);
	if (!ingredient) {
		return res.status(404).send({ error: "Ingredient not found" });
	}

	res.send(ingredient);
});
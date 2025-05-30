import express from "express";
import { getIngredients } from "#db/queries/ingredients";
const router = express.Router();
export default router;

function isValidId(id) {
  const num = Number(id);
  return Number.isInteger(num) && num > 0;
}

router.get("/", async (req, res) => {
	const ingredients = await getIngredients();
	res.send(ingredients);
});
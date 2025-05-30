import express from "express";
import { getRecipes } from "#db/queries/recipes";
const router = express.Router();
export default router;

function isValidId(id) {
  const num = Number(id);
  return Number.isInteger(num) && num > 0;
}

router.get("/", async (req, res) => {
    const recipes = await getRecipes();
    res.send(recipes);
});
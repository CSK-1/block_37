import express from "express";
import { getRecipes, getRecipe } from "../db/queries/recipes.js";
import { createRecipe, deleteRecipe, updateRecipe } from "../db/queries/recipes.js";
const router = express.Router();
router.use(express.json())


function isValidId(id) {
	const num = Number(id);
	return Number.isInteger(num) && num > 0;
}

router.get("/", async (req, res) => {
	const recipes = await getRecipes();
	res.send(recipes);
});

router.get("/:id", async (req, res) => {
	const id = Number(req.params.id);

	if (!isValidId(id)) {
		return res.status(400).send({ error: "ID must be a positive integer" });
	}

	const recipe = await getRecipe(id);
	if (!recipe) {
		return res.status(404).send({ error: "Recipe not found" });
	}

	res.send(recipe);
});

router.post("/", async (req, res) => {
	if (!req.body) {
		return res.status(400).send({ error: "Missing body" });
	}

	const { title, instructions, prep_time } = req.body;

	if (!title || !instructions || prep_time == null) {
		return res.status(400).send({ error: "Missing required fields" });
	}

	const newRecipe = await createRecipe({
		title,
		instructions,
		prep_time,
	});

	res.status(201).send(newRecipe);
});

router.delete("/:id", async (req, res) => {
	const id = Number(req.params.id);

	if (!isValidId(id)) {
		return res.status(400).send({ error: "ID must be a positive integer" });
	}

	const deletedRecipe = await deleteRecipe(id);

	if (!deletedRecipe) {
		return res.status(404).send({ error: "Recipe not found" });
	}

	res.sendStatus(204);
});

router.put("/:id", async (req, res) => {
	const id = Number(req.params.id);

	if (!isValidId(id)) {
		return res.status(400).send({ error: "ID must be a positive integer" });
	}

	if (!req.body || Object.keys(req.body).length === 0) {
		return res.status(400).send({ error: "Missing body" });
	}

	const { title, instructions, prep_time } = req.body;

	if (!title || !instructions || prep_time === undefined) {
		return res.status(400).send({ error: "Missing required fields" });
	}

	const recipe = await getRecipe(id);
	if (!recipe) {
		return res.status(404).send({ error: "Recipe not found" });
	}

	const updatedRecipe = await updateRecipe({
		id,
        title,
		instructions,
		prep_time
	});

	if (!updatedRecipe) {
		return res.status(404).send({ error: "Recipe not found" });
	}

	res.send(updatedRecipe);
});

export default router;

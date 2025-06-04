import db from "./db/client.js";
import express from "express";
import ingredientsRouter from "./api/ingredients.js"
import recipesRouter from "./api/recipes.js"

const app = express();
const PORT = process.env.PORT || 3000;

await db.connect();

app.use(express.json());

app.use("/ingredients", ingredientsRouter);

app.use("/recipes", recipesRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
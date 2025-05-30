import express from "express";
const app = express();
import ingredientsRouter from "./api/ingredients.js"
import recipesRouter from "./api/recipes.js"

app.use(express.json());

app.use("/ingredients", ingredientsRouter);

app.use("/recipes", recipesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});

export default app;
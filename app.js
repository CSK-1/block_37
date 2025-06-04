import express from "express";
const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});

export default app;
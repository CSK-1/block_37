DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  title TEXT UNIQUE NOT NULL,
  instructions TEXT UNIQUE NOT NULL,
  prep_time INTEGER NOT NULL
);
CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  UNIQUE (name, recipe_id)
);
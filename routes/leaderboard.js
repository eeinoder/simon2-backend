// TODO/FIX: change scheme(?) of queries to reflect structure of leaderboard table

import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

const table_name = 'leaderboard';

// Get a list of up to 50 user scores (unfiltered -> all button modes, both game modes)
router.get("/", async (req, res) => {
  let collection = await db.collection(table_name);
  let results = await collection.find({})
    .limit(50)
    .toArray();
  res.send(results).status(200);
});

// Fetches the top 20 scores (4 Button, Classic)
// TODO: review docs -> more complex queries (aggregate pipeline) 
router.get('/:gamemode-:numbuttons', async (req, res) => {
  // NOTE: possible urls include <classic-n> and <advanced-n> where 4 <= n <= 12
  var game_mode = req.params.gamemode;
  var num_buttons = parseInt(req.params.numbuttons);
  let collection = await db.collection(table_name);
  let results = await collection.aggregate([
    {$match: {$and: [{game_mode: game_mode}, {num_buttons: num_buttons}]}},
    {$sort: {score: -1}},
    {$limit: 20}
  ]).toArray();
  res.send(results).status(200);
});

// Get a single score
/*router.get("/:id", async (req, res) => {
  let collection = await db.collection(table_name);
  let query = {_id: ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});*/

// Add a new score to the collection
router.post("/", async (req, res) => {
  let collection = await db.collection(table_name);
  let newDocument = req.body;
  //newDocument.date = new Date(); // NOTE: may add date field later, for now no
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// Update the score
/*router.patch("/comment/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };
  const updates = {
    $push: { comments: req.body }
  };

  let collection = await db.collection(table_name);
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});*/

// Delete an entry
/*router.delete("/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };

  const collection = db.collection(table_name);
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});*/

export default router;
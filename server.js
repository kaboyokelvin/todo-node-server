const express = require("express");

const app = express();
// GET ==> 200 successful, PUT ==> 200, POST ==>  201, PATCH ==> 200, DELETE ==> 200
// status , >= 400 -- things have broken or failed
const todos = [];

app.get("/todos", (req, res) => {
  res.status(200).json({ todos });
});

app.post("/todos", (req, res) => {
  /**
   * {title: string}
   */
  const body = req.body;
  todos.push({ title: body.title, id: Math.random() });
  res.status(201).json({
    message: "todo added successfully",
  });
});

app.put("/todos/:id", (req, res) => {
  const params = req.params; // {id: 1, t:val}
  const id = params.id;
  const body = req.body;
  let newRecord;
  todos.map((item) => {
    let obj = { ...item };
    if (item.id === id) {
      obj.title = body.title;
      newRecord = obj;
    }
    return obj;
  });
  res.status(201).json({
    message: `todo with id ${id} has been updated`,
    newRecord,
  });
});

app.delete("/todos/:id", (req, res) => {
    const params = req.params; // {id: 1, t:val}
    const id = params.id;
    const newRecord = todos.filter((item) => item.id !== id);
    todos = newRecord;
    res.status(201).json({
      message: `todo with id ${id} has been deleted`,
      todos,
    });
  });

app.listen(4000, () => {
  console.log("server is running on port 4000");
});

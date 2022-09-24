const express = require("express");

const app = express();

app.use(express.json());

let todos = [];

// GET ==> retrieves a resource, POST ==> adds a resource, PUT ==> modifies a resource, DELETE ==> deletes a resource 

app.get("/todos", (req, res) => {
  res.status(200).json({ todos });
});

app.post("/todos", (req, res) => {
  const values = req.body;
  todos.push({ title: values.title, id: Math.random() });
  res.status(201).json({
    message: "todo added successfully",
  });
});

app.put("/todos/:id", (req, res) => {
  const params = req.params;
  const id = params.id;
  const body = req.body;
  let newRecord;
  const newResults = todos.map((item) => {
    let obj = Object.assign({}, item);
    if (item.id == id) {
      obj.title = body.title;
      newRecord = obj;
      return obj;
    }
    return obj;
  });
  todos = newResults;
  res.status(200).json({
    message: `todo with id ${id} has been updated`,
    newRecord,
  });
});

app.delete("/todos/:id", (req, res) => {
    const params = req.params;
    const id = params.id;
    let todoIndex = todos.findIndex(item => item.id == id);
    todos.splice(todoIndex, 1);
    res.status(201).json({
      message: `todo with id ${id} has been deleted`,
      todos,
    });
  });

app.listen(4000, () => {
  console.log("server is running on port 4000");
});

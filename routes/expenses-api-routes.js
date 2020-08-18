const db = require("../models");

module.exports = function(app) {
  // Get route for getting all expenses
  app.get("/api/expenses", (req, res) => {
    console.log(req.user);
    if (!req.user) {
      res.status("401").send("User is unauthenticated.");
    } else {
      db.Expenses.findAll({
        where: {
          userId: req.user.id
        }
      }).then(expenses => {
        res.json(expenses);
      });
    }
  });

  // Post route for adding expenses
  app.post("/api/expenses", (req, res) => {
    if (!req.user) {
      res.status("401").send("User is unauthenticated.");
    } else {
      db.Expenses.create(req.body).then(expenses => {
        res.json(expenses);
      });
    }
  });

  // Route for deleting user expenses
  app.delete("/api/expenses/:id", (req, res) => {
    if (!req.user) {
      res.status("401").send("User is unauthenticated.");
    } else {
      db.Expenses.destroy({
        where: {
          id: req.params.id
        }
      }).then(expenses => {
        res.json(expenses);
      });
    }
  });

  // PUT route for updating expenses
  app.put("/api/expenses", (req, res) => {
    if (!req.user) {
      res.status("401").send("User is unauthenticated.");
    } else {
      db.Expenses.update(
        {
          amount: req.body.expenseAmount,
          description: req.body.exampleFormControlInput1
        },
        {
          where: {
            id: req.body.id
          }
        }
      ).then(expenses => {
        res.json(expenses);
      });
    }
  });
};

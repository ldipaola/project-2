const db = require("../models");

module.exports = function(app) {
  // Get route for getting all expenses
  app.get("/api/expenses", (req, res) => {
    if (!req.user) {
      res.status("401").send("User is unauthenticated.");
    } else {
      db.Expenses.findAll({
        include: db.Category,
        where: {
          userId: req.user.id
        }
      }).then(expenses => {
        const userData = {
          id: req.user.id,
          email: req.user.email,
          budget: req.user.userBudget,
          expenses: [...expenses]
        };
        res.json(userData);
      });
    }
  });

  // Post route for adding expenses
  app.post("/api/expenses", (req, res) => {
    const expenses = {
      UserId: req.user.id,
      description: req.body.description,
      amount: req.body.amount,
      CategoryId: req.body.categoryId
    };
    if (!req.user) {
      res.status("401").send("User is unauthenticated.");
    } else {
      db.Expenses.create(expenses).then(expenses => {
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
          amount: req.body.amount,
          description: req.body.description
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

  app.put("/api/budget", (req, res) => {
    if (!req.user) {
      res.status("401").send("User is unauthenticated.");
    } else {
      req.session.passport.user.userBudget = req.body.userBudget;
      db.User.update(req.body, {
        where: {
          id: req.user.id
        }
      }).then(budget => {
        res.json(budget);
      });
    }
  });
};

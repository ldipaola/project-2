const db = require("../models");
// const { request } = require("chai");
// const Highcharts = require("highchart");
// // Load module after Highcharts is loaded
// require("highcharts/modules/exporting")(Highcharts);

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
    console.log(req.body);

    const expenses = {
      UserId: req.user.id,
      description: req.body.description,
      amount: req.body.amount,
      CategoryId: req.body.categoryId
    };
    console.log(expenses);
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
};

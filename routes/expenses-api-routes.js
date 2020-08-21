const db = require("../models");
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
      res.json({
        userBudget: req.user.userBudget
      });
    }
    // else {
    //   db.User.findAll({
    //     include: [
    //       {
    //         model: db.Expenses
    //       }
    //     ],
    //     where: {
    //       id: req.user.id
    //     }
    //   }).then(expenses => {
    //     res.json(expenses);
    //     // Highcharts.chart("container", { expenses });
    //   });
    // }
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
      db.Expenses.update(req.body, {
        where: {
          id: req.body.id
        }
      }).then(expenses => {
        res.json(expenses);
      });
    }
  });
};

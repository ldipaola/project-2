const db = require("../models");

module.exports = function(app) {
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

  app.post("/api/expenses", (req, res) => {
    if (!req.user) {
      res.status("401").send("User is unauthenticated.");
    } else {
      db.Expenses.create(req.body).then(expenses => {
        res.json(expenses);
      });
    }
  });
};

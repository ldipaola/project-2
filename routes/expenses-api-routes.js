const db = require("../models");

module.exports = function(app) {
  app.get("/api/expenses", (req, res) => {
    if (!req.user) {
      res.json({
        error: "Not Authenticated"
      });
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
    db.Expenses.create(req.body).then(expenses => {
      res.json(expenses);
    });
  });
};

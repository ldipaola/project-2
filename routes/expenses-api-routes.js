const db = require("../models");

module.exports = function(app) {
  app.get("api/expenses", (req, res) => {
    const query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    db.Expenses.findAll({
      where: {
        id: query,
        include: [db.User]
      }
    }).then(expenses => {
      res.json(expenses);
    });
  });
};

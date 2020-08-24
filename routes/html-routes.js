// Requiring path to so we can use relative routes to our HTML files

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

const db = require("../models");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
      console.log("has account");
    }
    res.render("login");
  });

  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
      console.log("has account");
    }
    res.render("signup");
  });

  // Acts as middleware - can do get or post
  app.use("/members", (req, res, next) => {
    if (req.user) {
      db.Expenses.findAll({
        include: db.Category,
        where: {
          userId: req.user.id
        }
      }).then(response => {
        const expLog = response.map(response => {
          return {
            category: response.Category.category,
            description: response.description,
            amount: response.amount
          };
        });

        // Pass data to next route
        res.locals.expLog = expLog;
        // Calls next route
        next();
      });
    } else {
      res.redirect("/login");
    }
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    if (req.user) {
      db.Category.findAll({}).then(response => {
        // Mapping returned sequelize object as unable to pass directly to handlebars
        const data = response.map(response => {
          return {
            categories: response.category,
            id: response.id
          };
        });

        res.render("members", {
          categories: data,
          expensesLog: res.locals.expLog
        });
      });
    } else {
      res.redirect("/login");
    }
  });
};

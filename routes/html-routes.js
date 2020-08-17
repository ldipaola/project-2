// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const { isatty } = require("tty");

const db = require("../models");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render("signup");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
      console.log("has account");
    }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    db.Category.findAll({}).then(categories => {
      console.log(categories);
      // [{id: 1, category: "fuel", budget: 10000}, {category: "fuel"}, {category: "fuel"}]
      const data = categories.map( cat => {
        //{category: "fuel"}
        return {
          cat: cat.category
        };
      });

      console.log(data);
      res.render("members", { cats: data });
    });
    // res.sendFile(path.join(__dirname, "../public/members.html"));
    // ***this is the original route that brings you to the members webpage
  });
};

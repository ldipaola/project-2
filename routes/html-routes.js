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

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    db.Category.findAll({}).then(categories => {
      // Mapping returned sequelize object as unable to pass directly to handlebars
      const data = categories.map(categories => {
        return {
          categories: categories.category
        };
      });
      console.log(data);
      res.render("members", { categories: data });
    });
    // .then(() => {
    //   db.User.findOne({
    //     where: {
    //       id: req.user.id
    //     }
    //   }).then(user => {
    //     const budget = {
    //       userBudget: user.userBudget
    //     };
    //   });
    // });
  });
  // app.get("/members", isAuthenticated, (req, res) => {
  //   console.log("=============================================");
  //   console.log(req.user.id);
  //   console.log("=============================================");
  //   db.User.findOne({
  //     where: {
  //       id: req.user.id
  //     }
  //   }).then(user => {
  //     console.log("=============================================");
  //     console.log(user);
  //     console.log("=============================================");
  //     const budget = {
  //       userBudget: user.userBudget
  //     };
  //     res.render("members", budget);
  //   });
  // });
};

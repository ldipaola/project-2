// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Set handlebars
const exphbs = require("express-handlebars");

// Requiring passport as we've configured it
const passport = require("./config/passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/expenses-api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize
  .sync()
  .then(() => {
    db.Category.bulkCreate([
      {
        id: 1,
        category: "Health & Beauty"
      },
      {
        id: 2,
        category: "Groceries"
      },
      {
        id: 3,
        category: "Food & Drink"
      },
      {
        id: 4,
        category: "Entertainment"
      },
      {
        id: 5,
        category: "Holiday & Travel"
      },
      {
        id: 6,
        category: "Household Utilities"
      }
    ]).catch(err => {
      console.log(err);
    });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    });
  });

// This module is being used to render Font Awesome icons
const Handlebars = require("handlebars");
const library = require("@fortawesome/fontawesome-svg-core").library;
const dom = require("@fortawesome/fontawesome-svg-core").dom;
const icon = require("@fortawesome/fontawesome-svg-core").icon;
const fas = require("@fortawesome/free-solid-svg-icons").fas;

// Adds all the icons from the Solid style into our library for easy lookup
library.add(fas);

Handlebars.registerHelper("fontawesome-css", () => {
  return new Handlebars.SafeString(dom.css());
});

Handlebars.registerHelper("fontawesome-icon", args => {
  return new Handlebars.SafeString(
    icon({ prefix: "fas", iconName: args.hash.icon }).html
  );
});

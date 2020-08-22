$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  $("#close-budget").on("click", function() {
    $("#budget").val("");

    $(this)
      .parents(".dropdown")
      .find("button.dropdown-toggle")
      .dropdown("toggle");
  });

  $("#close-exp").on("click", function() {
    $("#amount").val("");
    $("#description").val("");

    $(this)
      .parents(".dropdown")
      .find("button.dropdown-toggle")
      .dropdown("toggle");
  });
});

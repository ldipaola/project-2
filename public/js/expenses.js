//const { combineTableNames } = require("sequelize/types/lib/utils");

// eslint-disable-next-line no-empty-function
$(document).ready(() => {
  // const budgetList = $("chartContainer");
  const submitBudgetBtn = $("#save-budget");
  const budget = $("#budget");
  const submitExpensesBtn = $("#save-exp");
  const amount = $("#amount");
  const description = $("#description");
  let categoryId;
  $("#category-menu").on("change", () => {
    categoryId = $("#category-menu option:selected").attr("data-id");
    // const selectCategory = $(this).children("option:selected").attr("id");
  });

  // const renderList = $("#renderList");
  submitBudgetBtn.on("click", async event => {
    console.log("clicked");
    event.preventDefault();
    const userData = {
      userBudget: budget.val().trim()
    };
    if (!userData.userBudget) {
      return;
    }
    uploadBudget(userData.userBudget);
    budget.val("");
    $("#budget-dropdown").removeClass("show");
  });

  submitExpensesBtn.on("click", event => {
    console.log("clicked");
    event.preventDefault();
    const userData = {
      amount: parseInt(amount.val().trim()),
      description: description.val().trim(),
      categoryId: categoryId
    };
    uploadExpenses(userData);
    amount.val("");
    description.val("");
  });
  function uploadBudget(userBudget) {
    const updatedBudget = {
      userBudget: userBudget
    };
    $.ajax({
      method: "PUT",
      url: "/api/budget",
      data: updatedBudget
    }).then(budget => {
      $("#total-budget").text(updatedBudget.userBudget);
      console.log(budget);
    });
  }
  function uploadExpenses(userData) {
    $.post("api/expenses", userData);
  }
  getUserData = () => {
    $.get("/api/expenses").then(data => {
      $("#total-budget").text(data.budget);
      console.log(data);
    });
  };

  getUserData();
});

// eslint-disable-next-line no-empty-function
$(document).ready(() => {
  // const budgetList = $("chartContainer");
  const submitBudgetBtn = $("#save-budget");
  const budget = $("#budget");
  // const renderList = $("#renderList");
  submitBudgetBtn.on("click", event => {
    event.preventDefault();
    console.log("click");
    const userData = {
      userBudget: budget.val().trim()
    };
    if (!userData.userBudget) {
      return;
    }
    uploadBudget(userData.userBudget);
    budget.val("");
  });

  function uploadBudget(userBudget) {
    $.post("api/members", {
      userBudget
    }).then(() => {
      window.location.replace("/members");
    });
  }

  getExpenses();
  function getExpenses() {
    $.get("/api/user_data").then(data => {
      $(".member-name").text(data.email);
    });
    $.get("/api/expenses", data => {
      console.log("------------");
      console.log(data);
      console.log("------------");
    });
  }
});

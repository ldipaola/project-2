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

  // totalBudget();
  // function totalBudget() {
  $.get("/api/expenses").then(data => {
    $("#total-budget").text(data.userBudget);
    console.log("-----userBudget-------");
    console.log(data.userBudget);
    console.log("------------");
  });
  //   $.get("/api/expenses", data => {
  //     console.log("------------");
  //     console.log(data);
  //     console.log("------------");
  //   });
  // }
});

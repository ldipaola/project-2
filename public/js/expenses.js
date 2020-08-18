// eslint-disable-next-line no-empty-function
$(document).ready(() => {
  const budgetList = $("chartContainer");
  const submitBudgetBtn = $("#submitBudgetBtn");
  const budget = $("#budget");
  // const renderList = $("#renderList");
  submitBudgetBtn.on("click", event => {
    event.preventDefault();
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
    // $.get("/api/expenses", data => {
    //   const rowsToAdd = [];
    //   for (let i = 0; i < data.length; i++) {
    //     rowsToAdd.push(expenseRow(data[i]));
    //   }
    //   renderUserList(rowsToAdd);
    //   nameInput.val("");
    // });
  }
  function expenseRow(userData) {
    const newTr = $("<tr>");
    newTr.data("user", userData);
    newTr.append("<td>" + userData.name + "</td>");
    if (userData.Posts) {
      newTr.append("<td> " + userData.Posts.length + "</td>");
    } else {
      newTr.append("<td>0</td>");
    }
    // newTr.append(
    //   "<td><a href='/blog?user_id=" + userData.id + "'>Go to Posts</a></td>"
    // );
    // newTr.append(
    //   "<td><a href='/cms?user_id=" + userData.id + "'>Create a Post</a></td>"
    // );
    return newTr;
  }
  // function renderUserList(rows) {
  //   budgetList
  //     .children()
  //     .not(":user")
  //     .remove();
  //   userContainer.children(".alert").remove();
  //   if (rows.length) {
  //     console.log(rows);
  //     userList.prepend(rows);
  //   } else {
  //     renderEmpty();
    }
  }
});

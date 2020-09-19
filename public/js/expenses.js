$(document).ready(() => {
  const submitBudgetBtn = $("#save-budget");
  const budget = $("#budget");
  const submitExpensesBtn = $("#save-exp");
  const amount = $("#amount");
  const description = $("#description");
  let categoryId = 1;

  getUserData();
  getUserExpenses();

  // event handler for category options in Add New Expense
  $("#category-menu").on("change", () => {
    categoryId = $("#category-menu option:selected").attr("data-id");
  });

  // Edit Budget Save button
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

  // Add New Expense Save button
  submitExpensesBtn.on("click", event => {
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

  // Edit Budget function
  function uploadBudget(userBudget) {
    const updatedBudget = {
      userBudget: userBudget
    };
    $.ajax({
      method: "PUT",
      url: "/api/budget",
      data: updatedBudget
    }).then(() => {
      $("#total-budget").text(updatedBudget.userBudget);
      $(this)
        .parents(".dropdown")
        .find("button.dropdown-toggle")
        .dropdown("toggle");
      window.location.reload("/members");
    });
  }

  // Add New Expense Function
  function uploadExpenses(userData) {
    $.post("api/expenses", userData).then(() => {
      $(this)
        .parents(".dropdown")
        .find("button.dropdown-toggle")
        .dropdown("toggle");

      window.location.reload("/members");
    });
  }

  getExpenses();
  function getExpenses() {
    $.get("/api/user_data").then(data => {
      $(".member-name").text(data.email);
    });
  }

  function getUserData() {
    $.get("/api/expenses").then(data => {
      $("#total-budget").text(data.budget);
      const dataAA = data.expenses.map(data => data.amount);
      const sum = dataAA.reduce(add, 0);
      const remainder = data.budget - sum;
      $("#budget-left").text(remainder);
    });
  }

  function add(accumulator, a) {
    return accumulator + a;
  }

  // Highchart JS
  let health = 0;
  let groceries = 0;
  let food = 0;
  let entertainment = 0;
  let holiday = 0;
  let utilities = 0;

  function getUserExpenses() {
    $.get("/api/expenses").then(data => {
      for (let i = 0; i < data.expenses.length; i++) {
        if (data.expenses[i].CategoryId === 1) {
          health = health + data.expenses[i].amount;
        } else if (data.expenses[i].CategoryId === 2) {
          groceries = groceries + data.expenses[i].amount;
        } else if (data.expenses[i].CategoryId === 3) {
          food = food + data.expenses[i].amount;
        } else if (data.expenses[i].CategoryId === 4) {
          entertainment = entertainment + data.expenses[i].amount;
        } else if (data.expenses[i].CategoryId === 5) {
          holiday = holiday + data.expenses[i].amount;
        } else if (data.expenses[i].CategoryId === 6) {
          utilities = utilities + data.expenses[i].amount;
        }
      }

      const chartRounding = (num) => {
        return Math.round((num + Number.EPSILON) * 100) / 100
      }


      const totalExpenses =
        health + groceries + food + entertainment + holiday + utilities;
      const healthPct = chartRounding(((health / totalExpenses) * 100));
      const groceriesPct = chartRounding(((groceries / totalExpenses) * 100));
      const foodPct = chartRounding(((food / totalExpenses) * 100));
      const entertainmentPct = chartRounding(((entertainment / totalExpenses) * 100));
      const holidayPct = chartRounding(((holiday / totalExpenses) * 100));
      const utilitiesPct = chartRounding(((utilities / totalExpenses) * 100));

      const chartData = [
        { name: "Groceries", y: groceriesPct },
        { name: "Food & Drinks", y: foodPct },
        { name: "Holiday & Travel", y: holidayPct },
        { name: "Entertainment", y: entertainmentPct },
        { name: "Health & Beauty", y: healthPct },
        { name: "Household Utilities", y: utilitiesPct }
      ];
      if (chartData) generateChart(chartData);
    });

    function generateChart(chartData) {
      Highcharts.setOptions({
        colors: Highcharts.map(Highcharts.getOptions().colors, color => {
          return {
            radialGradient: {
              cx: 0.5,
              cy: 0.3,
              r: 0.7
            },
            stops: [
              [0, color],
              [
                1,
                Highcharts.color(color)
                  .brighten(-0.3)
                  .get("rgb")
              ] // darken
            ]
          };
        })
      });

      // Build the chart
      Highcharts.chart("chart-container", {
        chart: {
          backgroundColor: null,
          style: {
            fontFamily: "Jura",
            color: "#000"
          },
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        title: {
          text: "Percentage of Expenses"
        },
        credits: {
          enabled: false
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        },
        accessibility: {
          point: {
            valueSuffix: "%"
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.1f} %",
              connectorColor: "silver",
              formatter: function() {
                if (this.y != 0) {
                  return this.y +'%';
                } else {
                  return null;
                }
            }
            }
          }
        },
        series: [
          {
            type: "pie",
            name: "Expenses",
            data: chartData
          }
        ]
      }, function(chart) { // on complete

        chart.renderer.text('No Data Available', 290, 195)
            .css({
                color: '#4572A7',
                fontSize: '16px'
            })
            .add();
      
          });
    }
  }
});

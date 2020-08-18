$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

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
      plotShadow: false,
      type: "pie"
    },
    title: {
      text: "Spending by Category"
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
          connectorColor: "silver"
        }
      }
    },
    series: [
      {
        name: "Expenses",
        data: [
          { name: "Groceries", y: 40.1 },
          { name: "Food & Drinks", y: 7.46 },
          { name: "Holiday & Travel", y: 11.21 },
          { name: "Entertainment", y: 6.75 },
          { name: "Household Utilities", y: 26.13 },
          { name: "Health & Beauty", y: 8.35 }
        ]
      }
    ]
  });

  $("#close-budget").on("click", function() {
    $(this)
      .parents(".dropdown")
      .find("button.dropdown-toggle")
      .dropdown("toggle");
  });

  $("#close-exp").on("click", function() {
    $(this)
      .parents(".dropdown")
      .find("button.dropdown-toggle")
      .dropdown("toggle");
  });
});

// Nutrients Graph

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Nutrient', 'Amount today'],
        ['Protein',     70],
        ['Fats',      55],
        ['Sugar',  6],
        ['Vitamins', 2],
        ['Minerals',    7]
    ]);

    var options = {
        title: 'Daily Nutrients',
        pieHole: 0.4,
        backgroundColor: { fill:'transparent' }
    };

    var chart1 = new google.visualization.PieChart(document.getElementById('donutChart1'));
    var chart2= new google.visualization.PieChart(document.getElementById('donutChart2'));
    var chart3 = new google.visualization.PieChart(document.getElementById('donutChart3'));

    chart1.draw(data, options);
    chart2.draw(data, options);
    chart3.draw(data, options);

    chart1.setSelection([{row: 2}]);
    chart2.setSelection([{row: 1}]);
    chart3.setSelection([{row: 0}]);
}
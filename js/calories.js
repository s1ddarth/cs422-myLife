// Calories graph

google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

    var data = google.visualization.arrayToDataTable([
        ['Day', 'Calorie Intake',],
        ['Monday', 2913],
        ['Tuesday', 3204],
        ['Wednesday', 3015],
        ['Thursday', 3781],
        ['Friday', 2754],
        ['Saturday', 2888],
        ['Sunday', 3188]
    ]);

    var options = {
        title: 'Weekly Nutrition Stats',
        colors: ['#8ED4C4'],
        backgroundColor: { fill:'transparent' },
        chartArea: {width: '80%'},
        hAxis: {
            title: 'Calories consumed',
            minValue: 0
        },
        vAxis: {
            title: 'Day'
        }
    };

    var chart = new google.visualization.BarChart(document.getElementById('calorie_chart'));

    chart.draw(data, options);
}
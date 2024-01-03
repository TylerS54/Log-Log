

var globalChart; // Declare this at the top of your script

var firebaseConfig = {
    apiKey: "AIzaSyCUCLvljUj90NhC3w_aUU6SwkFvOt-asDk",
    authDomain: "loglog-a3cf1.firebaseapp.com",
    databaseURL: "https://loglog-a3cf1-default-rtdb.firebaseio.com",
    projectId: "loglog-a3cf1",
    storageBucket: "loglog-a3cf1.appspot.com",
    messagingSenderId: "1056500947260",
    appId: "1:1056500947260:web:4635c3a82b4fa2777b2639",
    measurementId: "G-TGSND834KX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

function incrementCounter(name) {
    var now = new Date();
    var timestamp = now.toISOString().split(':')[0]; // Format: YYYY-MM-DDTHH:MM
    var countRef = database.ref('counts/' + name + '/' + timestamp);

    countRef.transaction(function(currentCount) {
        return (currentCount || 0) + 1;
    });

    disableButtons();
    showConfirmation(name);
}

function disableButtons() {
    var buttons = document.querySelectorAll('button');
    buttons.forEach(function(button) {
        button.disabled = true;
        button.style.opacity = 0.5;
    });
}

function showConfirmation(name) {
    var confirmationElement = document.getElementById('confirmation');
    confirmationElement.innerText = `${name}'s 💩 has been logged.`;
    confirmationElement.style.display = 'block';
}

function updateHighscore(snapshot) {
    let userTotals = [];

    snapshot.forEach(function(userSnapshot) {
        let total = 0;
        userSnapshot.forEach(function(dateSnapshot) {
            total += dateSnapshot.val();
        });
        userTotals.push({ user: userSnapshot.key, total: total });
    });

    userTotals.sort(function(a, b) {
        return b.total - a.total;
    });

    let highscoreHTML = userTotals.map((item, index) => 
        `<div class="highscore-entry">
            <span class="rank">${index + 1}</span>
            <span class="name">${item.user}</span>
            <span class="score">${item.total}</span>
        </div>`
    ).join('');

    document.getElementById('highscore').innerHTML = highscoreHTML;
}





function processSnapshot(snapshot) {
    let seriesData = [];
    snapshot.forEach(userSnapshot => {
        let dataPoints = [];
        userSnapshot.forEach(timeSnapshot => {
            let time = timeSnapshot.key;
            let count = timeSnapshot.val();
            dataPoints.push({
                x: new Date(time.substring(0, 13).replace('T', ' ') + ':00:00').getTime(),
                y: count
            });
        });

        seriesData.push({
            name: userSnapshot.key,
            data: dataPoints
        });
    });

    return {
        series: seriesData
    };
}

function renderChart(chartData) {
    if (!globalChart) {
        var options = {
            series: chartData.series,
            chart: {
                type: 'line',
                height: 350
            },
            xaxis: {
                type: 'datetime',
                title: {
                    text: 'Time'
                }
            },
            yaxis: {
                title: {
                    text: 'Clicks'
                },
                min: 0
            },
            tooltip: {
                x: {
                    format: 'dd MMM yyyy HH:mm'
                }
            }
        };

        globalChart = new ApexCharts(document.querySelector("#chart"), options);
        globalChart.render();
    } else {
        globalChart.updateOptions({
            series: chartData.series
        });
    }
}

function updateDisplay() {
    var countsRef = database.ref('counts');
    countsRef.on('value', function(snapshot) { // Changed from 'once' to 'on'
        var chartData = processSnapshot(snapshot);
        renderChart(chartData);
        updateHighscore(snapshot); 
    });
}

document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
});

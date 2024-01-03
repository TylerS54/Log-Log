

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

    disableButtons(); // Disable all buttons after a click
    showConfirmation(name); // Show confirmation message
}

function disableButtons() {
    var buttons = document.querySelectorAll('button');
    buttons.forEach(function(button) {
        button.disabled = true;
        button.style.opacity = 0.5; // Reduce opacity to indicate disabled state
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





function updateDisplay() {
    var countsRef = database.ref('counts');
    countsRef.on('value', function(snapshot) {
        updateHighscore(snapshot); // Update the highscore
        var data = processSnapshot(snapshot);
        updateChart(data);
    });
}

function processSnapshot(snapshot) {
    let chartData = {
        labels: [],
        datasets: []
    };

    let aggregatedData = {}; // Aggregate data by hour

    snapshot.forEach(function(userSnapshot) {
        userSnapshot.forEach(function(hourSnapshot) {
            let hour = hourSnapshot.key;
            let count = hourSnapshot.val();

            if (!aggregatedData[hour]) {
                aggregatedData[hour] = {};
            }

            aggregatedData[hour][userSnapshot.key] = count;
        });
    });

    // Generate a sorted array of unique hours
    chartData.labels = Object.keys(aggregatedData).sort();

    // Create datasets for each user
    snapshot.forEach(function(userSnapshot) {
        let userData = {
            label: userSnapshot.key,
            data: [],
            fill: false,
            borderColor: getRandomColor(),
            lineTension: 0.1
        };

        chartData.labels.forEach(function(hour) {
            let count = aggregatedData[hour][userSnapshot.key] || 0;
            userData.data.push({
                x: hour,
                y: count
            });
        });

        chartData.datasets.push(userData);
    });

    return chartData;
}

function generateHourlyLabels(hourlyData) {
    let hours = Object.keys(hourlyData).sort();
    return hours.map(hour => hour + ':00'); // Add ':00' to make it clear it's hourly
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function updateChart(data) {
    var ctx = document.getElementById('clickChart').getContext('2d');

    if (!globalChart) {
        globalChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'hour',
                            tooltipFormat: 'MMM D, hA' // Adjust the tooltip format as needed
                        },
                        title: {
                            display: true,
                            text: 'Hour'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Clicks'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            title: function(tooltipItems) {
                                return tooltipItems[0].label.split('T').join(' at ');
                            }
                        }
                    }
                }
            }
        });
    } else {
        globalChart.data = data;
        globalChart.update();
    }
}


document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
});




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
    var today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    var countRef = database.ref('counts/' + name + '/' + today);
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
    let highscore = 0;
    let highscoreUser = '';

    snapshot.forEach(function(userSnapshot) {
        let total = 0;
        userSnapshot.forEach(function(dateSnapshot) {
            total += dateSnapshot.val();
        });

        if (total > highscore) {
            highscore = total;
            highscoreUser = userSnapshot.key;
        }
    });

    document.getElementById('highscore').innerText = `Highest count is ${highscore}, by ${highscoreUser}`;
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

    let dates = new Set(); // To store unique dates

    // Process each user's data
    snapshot.forEach(function(userSnapshot) {
        let userData = {
            label: userSnapshot.key,
            data: [],
            fill: false,
            borderColor: getRandomColor(), // Function to generate a random color
            lineTension: 0.1
        };

        userSnapshot.forEach(function(dateSnapshot) {
            let date = dateSnapshot.key;
            let count = dateSnapshot.val();

            dates.add(date);

            userData.data.push({
                x: date,
                y: count
            });
        });

        chartData.datasets.push(userData);
    });

    // Sort and add dates to labels
    chartData.labels = Array.from(dates).sort();

    // Sort data points in each dataset by date
    chartData.datasets.forEach(dataset => {
        dataset.data.sort((a, b) => chartData.labels.indexOf(a.x) - chartData.labels.indexOf(b.x));
    });

    return chartData;
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
            type: 'line', // or 'bar'
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
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


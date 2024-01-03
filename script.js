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
}


function updateDisplay() {
    var countsRef = database.ref('counts');
    countsRef.once('value', function(snapshot) {
        var data = processSnapshot(snapshot);
        updateChart(data);
    });
}

function processSnapshot(snapshot) {
    // Process the data from Firebase to a format suitable for Chart.js
    // This might involve aggregating counts by date for each user
    // ...
    return processedData;
}

function updateChart(data) {
    var ctx = document.getElementById('clickChart').getContext('2d');
    var clickChart = new Chart(ctx, {
        type: 'line', // or 'bar' depending on your preference
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Initialize display
updateDisplay();



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

function sendTelegramMessage(name) {
    const botToken = '6741155054:AAGSjlsqa7xbJGHkKq9uEREUjNSO22yn6KE'; // This is not secure
    const chatId = '-1002084507637';
    const messages = [
        `${name} performed a submarine launch.`,
        `${name} conducted a back-end upload.`,
        `${name} deployed the brown troops.`,
        `${name} did a stink pickle production.`,
        `${name} executed a rear-end evacuation.`,
        `${name} freed the chocolate hostages.`,
        `${name} gave birth to a food baby.`,
        `${name} had a brown out.`,
        `${name} launched a torpedo.`,
        `${name} let loose a butt burrito.`,
        `${name} made a special delivery to the ceramic pot.`,
        `${name} navigated the chocolate canal.`,
        `${name} opened the floodgates at Mud Dam.`,
        `${name} orchestrated a potty performance.`,
        `${name} painted the town brown.`,
        `${name} parted ways with a fudge dragon.`,
        `${name} played a butt symphony.`,
        `${name} released a crap kraken.`,
        `${name} sent a butt nugget to the pool.`,
        `${name} set free a sewer snake.`,
        `${name} shot a moon rocket.`,
        `${name} sunk a stink battleship.`,
        `${name} took a trip to Dumpsville.`,
        `${name} unleashed a brown goblin.`,
        `${name} went to do the doo.`,
        `${name} whipped up a poop souffle.`,
        `${name} let fly a rear-end rocket.`,
        `${name} crafted a brown masterpiece.`,
        `${name} dispatched a dookie drone.`,
        `${name} produced a chocolate eclair.`,
        `${name} cooked up a brown stew.`,
        `${name} made a splash in the porcelain lake.`,
        `${name} launched a log flume.`,
        `${name} orchestrated an underwater symphony.`,
        `${name} initiated a stink strike.`,
        `${name} dispatched a doo-doo dispatch.`,
        `${name} created a masterpiece in brown.`,
        `${name} executed a mudslide maneuver.`,
        `${name} crafted a fudge sculpture.`,
        `${name} embarked on a brown journey.`,
        `${name} laid the groundwork for a brown foundation.`,
        `${name} undertook a rear-end demolition.`,
        `${name} released a brown beacon.`,
        `${name} made an offering to the porcelain god.`,
        `${name} rolled out the brown carpet.`,
        `${name} unveiled a brown monument.`,
        `${name} constructed a chocolate castle.`,
        `${name} engaged in a poop production.`,
        `${name} dispatched a fecal flyer.`,
        `${name} unleashed a back-end bombshell.`,
        `${name} dropped the kids off at the pool.`,
        `${name} took a trip to the porcelain throne.`,
        `${name} made a deposit in the porcelain bank.`,
        `${name} launched a butt shuttle.`,
        `${name} downloaded some brownware.`,
        `${name} unleashed a chocolate hostage.`,
        `${name} had a conference call with nature.`,
        `${name} sent a fax to Poopsville.`,
        `${name} let the brown bear out of the cave.`,
        `${name} logged out some timber.`,
        `${name} painted the bowl brown.`,
        `${name} rolled some organic fertilizer.`,
        `${name} set sail a stinky ship.`,
        `${name} unleashed a mud monkey.`,
        `${name} dropped a bomb in the super bowl.`
    ];
    const text = messages[Math.floor(Math.random() * messages.length)];
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
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

function convertToEasternTime(utcDate) {
    const easternOffset = -5; // Eastern Standard Time offset from UTC
    const daylightSavingTime = true; // Set this based on DST observance

    let localOffset = utcDate.getTimezoneOffset() / 60;
    let totalOffset = easternOffset - localOffset;

    // Adjust for Daylight Saving Time
    if (daylightSavingTime) {
        totalOffset += 1;
    }

    return new Date(utcDate.getTime() + totalOffset * 3600 * 1000);
}




function processSnapshot(snapshot) {
    let seriesData = [];
    snapshot.forEach(userSnapshot => {
        let dataPoints = [];
        userSnapshot.forEach(timeSnapshot => {
            let time = timeSnapshot.key;
            let utcDate = new Date(time.substring(0, 13).replace('T', ' ') + ':00:00');
            let easternTime = convertToEasternTime(utcDate);
            let count = timeSnapshot.val();
            dataPoints.push({
                x: easternTime.getTime(),
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
                    text: 'Poopies'
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

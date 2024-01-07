var globalChart, globalCumulativeChart;

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

function sendTelegramMessage(name) {
    const botToken = '6741155054:AAGSjlsqa7xbJGHkKq9uEREUjNSO22yn6KE'; // This is not secure
    const chatId = '-1002084507637';
    const messages = [
        `${name} just released a tortured scream from the depths of their bowels.`,
        `${name} just dropped a horror movie monster in the toilet bowl.`,
        `${name} just performed a summoning ritual for the Brown Lord.`,
        `${name} just birthed a creature that would make H.P. Lovecraft proud.`,
        `${name} just excreted the embodiment of their existential crisis.`,
        `${name} just slaughtered a dozen innocent toilet paper rolls.`,
        `${name} just initiated a poopocalypse, leaving devastation in their wake.`,
        `${name} just exhaled a cloud of doom and despair from their rear end.`,
        `${name} just released the Kraken's distant, brown cousin.`,
        `${name} just redefined the meaning of "a fate worse than death."`,
        `${name} just punished the porcelain gods for their sins.`,
        `${name} just turned the bathroom into a CSI crime scene investigation.`,
        `${name} just gave birth to Satan's little stinker in the underworld.`,
        `${name} just tormented the toilet bowl with their unholy expulsion.`,
        `${name} just unleashed the wrath of the Brown Reaper.`,
        `${name} just disturbed the balance of the universe with their stench.`,
        `${name} just had a poop-ocalypse, painting the toilet bowl in hues of darkness.`,
        `${name} just descended into the underworld to conquer the evil within.`,
        `${name} just banished the legendary monster from the brown lagoon.`,
        `${name} just unleashed a dark magic spell from their nether regions.`,
        `${name} just left a smelly calling card for their archnemesis.`,
        `${name} just gave birth to the physical manifestation of their deepest fears.`,
        `${name} just completed a sacrificial ritual to appease the Great Brown Beast.`,
        `${name} just detonated a poop bomb of epic proportions.`,
        `${name} just revealed the excremental secrets of the universe to the porcelain `,`gods.`,
        `${name} just initiated an exorcism, expelling the demons of last night's meal.`,
        `${name} just committed a crime against humanity in the bathroom chamber.`,
        `${name} just unveiled the hidden horrors of the culinary underworld.`,
        `${name} just summoned the secret ingredient from the Seventh Circle of Hell.`,
        `${name} just waged war against the innocent toilet bowl, leaving no survivors.`,
        `${name} just released a toxic gas that would violate the Geneva Convention.`,
        `${name} just recreated the infamous Chernobyl disaster using only their bowels.`,
        `${name} just performed a biohazard experiment in the bathroom lab.`,
        `${name} just gave birth to the unholy amalgamation of all fast-food sins.`,
        `${name} just unleashed a weapon of mass digestion in record time.`,
        `${name} just revealed the darkest secret of the sewer dwelling beneath us all.`,
        `${name} just embarked on a journey to the inner depths of their digestive abyss.`,
        `${name} just conducted a sneak attack from the rear, catching the toilet off `,`guard.`,
        `${name} just rewrote the rules of waste management with their unholy expulsion.`,
        `${name} just created a chemical reaction in the toilet bowl that defied `,`scientific logic.`,
        `${name} just turned the bathroom into a haunted house for the unsuspecting nose.`,
        `${name} just discovered a new dimension of foulness reserved only for the `,`strongest stomachs.`,
        `${name} just brought forth a brown tide of biblical proportions.`,
        `${name} just transformed the toilet bowl into the Eye of Sauron's fiery cousin.`,
        `${name} just unearthed a buried treasure from the depths of their digestive `,`catacombs.`,
        `${name} just gave birth to a culinary abomination that would make Gordon Ramsay `,`faint.`,
        `${name} just embarked on an interdimensional journey through the sewage of the `,`multiverse.`,
        `${name} just wrote a new chapter in the Annals of Disgust with their bowel `,`movement.`,
        `${name} just conducted a covert operation that would make James Bond blush.`,
        `${name} just completed their dark masterpiece, leaving the bathroom in shambles `,`and tears.`,
        `${name} just dropped the kids off at the pool.`,
        `${name} just took a dumparoo.`,
        `${name} just birthed a chocolate submarine.`,
        `${name} just unleashed the brown Krakatoa.`,
        `${name} just released the chocolate hostage.`,
        `${name} just had a booty burrito explosion.`,
        `${name} just cracked the porcelain throne.`,
        `${name} just dropped a stink pickle.`,
        `${name} just celebrated the arrival of a fudge buddy.`,
        `${name} just had a rendezvous with Mr. Hankey.`,
        `${name} just had a brown baby delivery.`,
        `${name} just conducted butt business.`,
        `${name} just answered nature's call with flair.`,
        `${name} just fertilized the flower bed of doom.`,
        `${name} just played the brown symphony on the porcelain piano.`,
        `${name} just flushed the evidence of a crime.`,
        `${name} just gave birth to a chocolate mudslide.`,
        `${name} just laid some Hershey's kisses in the porcelain sanctuary.`,
        `${name} just left some butt artwork in the porcelain canvas.`,
        `${name} just dropped a chocolate log.`,
        `${name} just declared war on the toilet bowl.`,
        `${name} just excreted a chocolate hot lava flow.`,
        `${name} just released the anal treasures of Atlantis.`,
        `${name} just had a bottom burp extravaganza.`,
        `${name} just gave birth to a poop-palooza.`,
        `${name} just unleashed the hellish demons of the deep.`,
        `${name} just played the poop flute with gusto.`,
        `${name} just dropped some booty bombs.`,
        `${name} just descended into the abyss of bowel movements.`,
        `${name} just had a sphincter serenade.`,
        `${name} just left a buttquake in the bathroom.`,
        `${name} just set free the chocolate kraken.`,
        `${name} just commemorated the porcelain altar with their presence.`,
        `${name} just initiated Operation Brown Thunder.`,
        `${name} just deposited a chunky donation in the porcelain charity box.`,
        `${name} just fired the poop canon at full force.`,
        `${name} just turned the toilet bowl into a battleground.`,
        `${name} just performed an anus symphony with explosive flair.`,
        `${name} just unfurled a brownish flag on the porcelain territory.`,
        `${name} just created a stinky masterpiece in the bathroom gallery.`,
        `${name} just left a chocolate surprise in the honey pot.`,
        `${name} just had a butt blast of epic proportions.`,
        `${name} just dropped a big ol' load of cocoa goodness.`,
        `${name} just unleashed a chocolate hurricane upon the porcelain kingdom.`,
        `${name} just christened the toilet bowl with a brown baptism.`,
        `${name} just released a cinematic masterpiece called "The Crappening."`,
        `${name} just ended the drought in the sewage system.`,
        `${name} just won the Battle of Stinky Bottoms.`,
        `${name} just unveiled the chocolate volcano inside them.`,
        `${name} just broadcasted a stinky message to the porcelain gods and goddesses.`,
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

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNo;
}

function processSnapshot(snapshot, chartView) {
    let seriesData = [];
    snapshot.forEach(userSnapshot => {
        let dataPoints = {};
        userSnapshot.forEach(timeSnapshot => {
            let time = timeSnapshot.key;
            let utcDate = new Date(time.substring(0, 13).replace('T', ' ') + ':00:00');
            let dateKey = utcDate.toISOString().split('T')[0]; // YYYY-MM-DD
            if (chartView === 'weekly') {
                dateKey = `${utcDate.getFullYear()}-W${getWeekNumber(utcDate)}`;
            }
            dataPoints[dateKey] = (dataPoints[dateKey] || 0) + timeSnapshot.val();
        });

        let formattedData = Object.keys(dataPoints).sort().map(key => {
            return {
                x: new Date(key).getTime(),
                y: dataPoints[key]
            };
        });

        seriesData.push({
            name: userSnapshot.key,
            data: formattedData
        });
    });

    return {
        series: seriesData
    };
}

function processCumulativeSnapshot(snapshot) {
    let seriesData = [];
    snapshot.forEach(userSnapshot => {
        let total = 0;
        let dataPoints = [];
        userSnapshot.forEach(timeSnapshot => {
            total += timeSnapshot.val();
            let time = timeSnapshot.key;
            let utcDate = new Date(time.substring(0, 13).replace('T', ' ') + ':00:00');
            dataPoints.push({
                x: utcDate.getTime(),
                y: total
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
    var options = {
        series: chartData.series,
        chart: {
            type: 'line',
            height: 350
        },
        xaxis: {
            type: 'datetime',
            title: {
                text: 'Date'
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
                format: 'dd MMM yyyy'
            }
        }
    };

    if (!globalChart) {
        globalChart = new ApexCharts(document.querySelector("#chart"), options);
        globalChart.render();
    } else {
        globalChart.updateOptions(options, true);
    }
}

function renderCumulativeChart(chartData) {
    var cumulativeOptions = {
        series: chartData.series,
        chart: {
            type: 'line',
            height: 350
        },
        xaxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            }
        },
        yaxis: {
            title: {
                text: 'Cumulative Clicks'
            },
            min: 0
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
        }
    };

    if (!globalCumulativeChart) {
        globalCumulativeChart = new ApexCharts(document.querySelector("#cumulativeChart"), cumulativeOptions);
        globalCumulativeChart.render();
    } else {
        globalCumulativeChart.updateOptions(cumulativeOptions, true);
    }
}

function updateDisplay(chartView) {
    var countsRef = database.ref('counts');
    countsRef.once('value', function(snapshot) {
        var chartData = processSnapshot(snapshot, chartView);
        renderChart(chartData);

        var cumulativeData = processCumulativeSnapshot(snapshot);
        renderCumulativeChart(cumulativeData);

        updateHighscore(snapshot);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var chartViewRadios = document.querySelectorAll('input[type="radio"][name="chartView"]');
    chartViewRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateDisplay(this.value);
        });
    });

    // Trigger the initial chart update based on the default selected view
    updateDisplay(document.querySelector('input[name="chartView"]:checked').value);
});



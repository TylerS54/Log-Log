var globalChart, globalCumulativeChart, globalDayOfWeekChart;

function sendTelegramMessage(name) {
    const botToken = '6741155054:AAGSjlsqa7xbJGHkKq9uEREUjNSO22yn6KE';
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
        `${name} just revealed the excremental secrets of the universe to the porcelain gods.`,
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
        `${name} just conducted a sneak attack from the rear, catching the toilet off guard.`,
        `${name} just rewrote the rules of waste management with their unholy expulsion.`,
        `${name} just created a chemical reaction in the toilet bowl that defied scientific logic.`,
        `${name} just turned the bathroom into a haunted house for the unsuspecting nose.`,
        `${name} just discovered a new dimension of foulness reserved only for the strongest stomachs.`,
        `${name} just brought forth a brown tide of biblical proportions.`,
        `${name} just transformed the toilet bowl into the Eye of Sauron's fiery cousin.`,
        `${name} just unearthed a buried treasure from the depths of their digestive catacombs.`,
        `${name} just gave birth to a culinary abomination that would make Gordon Ramsay faint.`,
        `${name} just embarked on an interdimensional journey through the sewage of the multiverse.`,
        `${name} just wrote a new chapter in the Annals of Disgust with their bowel movement.`,
        `${name} just conducted a covert operation that would make James Bond blush.`,
        `${name} just completed their dark masterpiece, leaving the bathroom in shambles and tears.`,
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

function updateHighscore(data) {
    let userTotals = [];

    for (let user in data) {
        let total = 0;
        for (let date in data[user]) {
            total += data[user][date];
        }
        userTotals.push({ user: user, total: total });
    }

    userTotals.sort((a, b) => b.total - a.total);

    let highscoreHTML = userTotals.map((item, index) => {
        let rankClass = '';
        let icon = '';
        let title = '';
        if (index === 0) {
            rankClass = 'rank-1';
            icon = '🥇';
            title = 'Poop King 👑';
        } else if (index === 1) {
            rankClass = 'rank-2';
            icon = '🥈';
            title = 'Toilet Titan 🚽';
        } else if (index === 2) {
            rankClass = 'rank-3';
            icon = '🥉';
            title = 'Dookie Duke 💩';
        } else {
            title = 'Regular Pooper';
        }

        return `
            <div class="highscore-entry">
                <span class="rank ${rankClass}">${icon}</span>
                <span class="name ${rankClass}">${item.user} - ${title}</span>
                <span class="score">${item.total}</span>
            </div>
        `;
    }).join('');

    document.getElementById('highscore').innerHTML = highscoreHTML;

    // Update daily and weekly leaders
    updateDailyAndWeeklyLeaders(data);
}

function updateDailyAndWeeklyLeaders(data) {
    let maxDailyCounts = {};
    let maxWeeklyCounts = {};

    for (let user in data) {
        maxDailyCounts[user] = 0;
        maxWeeklyCounts[user] = 0;

        let userDailyCounts = {};
        let userWeeklyCounts = {};

        for (let timestamp in data[user]) {
            let date = new Date(timestamp.substring(0, 13).replace('T', ' ') + ':00:00');
            let dateKey = date.toISOString().split('T')[0];
            let weekNumber = getWeekNumber(date);
            let weekKey = `${date.getFullYear()}-W${weekNumber}`;

            // Aggregate daily counts
            if (!userDailyCounts[dateKey]) {
                userDailyCounts[dateKey] = 0;
            }
            userDailyCounts[dateKey] += data[user][timestamp];

            // Aggregate weekly counts
            if (!userWeeklyCounts[weekKey]) {
                userWeeklyCounts[weekKey] = 0;
            }
            userWeeklyCounts[weekKey] += data[user][timestamp];
        }

        // Find the max daily count for the user
        for (let day in userDailyCounts) {
            if (userDailyCounts[day] > maxDailyCounts[user]) {
                maxDailyCounts[user] = userDailyCounts[day];
            }
        }

        // Find the max weekly count for the user
        for (let week in userWeeklyCounts) {
            if (userWeeklyCounts[week] > maxWeeklyCounts[user]) {
                maxWeeklyCounts[user] = userWeeklyCounts[week];
            }
        }
    }

    // Determine the overall daily and weekly leaders
    let dailyLeader = getOverallLeader(maxDailyCounts);
    let weeklyLeader = getOverallLeader(maxWeeklyCounts);

    let dailyLeaderHTML = dailyLeader ? 
        `<div class="leader-entry">
            <span class="name">${dailyLeader.user}</span>
            <span class="score">${dailyLeader.count}</span>
        </div>` : `<div class="leader-entry">No data available</div>`;

    let weeklyLeaderHTML = weeklyLeader ? 
        `<div class="leader-entry">
            <span class="name">${weeklyLeader.user}</span>
            <span class="score">${weeklyLeader.count}</span>
        </div>` : `<div class="leader-entry">No data available</div>`;

    document.getElementById('daily-leader').innerHTML = dailyLeaderHTML;
    document.getElementById('weekly-leader').innerHTML = weeklyLeaderHTML;
}

function getOverallLeader(counts) {
    let leader = { user: null, count: 0 };

    for (let user in counts) {
        if (counts[user] > leader.count) {
            leader = { user: user, count: counts[user] };
        }
    }

    return leader;
}


function getLeader(leaderData) {
    if (!leaderData) return null;
    let leader = { user: null, count: 0 };

    for (let user in leaderData) {
        if (leaderData[user] > leader.count) {
            leader = { user: user, count: leaderData[user] };
        }
    }

    return leader;
}


function incrementCounter(name) {
    var now = new Date();
    var timestamp = now.toISOString().split(':')[0]; // Format: YYYY-MM-DDTHH:MM

    fetch('https://us-central1-loglog-a3cf1.cloudfunctions.net/incrementCounter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, timestamp })
    })
    .then(response => response.json())
    .then(data => {
        disableButtons();
        showConfirmation(name);
        triggerConfetti();
        playFartNoise();
    })
    .catch(error => console.error('Error:', error));
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

function processSnapshot(data, chartView) {
    let seriesData = [];
    let colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF8333', '#FF33A1', '#33FFF3']; // Add more colors as needed
    let colorIndex = 0;

    for (let user in data) {
        let dataPoints = {};
        for (let time in data[user]) {
            let date = new Date(time.substring(0, 13).replace('T', ' ') + ':00:00');
            let dateKey;
            if (chartView === 'daily') {
                dateKey = date.toISOString().split('T')[0];
            } else if (chartView === 'weekly') {
                let weekNumber = getWeekNumber(date);
                dateKey = `${date.getFullYear()}-W${weekNumber}`;
            }

            dataPoints[dateKey] = (dataPoints[dateKey] || 0) + data[user][time];
        }

        seriesData.push({
            name: user,
            data: Object.entries(dataPoints).map(([key, value]) => {
                let date;
                if (chartView === 'daily') {
                    date = new Date(key);
                } else if (chartView === 'weekly') {
                    let [year, week] = key.split('-W');
                    date = new Date(year, 0, (week - 1) * 7 + 1);
                }
                return {
                    x: date.getTime(),
                    y: value
                };
            }),
            color: colors[colorIndex % colors.length]
        });
        colorIndex++;
    }

    return { series: seriesData };
}

function processCumulativeSnapshot(data) {
    let seriesData = [];
    let colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF8333', '#FF33A1', '#33FFF3']; // Add more colors as needed
    let colorIndex = 0;

    for (let user in data) {
        let total = 0;
        let dataPoints = [];
        for (let time in data[user]) {
            total += data[user][time];
            let utcDate = new Date(time.substring(0, 13).replace('T', ' ') + ':00:00');
            dataPoints.push({
                x: utcDate.getTime(),
                y: total
            });
        }

        seriesData.push({
            name: user,
            data: dataPoints,
            color: colors[colorIndex % colors.length]
        });
        colorIndex++;
    }

    return {
        series: seriesData
    };
}

function processDayOfWeekSnapshot(data) {
    let seriesData = {};
    let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    for (let user in data) {
        seriesData[user] = new Array(7).fill(0);

        for (let time in data[user]) {
            let date = new Date(time.substring(0, 13).replace('T', ' ') + ':00:00');
            let day = date.getDay();
            seriesData[user][day] += data[user][time];
        }
    }

    let formattedData = daysOfWeek.map((day, index) => {
        let data = { x: day };
        for (let user in seriesData) {
            data[user] = seriesData[user][index];
        }
        return data;
    });

    return formattedData;
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
                text: 'Poops'
            },
            min: 0
        },
        colors: chartData.series.map(s => s.color), // Use the colors specified in series
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: chartData.series.map(s => s.color),
                inverseColors: true,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
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
                text: 'Cumulative Poops'
            },
            min: 0
        },
        colors: chartData.series.map(s => s.color), // Use the colors specified in series
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: chartData.series.map(s => s.color),
                inverseColors: true,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
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

function renderDayOfWeekChart(chartData) {
    let series = Object.keys(chartData[0]).filter(key => key !== 'x').map(user => ({
        name: user,
        data: chartData.map(data => data[user])
    }));

    var options = {
        series: series,
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 10,
            },
        },
        xaxis: {
            categories: chartData.map(data => data.x),
        },
        yaxis: {
            title: {
                text: 'Poops'
            },
            min: 0
        },
        fill: {
            opacity: 1
        },
        colors: ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF8333', '#FF33A1', '#33FFF3']
    };

    if (!globalDayOfWeekChart) {
        globalDayOfWeekChart = new ApexCharts(document.querySelector("#dayOfWeekChart"), options);
        globalDayOfWeekChart.render();
    } else {
        globalDayOfWeekChart.updateOptions(options, true);
    }
}

function updateDisplay(chartView) {
    fetch('https://us-central1-loglog-a3cf1.cloudfunctions.net/getCounts')
    .then(response => response.json())
    .then(data => {
        if (chartView === 'daily' || chartView === 'weekly') {
            var chartData = processSnapshot(data, chartView);
            renderChart(chartData);

            if (!globalCumulativeChart) {
                var cumulativeData = processCumulativeSnapshot(data);
                renderCumulativeChart(cumulativeData);
            }
        }
        updateHighscore(data);

        // Always render the Day of Week chart
        var dayOfWeekData = processDayOfWeekSnapshot(data);
        renderDayOfWeekChart(dayOfWeekData);
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    var chartViewRadios = document.querySelectorAll('input[type="radio"][name="chartView"]');
    chartViewRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateDisplay(this.value);
        });
    });

    updateDisplay('daily'); // Initialize with the 'daily' view
});

var scalar = 1; 
var poo = confetti.shapeFromText({ text: '💩', scalar });

function triggerConfetti() {
    confetti({
        shapes: [poo],
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function playFartNoise() {
    const audio = document.getElementById('fart-noise');
    audio.play();
}
var globalChart, globalCumulativeChart, globalDayOfWeekChart;

function sendTelegramMessage(name) {
    const botToken = '6741155054:AAGSjlsqa7xbJGHkKq9uEREUjNSO22yn6KE';
    const chatId = '-1002084507637';
    const messages = [
        `${name} just summoned a demon from the porcelain underworld.`,
        `${name} just carved a jack-o'-lantern... out of their intestines.`,
        `${name} just brewed a potion in the cauldron of doom (aka toilet).`,
        `${name} just released a ghost from their haunted colon.`,
        `${name} just performed the sacred ritual of the Squatting Skeleton.`,
        `${name} just exorcised a chocolate demon from their body.`,
        `${name} just created a swamp monster in the toilet bowl.`,
        `${name} just laid a cursed egg in the nest of nightmares.`,
        `${name} just appeased the Porcelain God with a sacrifice.`,
        `${name} just unleashed a creature from the Upside-Down... in the downstairs bathroom.`,
        `${name} just opened a portal to the Brown Dimension.`,
        `${name} just cast a spell that turned their poop into a zombie.`,
        `${name} just gave birth to Cthulhu's smaller, smellier cousin.`,
        `${name} just scared the living daylights out of the toilet paper roll.`,
        `${name} just left a treat that's definitely not for trick-or-treaters.`,
        `${name} just made the bathroom mirror fog up with pure fear.`,
        `${name} just created a potion so potent, it made the toilet flush itself.`,
        `${name} just transformed into a werewolf... on the toilet.`,
        `${name} just made a deposit in the Bank of Eternal Stench.`,
        `${name} just painted the toilet bowl with liquid nightmares.`,
        `${name} just dropped a bass so dark, it opened a gate to the shadow realm.`,
        `${name} just left a surprise scarier than any haunted house.`,
        `${name} just made the bathroom air freshener beg for mercy.`,
        `${name} just birthed a kraken in the porcelain sea.`,
        `${name} just wrote a horror story... with their butt.`,
        `${name} just spawned a creature that would make Lovecraft proud.`,
        `${name} just conjured a smell that awakened ancient evils.`,
        `${name} just performed alchemy, turning last night's dinner into pure horror.`,
        `${name} just summoned Bloody Mary... from the other end.`,
        `${name} just created a scene scarier than all of Stephen King's books combined.`,
        `${name} just made the toilet scream in agony.`,
        `${name} just brewed a witch's potion in the toilet cauldron.`,
        `${name} just left a gift that would scare the Headless Horseman.`,
        `${name} just unleashed a plague upon the sewers.`,
        `${name} just performed a ritual darker than a moonless night.`,
        `${name} just created their own Stranger Things in the upside-down toilet.`,
        `${name} just made a deposit that nearly crashed the underworld's economy.`,
        `${name} just left something scarier than all of Wes Craven's nightmares.`,
        `${name} just made the Grim Reaper consider a career change.`,
        `${name} just turned the toilet into a bubbling witch's cauldron.`,
        `${name} just created a new species of toilet-dwelling monster.`,
        `${name} just left the kind of surprise that turns toilet brushes into holy weapons.`,
        `${name} just made the bathroom tiles try to escape.`,
        `${name} just caused a disturbance in the Force... from their lower force.`,
        `${name} just made the toilet wish it had chosen a different career path.`,
        `${name} just left something that made Pennywise retreat back into the sewers.`,
        `${name} just created their own version of 'The Blob'... in the toilet.`,
        `${name} just performed a symphony of terror on the porcelain throne.`,
        `${name} just made the toilet consider filing for divorce.`,
        `${name} just left a gift that would make Dracula faint.`,
        `${name} just created a new level of Dante's Inferno in the bathroom.`,
        `${name} just made the bathroom sink weep tears of sympathy for the toilet.`,
        `${name} just caused a tremor in the Force of the sewage system.`,
        `${name} just left something that made the toilet question its life choices.`,
        `${name} just created a masterpiece of horror in watercolor.`,
        `${name} just made the toilet plunger contemplate early retirement.`,
        `${name} just left a surprise that turned the toilet into a haunted house.`,
        `${name} just performed dark magic that made the toilet flush in reverse.`,
        `${name} just created a smell that could wake the dead... and make them die again.`,
        `${name} just made the toilet wish it had nostrils to hold.`,
        `${name} just unleashed a beast that made the sewer gators flee in terror.`,
        `${name} just created a new urban legend in the toilet bowl.`,
        `${name} just made the bathroom mirror crack in fear.`,
        `${name} just left something that made the toilet consider a career in space exploration.`,
        `${name} just performed an exorcism on last night's curry.`,
        `${name} just created a monster that Frankenstein would be proud of.`,
        `${name} just made the toilet wish it had hands to cover its eyes.`,
        `${name} just left a gift that would make a dementor gag.`,
        `${name} just turned the bathroom into a portal to the Netherworld.`,
        `${name} just created their own version of 'The Thing'... in the toilet bowl.`,
        `${name} just made the toilet contemplate a change of residence.`,
        `${name} just performed a ritual that made the bathroom lights flicker in fear.`,
        `${name} just left something that made the sewer rats consider vegetarianism.`,
        `${name} just created a horror scene that would make Guillermo del Toro jealous.`,
        `${name} just made the toilet seat try to clamp shut in self-defense.`,
        `${name} just unleashed a terror that made the shower curtain hide.`,
        `${name} just left a surprise that turned the toilet water into a witch's brew.`,
        `${name} just created a masterpiece of terror that belongs in the Museum of Modern Horror.`,
        `${name} just made the toilet flush button hesitate before pushing itself.`,
        `${name} just performed a séance that summoned the ghosts of dinners past.`,
        `${name} just left something that made the toilet bowl echo with the screams of the damned.`,
        `${name} just created a scene from 'Apocalypse Now'... in the bathroom.`,
        `${name} just made the toilet paper roll itself up in fear.`,
        `${name} just unleashed a horror that made the bath mat curl up in the corner.`,
        `${name} just left a gift that would make the Bog of Eternal Stench smell like roses.`,
        `${name} just performed alchemy that turned the toilet bowl into a black hole.`,
        `${name} just created a monster that made the toilet snake beg for a different job.`,
        `${name} just made the toilet wish it had been a kitchen sink instead.`,
        `${name} just left something that made the sewage treatment plant send out an SOS.`,
        `${name} just unleashed a terror that made the bathroom tiles try to crawl away.`,
        `${name} just performed a ritual that opened a rift to the Poo-niverse.`,
        `${name} just created a horror that made the toilet brush throw itself away.`,
        `${name} just made the toilet consider a career change to a flower pot.`,
        `${name} just left a surprise that turned the bathroom into a haunted forest.`,
        `${name} just unleashed a beast that made the toilet wish it had legs to run away.`,
        `${name} just performed dark magic that made the toilet water turn into ectoplasm.`,
        `${name} just created a scene that would give H.P. Lovecraft nightmares.`,
        `${name} just made the toilet seat try to eject itself from the bathroom.`,
        `${name} just left something that made the sewers declare a state of emergency.`,
        `${name} just unleashed a horror that made the bathroom mirror refuse to show reflections.`,
        `${name} just performed a summoning ritual that made Satan himself say "Nope".`,
        `${name} just created a monstrosity that made the toilet consider a restraining order.`,
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
        colors: ['#ff6600', '#8b0000', '#4b0082', '#006400', '#ff4500', '#800080'],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#ff6600', '#8b0000', '#4b0082', '#006400', '#ff4500', '#800080'],
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
        colors: ['#ff6600', '#8b0000', '#4b0082', '#006400', '#ff4500', '#800080'],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#ff6600', '#8b0000', '#4b0082', '#006400', '#ff4500', '#800080'],
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
        colors: ['#ff6600', '#8b0000', '#4b0082', '#006400', '#ff4500', '#800080']
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
    const colors = ['#ff6600', '#8b0000', '#000000', '#4b0082'];
    const shapes = ['🎃', '👻', '💀', '🕸️', '🦇'];
    
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
        shapes: shapes.map(s => confetti.shapeFromText({ text: s, scalar: 1 }))
    });
}

function playFartNoise() {
    const audio = document.getElementById('fart-noise');
    audio.play();
}
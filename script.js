var globalChart, globalCumulativeChart, globalDayOfWeekChart;

function sendTelegramMessage(name) {
    const botToken = '6741155054:AAGSjlsqa7xbJGHkKq9uEREUjNSO22yn6KE';
    const chatId = '-1002084507637';
    const messages = [
        `${name} just unleashed a gravy flood in the porcelain cornucopia.`,
        `${name} just carved a turkey... from the wrong end.`,
        `${name} just made their own cranberry sauce in the toilet bowl.`,
        `${name} just freed a gobbler from their haunted colon.`,
        `${name} just performed the sacred ritual of the Squatting Pilgrim.`,
        `${name} just exorcised last night's turkey demon.`,
        `${name} just made stuffing come out the wrong way.`,
        `${name} just turned the bathroom into Plymouth Shock.`,
        `${name} just discovered why they call it a turkey dump.`,
        `${name} just made their own pumpkin pie... in reverse.`,
        `${name} just had their own Boston Pee Party.`,
        `${name} just gave birth to a food baby from hell.`,
        `${name} just made the toilet wish it was never carved.`,
        `${name} just performed a stuffing exorcism.`,
        `${name} just gave new meaning to "Turkey Day Dump".`,
        `${name} just made their own autumn harvest... in the bowl.`,
        `${name} just turned their insides into cranberry sauce.`,
        `${name} just had a feast exit through the wrong door.`,
        `${name} just made mashed potatoes look appetizing again.`,
        `${name} just gave thanks... to the toilet paper.`,
        `${name} just sparked the great turkey rebellion of 2024.`,
        `${name} just made the toilet regret its life choices.`,
        `${name} just created their own dark meat disaster.`,
        `${name} just stuffed the wrong turkey.`,
        `${name} just made the bathroom smell like grandma's cooking... gone wrong.`,
        `${name} just turned the bowl into a gravy boat from hell.`,
        `${name} just gave new meaning to "passing the potatoes".`,
        `${name} just made the toilet wish it was a garbage disposal instead.`,
        `${name} just created their own butternut squash nightmare.`,
        `${name} just showed the toilet what food coma really means.`,
        `${name} just made Black Friday come early... for the toilet.`,
        `${name} just pardoned a turkey... straight into the bowl.`,
        `${name} just turned their colon into a cornucopia.`,
        `${name} just gave birth to last year's leftovers.`,
        `${name} just made the toilet question its thanksgiving dinner.`,
        `${name} just created their own dark meat special.`,
        `${name} just had a pilgrim's revenge.`,
        `${name} just made the mayflower look like a pleasure cruise.`,
        `${name} just gave thanks for extra-strength toilet paper.`,
        `${name} just made their own autumn wind... indoors.`,
        `${name} just turned the bathroom into a horror story about stuffing.`,
        `${name} just gave the toilet PTSD from thanksgiving dinner.`,
        `${name} just made their own fall harvest... in winter.`,
        `${name} just created a feast the pilgrims never wrote about.`,
        `${name} just made the toilet consider vegetarianism.`,
        `${name} just gave new meaning to "turkey with all the trimmings".`,
        `${name} just made the bathroom smell like autumn... in hell.`,
        `${name} just turned their digestion into a horror story.`,
        `${name} just created their own dark chapter of thanksgiving history.`,
        `${name} just made the toilet wish it was at kids' table instead.`,
        `${name} just unleashed a cornucopia of horrors.`,
        `${name} just gave new meaning to "turkey day parade".`,
        `${name} just made their mark on thanksgiving tradition.`,
        `${name} just created their own fall festival... of horror.`,
        `${name} just gave the toilet something to be thankful for.`,
        `${name} just made their own pumpkin spice nightmare.`,
        `${name} just turned the bathroom into a pilgrim's worst nightmare.`,
        `${name} just created their own thanksgiving massacre.`,
        `${name} just made the toilet reconsider its career choice.`,
        `${name} just gave birth to the dark side of thanksgiving.`,
        `${name} just turned their colon into a haunted hayride.`,
        `${name} just made the bathroom smell like Satan's kitchen.`,
        `${name} just created their own fall colors... all brown.`,
        `${name} just gave the toilet a reason to fear November.`,
        `${name} just made their own autumn leaves... from the inside.`,
        `${name} just turned dinner into a horror show.`,
        `${name} just made the toilet wish it was a compost bin.`,
        `${name} just created their own twisted thanksgiving tradition.`,
        `${name} just gave new meaning to "stuffed turkey".`,
        `${name} just made the bathroom mirror fog up in terror.`,
        `${name} just unleashed last night's feast from hell.`,
        `${name} just turned the toilet into a crime scene.`,
        `${name} just made their own dark harvest.`,
        `${name} just gave the plumber job security.`,
        `${name} just created their own fall foliage... in the bowl.`,
        `${name} just made the toilet consider early retirement.`,
        `${name} just turned thanksgiving into thanks-grieving.`,
        `${name} just made their own autumn storm... indoors.`,
        `${name} just gave the toilet something to remember.`,
        `${name} just created their own fall festival finale.`,
        `${name} just made the bathroom air freshener quit its job.`,
        `${name} just turned their digestion into a horror movie.`,
        `${name} just made their own cranberry nightmare.`,
        `${name} just gave the toilet a reason to hate holidays.`,
        `${name} just created their own autumn apocalypse.`,
        `${name} just made the bathroom declare a state of emergency.`,
        `${name} just turned thanksgiving dinner into a revenge plot.`,
        `${name} just made their own fall from grace.`,
        `${name} just gave the toilet bowl PTSD.`,
        `${name} just created their own turkey day tragedy.`,
        `${name} just made the bathroom tiles try to escape.`,
        `${name} just turned the toilet into a witness protection program.`,
        `${name} just made their own autumn exodus.`,
        `${name} just gave new meaning to "turkey shoot".`,
        `${name} just created their own pilgrim's progress... backwards.`,
        `${name} just made the toilet question its life purpose.`,
        `${name} just turned thanksgiving into a cautionary tale.`,
        `${name} just made their own fall finale.`,
        `${name} just gave the sewers something to gossip about.`,
        `${name} just created their own thanksgiving horror story.`,
        `${name} just made the toilet wish it was a bird bath.`,
        `${name} just turned dinner into a dark comedy.`,
        `${name} just made their own autumn ritual gone wrong.`,
        `${name} just gave the bathroom a reason to call therapy.`,
        `${name} just created their own fall from heaven.`,
        `${name} just made the toilet contemplate its existence.`,
        `${name} just turned the feast into a nightmare.`,
        `${name} just made their own autumn sacrifice.`,
        `${name} just gave the bathroom something to write home about.`
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
            title = '🦃 Grand Gobbler';
        } else if (index === 1) {
            rankClass = 'rank-2';
            icon = '🥈';
            title = '🦃 Deputy Drumstick';
        } else if (index === 2) {
            rankClass = 'rank-3';
            icon = '🥉';
            title = '🦃 Bronze Butterball';
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
    let colors = [
        '#8B4513',  // Saddle brown
        '#D2691E',  // Chocolate
        '#CD853F',  // Peru
        '#A0522D',  // Sienna
        '#B8860B',  // Dark goldenrod
        '#DAA520',  // Goldenrod
        '#CC5500'   // Burnt orange
     ]; // Add more colors as needed
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
    let colors = [
        '#8B4513',  // Saddle brown
        '#D2691E',  // Chocolate
        '#CD853F',  // Peru
        '#A0522D',  // Sienna
        '#B8860B',  // Dark goldenrod
        '#DAA520',  // Goldenrod
        '#CC5500'   // Burnt orange
     ];
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
        colors: [
            '#8B4513',  // Saddle brown
            '#D2691E',  // Chocolate
            '#CD853F',  // Peru
            '#A0522D',  // Sienna  
            '#B8860B',  // Dark goldenrod
            '#DAA520'   // Goldenrod
         ],
         fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: [
                    '#CC5500',  // Burnt orange
                    '#B8860B',  // Dark goldenrod
                    '#A0522D',  // Sienna
                    '#8B4513',  // Saddle brown 
                    '#D2691E',  // Chocolate
                    '#CD853F'   // Peru
                ],
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
        colors: [
            '#8B4513',  // Saddle brown 
            '#D2691E',  // Chocolate
            '#CD853F',  // Peru 
            '#A0522D',  // Sienna
            '#B8860B',  // Dark goldenrod
            '#DAA520'   // Goldenrod
         ],
         fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: [
                    '#CC5500',  // Burnt orange
                    '#B8860B',  // Dark goldenrod
                    '#A0522D',  // Sienna
                    '#8B4513',  // Saddle brown
                    '#D2691E',  // Chocolate
                    '#CD853F'   // Peru
                ],
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
        colors: [
            '#8B4513',  // Saddle brown 
            '#D2691E',  // Chocolate
            '#CD853F',  // Peru
            '#A0522D',  // Sienna  
            '#B8860B',  // Dark goldenrod
            '#DAA520'   // Goldenrod
         ]
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

function triggerConfetti() {
    const colors = [
        '#8B4513',  // Saddle brown
        '#D2691E',  // Chocolate
        '#CD853F',  // Peru
        '#A0522D'   // Sienna
    ];
    const shapes = ['🦃', '🍂', '🍁', '🌰', '🥧'];
    
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors
    });
 }

function playFartNoise() {
    const audio = document.getElementById('fart-noise');
    audio.play();
}
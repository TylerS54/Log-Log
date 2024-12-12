var globalChart, globalCumulativeChart, globalDayOfWeekChart;

function sendTelegramMessage(name) {
    const botToken = '6741155054:AAGSjlsqa7xbJGHkKq9uEREUjNSO22yn6KE';
    const chatId = '-1002084507637';
    const messages = [
        `${name} just made their own Christmas pudding... the wrong way.`,
        `${name} just turned the snow yellow AND brown.`,
        `${name} just made Frosty the Snowman run for his life.`,
        `${name} just gave Santa a reason to skip this house.`,
        `${name} just made the sugarplums spoil.`,
        `${name} just turned Winter Wonderland into Winter Blunderland.`,
        `${name} just gave new meaning to roasting chestnuts.`,
        `${name} just made the carolers sing off-key.`,
        `${name} just turned the white Christmas brown.`,
        `${name} just made the polar bears evacuate.`,
        `${name} just gave Mrs. Claus's cookies some competition.`,
        `${name} just created their own hot chocolate... sort of.`,
        `${name} just made the nutcracker surrender.`,
        `${name} just made the Christmas star dim.`,
        `${name} just gave the gift nobody wanted.`,
        `${name} just made candy canes lose their appetite.`,
        `${name} just turned sleigh bells into slay bells.`,
        `${name} just made the Christmas coal look good.`,
        `${name} just gave the angels a reason to stay in heaven.`,
        `${name} just made the advent calendar skip a day.`,
        `${name} just turned fairy lights into scary nights.`,
        `${name} just made the wreath wither.`,
        `${name} just gave new meaning to holiday log.`,
        `${name} just made the tinsel tangle in fear.`,
        `${name} just turned eggnog into oh-no-nog.`,
        `${name} just made the icicles melt in protest.`,
        `${name} just gave the gift that keeps on stinking.`,
        `${name} just made the holly jolly less jolly.`,
        `${name} just turned deck the halls into wreck the stalls.`,
        `${name} just made the mistletoe move to another doorway.`,
        `${name} just gave Santa's list a brown smudge.`,
        `${name} just made the Christmas villages evacuate.`,
        `${name} just turned silver bells into sulfur smells.`,
        `${name} just made the figgy pudding jealous.`,
        `${name} just gave Grandma a reason to skip Christmas dinner.`,
        `${name} just made the stockings unstuff themselves.`,
        `${name} just turned winter magic into winter tragic.`,
        `${name} just made the ornaments dim their shine.`,
        `${name} just gave the fruitcake a run for its money.`,
        `${name} just made the wassail waste away.`,
        `${name} just turned Christmas cheer into Christmas fear.`,
        `${name} just made the poinsettias wilt on sight.`,
        `${name} just gave new meaning to Christmas present.`,
        `${name} just made the ribbon curl in disgust.`,
        `${name} just turned Christmas lights into fright nights.`,
        `${name} just made the garland gag.`,
        `${name} just gave the gift wrap a reason to tear.`,
        `${name} just made the cranberry sauce look appealing.`,
        `${name} just turned frost into forced evacuation.`,
        `${name} just made the snowflakes change direction.`,
        `${name} just gave pine trees a new air freshener competitor.`,
        `${name} just made the yule log look like a better option.`,
        `${name} just turned winter blues into winter poos.`,
        `${name} just made the hot cocoa cold with fear.`,
        `${name} just gave the chimney PTSD.`,
        `${name} just made the snow angels leave.`,
        `${name} just turned Christmas spirit into toilet spirit.`,
        `${name} just made the gingerbread house condemn itself.`,
        `${name} just gave Rudolph's nose a new red competitor.`,
        `${name} just made the star on top shoot away.`,
        `${name} just turned winter solstice into winter sol-piss.`,
        `${name} just made the candy canes lose their stripes.`,
        `${name} just made the Christmas cards seal themselves.`,
        `${name} just turned white winter into brown winter.`,
        `${name} just made the pinecones close up.`,
        `${name} just gave the reindeer games a new challenge.`,
        `${name} just made the snowballs refuse to form.`,
        `${name} just turned Christmas carols into Christmas quarrels.`,
        `${name} just made the mittens run bare-handed.`,
        `${name} just gave the North Star a new direction.`,
        `${name} just made the gift tags censored.`,
        `${name} just turned holiday spirit into toilet spirit.`,
        `${name} just made the baubles bounce away.`,
        `${name} just gave Santa's beard a reason to grey faster.`,
        `${name} just made the tinsel take a timeout.`,
        `${name} just turned Christmas tree into Christmas flee.`,
        `${name} just made the snow globe go brown.`,
        `${name} just gave the holiday ham competition.`,
        `${name} just made the ribbon reject its presents.`,
        `${name} just turned festive season into excessive season.`,
        `${name} just made the stockings stuff themselves.`,
        `${name} just gave the shepherds a new star to follow.`,
        `${name} just made the bells stop jingling.`,
        `${name} just turned winter white into winter fright.`,
        `${name} just made the ice sculptures melt in protest.`,
        `${name} just gave the Christmas wreath a new scent.`,
        `${name} just made the candy dish empty itself.`,
        `${name} just turned season's greetings into season's retreatings.`,
        `${name} just made the gift boxes seal permanently.`,
        `${name} just gave the Christmas feast indigestion.`,
        `${name} just made the snowmen emigrate south.`,
        `${name} just turned holiday cheer into holiday clear-out.`,
        `${name} just made the sleigh bells ring for help.`,
        `${name} just gave the fireplace something to really burn.`,
        `${name} just made the holly berry unholy.`,
        `${name} just turned Christmas magic into tragic.`,
        `${name} just made the evergreens ever-leave.`,
        `${name} just gave December a new scent calendar.`,
        `${name} just made the winter palace need new plumbing.`,
        `${name} just turned Christmas past into Christmas fast.`,
        `${name} just made the reindeer request transfer papers.`,
        `${name} just made the gift wrap beg for mercy.`,
        `${name} just turned festive into protestive.`,
        `${name} just made the North Pole shift south.`
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
            title = '🎅 Santa\'s Favorite';
        } else if (index === 1) {
            rankClass = 'rank-2';
            icon = '🥈';
            title = '🦌 Rudolph\'s Runner-up';
        } else if (index === 2) {
            rankClass = 'rank-3';
            icon = '🥉';
            title = '🧝 Edging Elf';
        } else {
            title = 'Workshop Elf';
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
    .then(response => response.text())
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
        '#C41E3A',  // Christmas Red
        '#228B22',  // Forest Green
        '#FFD700',  // Gold
        '#A91B0D',  // Dark Red
        '#1B4D3E',  // Dark Green
        '#B8860B'   // Dark Gold
    ];
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
        '#C41E3A',  // Christmas Red
        '#228B22',  // Forest Green
        '#FFD700',  // Gold
        '#A91B0D',  // Dark Red
        '#1B4D3E',  // Dark Green
        '#B8860B'   // Dark Gold
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

    const chartColors = [
        '#C41E3A',  // Christmas Red
        '#228B22',  // Forest Green
        '#FFD700',  // Gold
        '#A91B0D',  // Dark Red
        '#1B4D3E',  // Dark Green
        '#B8860B'   // Dark Gold
    ];

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
        colors: chartColors,
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

    const chartColors = [
        '#C41E3A',  // Christmas Red
        '#228B22',  // Forest Green
        '#FFD700',  // Gold
        '#A91B0D',  // Dark Red
        '#1B4D3E',  // Dark Green
        '#B8860B'   // Dark Gold
    ];


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
        colors: chartColors,
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

    const chartColors = [
        '#C41E3A',  // Christmas Red
        '#228B22',  // Forest Green
        '#FFD700',  // Gold
        '#A91B0D',  // Dark Red
        '#1B4D3E',  // Dark Green
        '#B8860B'   // Dark Gold
    ];

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
        colors: chartColors
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

// Add these chart rendering functions to script.js

function renderHeatmap(userStats) {
    const calendarOptions = {
        series: [{
            name: 'Logs',
            data: userStats.heatmapData.map(item => ({
                x: new Date(item.date).getTime(),
                y: item.value
            })).sort((a, b) => a.x - b.x)
        }],
        chart: {
            height: 350,
            type: 'heatmap',
            toolbar: {
                show: true
            },
            animations: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            heatmap: {
                enableShades: true,
                distributed: true,
                radius: 0,
                useFillColorAsStroke: true,
                colorScale: {
                    ranges: [
                        {
                            from: 0,
                            to: 0,
                            color: '#FFF3E4',
                            name: '0 logs',
                        },
                        {
                            from: 1,
                            to: 1,
                            color: '#CD853F',
                            name: '1 log',
                        },
                        {
                            from: 2,
                            to: 2,
                            color: '#A0522D',
                            name: '2 logs',
                        },
                        {
                            from: 3,
                            to: 999,
                            color: '#8B4513',
                            name: '3+ logs',
                        }
                    ]
                }
            }
        },
        legend: {
            show: true,
            position: 'bottom',
            fontSize: '14px',
            onItemHover: {
                highlightDataSeries: false
            }
        },
        grid: {
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            xaxis: {
                lines: {
                    show: false
                }
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                format: 'MM/dd',
                style: {
                    fontSize: '12px'
                }
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            show: false
        },
        tooltip: {
            custom: function({series, seriesIndex, dataPointIndex, w}) {
                const date = new Date(w.globals.seriesX[seriesIndex][dataPointIndex]);
                const value = series[seriesIndex][dataPointIndex];
                return `<div class="apexcharts-tooltip-title">${date.toLocaleDateString()}</div>
                        <div class="apexcharts-tooltip-series-group">
                            <span>Logs: ${value}</span>
                        </div>`;
            }
        }
    };
 
    new ApexCharts(document.querySelector("#heatmap"), calendarOptions).render();
 }

function renderTimeTrend(userStats) {
    const timeOptions = {
        series: [{
            name: 'Hourly Activity',
            data: userStats.hourlyDistribution
        }],
        chart: {
            type: 'bar',
            height: 250
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: '80%',
            }
        },
        colors: ['#8B4513'],
        xaxis: {
            categories: Array.from({length: 24}, (_, i) => 
                `${String(i).padStart(2, '0')}:00`
            ),
            labels: {
                rotate: -45
            }
        },
        yaxis: {
            title: {
                text: 'Total Logs',
                style: {
                    color: '#5C3D2E'
                }
            }
        },
        title: {
            text: 'Time of Day Distribution (UTC)',
            style: {
                color: '#5C3D2E'
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'vertical',
                shadeIntensity: 0.5,
                gradientToColors: ['#A91B0D'],
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        }
    };

    new ApexCharts(document.querySelector("#timeTrend"), timeOptions).render();
}

function updatePersonalBests(stats) {
    document.getElementById('personalBests').innerHTML = `
        <div class="stat-item">
            <div class="stat-label">Daily Best</div>
            <div class="stat-value">${stats.dailyMax}</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Weekly Best</div>
            <div class="stat-value">${stats.weeklyMax}</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Monthly Best</div>
            <div class="stat-value">${stats.monthlyMax}</div>
        </div>
    `;
}

function updateTimeOfDay(stats) {
    const peakHour = stats.hourlyDistribution.indexOf(
        Math.max(...stats.hourlyDistribution)
    );
    
    // Convert UTC to ET
    const peakHourET = (peakHour - 4 + 24) % 24;
    
    // For morning (6-12 ET), need UTC 10-16
    const morningCount = stats.hourlyDistribution
        .slice(10, 16)
        .reduce((a, b) => a + b, 0);
    
    // For evening (12-20 ET), need UTC 16-24
    const eveningCount = stats.hourlyDistribution
        .slice(16, 24)
        .reduce((a, b) => a + b, 0);

    document.getElementById('timeOfDay').innerHTML = `
        <div class="stat-item">
            <div class="stat-label">Peak Hour (ET)</div>
            <div class="stat-value">${String(peakHourET).padStart(2, '0')}:00</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Morning (6-12 ET)</div>
            <div class="stat-value">${morningCount}</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Evening (12-20 ET)</div>
            <div class="stat-value">${eveningCount}</div>
        </div>
    `;
}

function updateActiveStreak(stats) {
    document.getElementById('activeStreak').innerHTML = `
        <div class="stat-item">
            <div class="stat-label">Longest Streak</div>
            <div class="stat-value">${stats.activeStreak} days</div>
        </div>
    `;
}

function updateMonthlyAvg(stats) {
    document.getElementById('monthlyAvg').innerHTML = `
        <div class="stat-item">
            <div class="stat-label">Monthly Average</div>
            <div class="stat-value">${stats.monthlyAvg.toFixed(1)}</div>
        </div>
    `;
}

function showUserMetrics(username, data) {
    const userModal = document.getElementById('userModal');
    const userName = document.getElementById('userName');
    userName.textContent = username;

    // Calculate metrics
    const userStats = calculateUserStats(username, data[username]);
    
    // Update UI
    updatePersonalBests(userStats);
    updateTimeOfDay(userStats);
    updateActiveStreak(userStats);
    updateMonthlyAvg(userStats);
    renderHeatmap(userStats);
    renderTimeTrend(userStats);

    userModal.style.display = 'block';
}

function calculateUserStats(username, userData) {
    const stats = {
        dailyMax: 0,
        weeklyMax: 0,
        monthlyMax: 0,
        hourlyDistribution: new Array(24).fill(0),
        activeStreak: 0,
        monthlyAvg: 0,
        timeData: [],
        heatmapData: []
    };

    // Process each timestamp
    const dailyCounts = {};
    const weeklyCounts = {};
    const monthlyCounts = {};

    for (let timestamp in userData) {
        const date = new Date(timestamp.substring(0, 13).replace('T', ' ') + ':00:00');
        const dateKey = date.toISOString().split('T')[0];
        const weekKey = `${date.getFullYear()}-W${getWeekNumber(date)}`;
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const hour = date.getHours();

        // Daily counts
        dailyCounts[dateKey] = (dailyCounts[dateKey] || 0) + userData[timestamp];
        stats.dailyMax = Math.max(stats.dailyMax, dailyCounts[dateKey]);

        // Weekly counts
        weeklyCounts[weekKey] = (weeklyCounts[weekKey] || 0) + userData[timestamp];
        stats.weeklyMax = Math.max(stats.weeklyMax, weeklyCounts[weekKey]);

        // Monthly counts
        monthlyCounts[monthKey] = (monthlyCounts[monthKey] || 0) + userData[timestamp];
        stats.monthlyMax = Math.max(stats.monthlyMax, monthlyCounts[monthKey]);

        // Hourly distribution
        stats.hourlyDistribution[hour] += userData[timestamp];

        // Time series data
        stats.timeData.push({
            x: date.getTime(),
            y: userData[timestamp]
        });
    }

    // Calculate monthly average
    const months = Object.keys(monthlyCounts).length;
    const totalCount = Object.values(monthlyCounts).reduce((a, b) => a + b, 0);
    stats.monthlyAvg = months > 0 ? totalCount / months : 0;

    // Calculate active streak
    stats.activeStreak = calculateStreak(dailyCounts);

    // Generate heatmap data
    stats.heatmapData = generateHeatmapData(dailyCounts);

    return stats;
}

function calculateStreak(dailyCounts) {
    const dates = Object.keys(dailyCounts).sort();
    let currentStreak = 0;
    let maxStreak = 0;

    for (let i = 0; i < dates.length; i++) {
        if (i > 0) {
            const curr = new Date(dates[i]);
            const prev = new Date(dates[i-1]);
            const diffDays = Math.floor((curr - prev) / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                currentStreak++;
            } else {
                currentStreak = 1;
            }
        } else {
            currentStreak = 1;
        }
        maxStreak = Math.max(maxStreak, currentStreak);
    }

    return maxStreak;
}

function generateHeatmapData(dailyCounts) {
    return Object.entries(dailyCounts).map(([date, count]) => ({
        date,
        value: count
    }));
}

// Replace the existing click handler with this:
document.addEventListener('DOMContentLoaded', function() {
    const highscoreDiv = document.getElementById('highscore');
    
    if (highscoreDiv) {
        const clickHandler = function(e) {
            const entry = e.target.closest('.highscore-entry');
            if (entry) {
                e.preventDefault();
                const username = entry.querySelector('.name').textContent.split(' - ')[0];
                fetch('https://us-central1-loglog-a3cf1.cloudfunctions.net/getCounts')
                    .then(response => response.json())
                    .then(data => showUserMetrics(username, data));
            }
        };

        // Remove any existing listeners
        highscoreDiv.removeEventListener('click', clickHandler);
        // Add the new listener
        highscoreDiv.addEventListener('click', clickHandler);
    }

    // Close modal
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('userModal').style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('userModal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

function triggerConfetti() {
    // A single, crisp burst of confetti in holiday colors with a neon twist
    const end = Date.now() + 1000;
    const colors = ['#C41E3A', '#228B22', '#FFD700', '#00FFB3', '#FF00CC'];

    (function frame() {
        confetti({
            particleCount: 5,
            startVelocity: 20,
            spread: 60,
            origin: { y: 0.7 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function playFartNoise() {
    const audio = document.getElementById('fart-noise');
    audio.play();
}
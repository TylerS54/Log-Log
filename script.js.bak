var globalChart, globalCumulativeChart, globalDayOfWeekChart;
var fullData = null;          // Will hold all fetched data
var selectedYear = new Date().getFullYear(); // Default to current year

function sendTelegramMessage(name) {
    const botToken = '6741155054:AAGSjlsqa7xbJGHkKq9uEREUjNSO22yn6KE';
    const chatId = '-1002084507637';
    const messages = [
        `${name} just dropped a presidential campaign in the porcelain polls.`,
        `${name} just gave the toilet a State of the Feces address.`,
        `${name} just pulled off a number two coup d’état.`,
        `${name} just painted the porcelain like Picasso on a bad day.`,
        `${name} just unleashed a brown revolution in the Oval Office… of the bathroom.`,
        `${name} just turned the toilet bowl into a war zone, and it surrendered.`,
        `${name} just donated a mudslide to the city’s waste management department.`,
        `${name} just made the sewer rats reconsider their life choices.`,
        `${name} just performed a one-man show of “Phantom of the Crapera.”`,
        `${name} just lost a close election to the toilet’s flushing mechanism.`,
        `${name} just committed an act so foul, even the skunks are offended.`,
        `${name} just expressed their darkest secrets… in the form of excrement.`,
        `${name} just unleashed more destruction than a failed nuclear test.`,
        `${name} just staged a coup in their colon, and the rebels won.`,
        `${name} just re-enacted the Black Plague… with their bowels.`,
        `${name} just wrote a resignation letter in stench form.`,
        `${name} just tested the plumbing’s loyalty to the nation.`,
        `${name} just dropped something that made the toilet question its career path.`,
        `${name} just gave the Grim Reaper a run for his money—brown was definitely the color of doom.`,
        `${name} just did a brown exorcism, and the demons are still screaming.`,
        `${name} just made the entire plumbing system file for early retirement.`,
        `${name} just turned the restroom into a crime scene—call the FBI.`,
        `${name} just took “going with the flow” to catastrophic levels.`,
        `${name} just raised the bathroom’s terror alert to code brown.`,
        `${name} just unleashed more hot air than a political press conference.`,
        `${name} just gave new meaning to “running for office”—straight to the toilet.`,
        `${name} just brought tears to the eyes of innocent bystanders… from two rooms away.`,
        `${name} just launched a new wave of biological warfare in their own home.`,
        `${name} just tried to flush out all the world’s problems—starting with that burrito.`,
        `${name} just held a summit with Taco Tuesday, and the negotiations broke down violently.`,
        `${name} just provided enough fertilizer to feed the entire county’s crops.`,
        `${name} just discovered a new species in the toilet, and it’s not friendly.`,
        `${name} just turned the restroom into a three-act tragedy, starring their colon.`,
        `${name} just outperformed any horror movie special effects team.`,
        `${name} just introduced the toilet to the concept of eternal suffering.`,
        `${name} just gifted the sewage plant a brand-new reason to unionize.`,
        `${name} just unleashed an unholy ritual that would scare the devil himself.`,
        `${name} just made the plumber’s phone ring off the hook—emergency meeting required.`,
        `${name} just made a deposit so large, the bank called to verify the transaction.`,
        `${name} just triggered a motion alarm in the sewer system—nobody is safe.`,
        `${name} just initiated the darkest timeline for the sanitation department.`,
        `${name} just left a memorial service in the toilet bowl—for that burrito’s short life.`,
        `${name} just taught the pipe system new swear words in every language.`,
        `${name} just discovered the backside of democracy… and it’s not looking good.`,
        `${name} just performed a power move so toxic, the EPA has been alerted.`,
        `${name} just experienced a meltdown more catastrophic than any stock market crash.`,
        `${name} just redefined the meaning of ‘explosive personality.’`,
        `${name} just forced the CDC to issue new guidelines on personal bathroom usage.`,
        `${name} just made the toilet wish it had a witness protection program.`,
        `${name} just wrote a very dark chapter in the history of bodily functions.`,
        `${name} just ran a covert operation and left no survivors—except the plunger.`,
        `${name} just broke the Geneva Conventions with that biological assault.`,
        `${name} just left the seat looking like a Jackson Pollock tribute gone wrong.`,
        `${name} just turned the toilet water into a swirling vortex of regret.`,
        `${name} just flushed away more dignity than any politician’s scandal.`,
        `${name} just held a funeral for last night’s dinner—no open casket allowed.`,
        `${name} just made the phrase “shock and awe” sound like child’s play.`,
        `${name} just unleashed the next pandemic—patient zero is the poor toilet.`,
        `${name} just summoned Cthulhu with their bowel incantation.`,
        `${name} just ran out of diplomatic immunity for that atrocity.`,
        `${name} just caused every candle in the house to wave a white flag.`,
        `${name} just created a stink so potent, it’s now on a terrorist watch list.`,
        `${name} just tested the durability of porcelain under extreme pressure.`,
        `${name} just initiated a worldwide shortage of air freshener.`,
        `${name} just made the plumber double his rates—hazard pay, indeed.`,
        `${name} just turned the restroom into the darkest circle of Dante’s Inferno.`,
        `${name} just turned Taco Tuesday into a war crime Wednesday.`,
        `${name} just made the water company send an apology letter to the neighbor’s pipes.`,
        `${name} just stepped down from their own personal throne—still not impeached, though.`,
        `${name} just hosted a private showing of “When Burritos Strike Back.”`,
        `${name} just made the toilet ask for asylum in another country.`,
        `${name} just orchestrated a mass evacuation—of their own bowels.`,
        `${name} just taught the entire neighborhood the meaning of ‘silent but deadly.’`,
        `${name} just wrote a love letter to the toilet, sealed with a stench.`,
        `${name} just re-enacted the apocalypse in the privacy of a four-walled chamber.`,
        `${name} just gave the exhaust fan PTSD—it may never spin again.`,
        `${name} just produced more substance than a politician’s entire manifesto.`,
        `${name} just forced the bathroom scale to file a missing persons report.`,
        `${name} just gave the plunger a nervous breakdown—therapy recommended.`,
        `${name} just rewrote the dictionary under the word ‘evacuation.’`,
        `${name} just redrew the map of the toilet bowl with extreme prejudice.`,
        `${name} just took the scenic route to digestive Armageddon.`,
        `${name} just left a legacy that can’t be unclogged without government aid.`,
        `${name} just put the words ‘porcelain’ and ‘catastrophe’ in the same sentence.`,
        `${name} just commanded their bowels to perform a filibuster on the toilet.`,
        `${name} just left the ventilation system begging for a career change.`,
        `${name} just proved that even gravity has limits to what it can handle.`,
        `${name} just gave a lecture on “Letting Go,” with explosive visual aids.`,
        `${name} just unleashed the kind of stench that unites political parties in fear.`,
        `${name} just authored a 10-volume series called “The Brown Chronicles.”`,
        `${name} just made the term ‘dirty politics’ take on a whole new meaning.`,
        `${name} just performed a live demonstration of Newton’s Third Law—every action has an equal and horrifying reaction.`,
        `${name} just woke up the dead with that unearthly odor—zombies are complaining.`,
        `${name} just created a new national emergency, starring their colon as the villain.`,
        `${name} just caused the bathroom mirror to file for a restraining order.`,
        `${name} just held an impeachment trial for last night’s dinner, and it was unanimously removed.`,
        `${name} just orchestrated the Great Escape—only it was all from one end.`,
        `${name} just redefined climate change in their personal ozone layer.`,
        `${name} just caused the sewage system to release a press statement: ‘We surrender!’`,
        `${name} just graduated from the School of Hard Plops with top honors.`
    ];

    
    const text = messages[Math.floor(Math.random() * messages.length)];
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}


function parseAndConvertUTCToNaiveET(rawTS) {
    // rawTS example: "2025-02-10T16"
    // Convert that to a proper UTC Date
    const dateUTC = new Date(rawTS.substring(0, 13).replace('T', ' ') + ":00:00");
  
    // Create a copy so we don’t mutate the original
    const dateET = new Date(dateUTC.valueOf());
    // Subtract 5 hours to approximate ET
    dateET.setHours(dateET.getHours() - 5);
  
    return dateET;
  }
  

function getDataForSelectedYear(data) {
    let filtered = {};
  
    for (let user in data) {
      for (let utcTS in data[user]) {
        // Convert from UTC to naive ET
        const dateET = parseAndConvertUTCToNaiveET(utcTS);
        const yearET = dateET.getFullYear();
  
        if (yearET === parseInt(selectedYear, 10)) {
          // Build a new "ET-based" timestamp string for storing
          const newETTS = formatDateET_naive(dateET);
  
          if (!filtered[user]) filtered[user] = {};
          // Re-use the same counts
          filtered[user][newETTS] = data[user][utcTS];
        }
      }
    }
    return filtered;
  }

function formatDateET_naive(dateET) {
    const yyyy = dateET.getFullYear();
    const mm = String(dateET.getMonth() + 1).padStart(2, '0');
    const dd = String(dateET.getDate()).padStart(2, '0');
    const hh = String(dateET.getHours()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}`;
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
            title = 'Champion';
        } else if (index === 1) {
            rankClass = 'rank-2';
            icon = '🥈';
            title = 'Second Place';
        } else if (index === 2) {
            rankClass = 'rank-3';
            icon = '🥉';
            title = 'Third Place';
        } else {
            title = 'Participant';
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

function incrementCounter(name) {
    // Trigger visual and audio feedback immediately
    showInProgressState(name);
    triggerConfetti();
    playFartNoise();

    var now = new Date();
    var timestamp = now.toISOString().split(':')[0]; // YYYY-MM-DDTHH:MM

    fetch('https://us-central1-loglog-a3cf1.cloudfunctions.net/incrementCounter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, timestamp })
    })
    .then(response => response.text())
    .then(data => {
        showConfirmation(name);
    })
    .catch(error => {
        console.error('Error:', error);
        revertInProgressState();
    });
}

function showInProgressState(name) {
    disableButtons();
    var confirmationElement = document.getElementById('confirmation');
    confirmationElement.innerText = `Logging ${name}'s poop... Please wait.`;
    confirmationElement.style.display = 'block';
}

function revertInProgressState() {
    var buttons = document.querySelectorAll('button');
    buttons.forEach(function(button) {
        button.disabled = false;
        button.style.opacity = 1;
    });
    var confirmationElement = document.getElementById('confirmation');
    confirmationElement.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('fart-noise');
    audio.load(); // Preload audio

    // Radio buttons for daily/weekly
    var chartViewRadios = document.querySelectorAll('input[type="radio"][name="chartView"]');
    chartViewRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateDisplay(this.value);
        });
    });

    // Fetch data only once; then filter it by year & chartView
    fetch('https://us-central1-loglog-a3cf1.cloudfunctions.net/getCounts')
        .then(response => response.json())
        .then(data => {
            fullData = data;
            // Build the year dropdown from all timestamps in data
            populateYearDropdown(data);
            // Initial chart load
            updateDisplay('daily');
        })
        .catch(error => console.error('Error:', error));
});

function populateYearDropdown(data) {
    let years = new Set();
    for (let user in data) {
        for (let ts in data[user]) {
            // ts is something like '2023-07-30T12'
            let year = ts.split('-')[0]; // '2023'
            years.add(year);
        }
    }
    // Sort descending or ascending as you prefer
    let sortedYears = Array.from(years).sort();

    let dropdown = document.getElementById('yearDropdown');
    dropdown.innerHTML = '';
    sortedYears.forEach((yr) => {
        let option = document.createElement('option');
        option.value = yr;
        option.text = yr;
        dropdown.appendChild(option);
    });

    // Default to current year if available, else the last in sorted list
    if (sortedYears.includes(selectedYear.toString())) {
        dropdown.value = selectedYear;
    } else {
        dropdown.value = sortedYears[sortedYears.length - 1];
        selectedYear = dropdown.value;
    }

    // Update selectedYear on change
    dropdown.addEventListener('change', function(e) {
        selectedYear = e.target.value;
        let currentView = document.querySelector('input[name="chartView"]:checked').value;
        updateDisplay(currentView);
    });
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
    confirmationElement.innerText = `${name}'s poop has been logged.`;
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
        '#bb86fc', // primary
        '#03dac5', // secondary
        '#ff0266', // example bright pink
        '#ffb300', // yellowish
        '#cf6679', // red-pink
      ];
      
    let colorIndex = 0;

    for (let user in data) {
        let dataPoints = {};
        for (let etTS in data[user]) {
            // We stored ET-based keys, so parse them back to a Date
            let dateET = new Date(etTS.substring(0, 13).replace('T', ' ') + ':00:00');
            // or reuse parseAndConvertUTCToNaiveET if needed
      
            let dateKey;
            if (chartView === 'daily') {
              // Daily grouping in ET
              dateKey = dateET.toISOString().split('T')[0];
            } else {
              // Weekly grouping in ET
              const weekNumber = getWeekNumber(dateET);
              dateKey = `${dateET.getFullYear()}-W${weekNumber}`;
            }
      
            dataPoints[dateKey] = (dataPoints[dateKey] || 0) + data[user][etTS];
          }

        seriesData.push({
            name: user,
            data: Object.entries(dataPoints).map(([key, value]) => {
                let date;
                if (chartView === 'daily') {
                    date = new Date(key);
                } else {
                    let [year, week] = key.split('-W');
                    date = new Date(year, 0, (wk - 1) * 7 + 1);
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
        '#bb86fc', // primary
        '#03dac5', // secondary
        '#ff0266', // example bright pink
        '#ffb300', // yellowish
        '#cf6679', // red-pink
      ];
      
    let colorIndex = 0;

    for (let user in data) {
        let total = 0;
        let dataPoints = [];
        let timestamps = Object.keys(data[user]).sort(); 
        // Sort ensures ascending date order so cumulative lines display correctly
        for (let time of timestamps) {
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

    return { series: seriesData };
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
        let row = { x: day };
        for (let user in seriesData) {
            row[user] = seriesData[user][index];
        }
        return row;
    });

    return formattedData;
}

function renderChart(chartData) {
    const options = {
        series: chartData.series,
        chart: {
            foreColor: '#FFF',
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
    const cumulativeOptions = {
        series: chartData.series,
        chart: {
            foreColor: '#FFF',
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
    let users = Object.keys(chartData[0]).filter(key => key !== 'x');
    let series = users.map(user => ({
        name: user,
        data: chartData.map(data => data[user])
    }));

    const options = {
        series: series,
        chart: {
            foreColor: '#FFF',
            type: 'bar',
            height: 350,
            stacked: true,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 4
            }
        },
        xaxis: {
            categories: chartData.map(data => data.x)
        },
        yaxis: {
            title: {
                text: 'Poops'
            },
            min: 0
        },
        fill: {
            opacity: 1
        }
    };

    if (!globalDayOfWeekChart) {
        globalDayOfWeekChart = new ApexCharts(document.querySelector("#dayOfWeekChart"), options);
        globalDayOfWeekChart.render();
    } else {
        globalDayOfWeekChart.updateOptions(options, true);
    }
}

function updateDisplay(chartView) {
    if (!fullData) return;
    let filtered = getDataForSelectedYear(fullData);

    if (chartView === 'daily' || chartView === 'weekly') {
        let chartData = processSnapshot(filtered, chartView);
        renderChart(chartData);

        if (!globalCumulativeChart) {
            let cumulativeData = processCumulativeSnapshot(filtered);
            renderCumulativeChart(cumulativeData);
        } else {
            // Always update cumulative if user toggles daily/weekly
            let cumulativeData = processCumulativeSnapshot(filtered);
            renderCumulativeChart(cumulativeData);
        }
    }
    updateHighscore(filtered);

    let dayOfWeekData = processDayOfWeekSnapshot(filtered);
    renderDayOfWeekChart(dayOfWeekData);
}

// Additional chart/metrics code for user modal, unchanged:
function renderHeatmap(userStats) {
    // Same as original – you can keep or simplify
    const calendarOptions = {
        series: [{
            name: 'Logs',
            data: userStats.heatmapData.map(item => ({
                x: new Date(item.date).getTime(),
                y: item.value
            })).sort((a, b) => a.x - b.x)
        }],
        chart: {
            foreColor: '#FFF',
            height: 350,
            type: 'heatmap',
            toolbar: { show: true },
            animations: { enabled: false }
        },
        dataLabels: { enabled: false },
        plotOptions: {
            heatmap: {
                enableShades: true,
                distributed: true,
                radius: 0,
                useFillColorAsStroke: true,
                colorScale: {
                    ranges: [
                        { from: 0,   to: 0,   color: '#e9ecef', name: '0 logs' },
                        { from: 1,   to: 1,   color: '#aed581', name: '1 log' },
                        { from: 2,   to: 2,   color: '#7cb342', name: '2 logs' },
                        { from: 3,   to: 999, color: '#558b2f', name: '3+ logs' }
                    ]
                }
            }
        },
        legend: { show: true, position: 'bottom', fontSize: '14px' },
        grid: {
            padding: { top: 0, right: 0, bottom: 0, left: 0 }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                format: 'MM/dd',
                style: { fontSize: '12px' }
            }
        },
        yaxis: { show: false },
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
            foreColor: '#FFF',
            type: 'bar',
            height: 250
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: '80%',
            }
        },
        colors: ['#007bff'],
        xaxis: {
            categories: Array.from({length: 24}, (_, i) => `${String(i).padStart(2, '0')}:00`),
            labels: { rotate: -45 }
        },
        yaxis: {
            title: {
                text: 'Total Logs',
                style: { color: '#6c757d' }
            }
        },
        title: {
            text: 'Time of Day Distribution (UTC)',
            style: { color: '#6c757d' }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'vertical',
                shadeIntensity: 0.5,
                gradientToColors: ['#17a2b8'],
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
    const peakHour = stats.hourlyDistribution.indexOf(Math.max(...stats.hourlyDistribution));
    const peakHourET = (peakHour - 4 + 24) % 24; // convert UTC to ET approx.

    // For morning (6-12 ET)
    const morningCount = stats.hourlyDistribution.slice(10, 16).reduce((a, b) => a + b, 0);
    // For evening (12-20 ET)
    const eveningCount = stats.hourlyDistribution.slice(16, 24).reduce((a, b) => a + b, 0);

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

    const userStats = calculateUserStats(username, data[username]);
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

    const dailyCounts = {};
    const weeklyCounts = {};
    const monthlyCounts = {};

    for (let timestamp in userData) {
        const date = new Date(timestamp.substring(0, 13).replace('T', ' ') + ':00:00');
        const dateKey = date.toISOString().split('T')[0];
        const weekKey = `${date.getFullYear()}-W${getWeekNumber(date)}`;
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const hour = date.getHours();

        // Daily
        dailyCounts[dateKey] = (dailyCounts[dateKey] || 0) + userData[timestamp];
        stats.dailyMax = Math.max(stats.dailyMax, dailyCounts[dateKey]);

        // Weekly
        weeklyCounts[weekKey] = (weeklyCounts[weekKey] || 0) + userData[timestamp];
        stats.weeklyMax = Math.max(stats.weeklyMax, weeklyCounts[weekKey]);

        // Monthly
        monthlyCounts[monthKey] = (monthlyCounts[monthKey] || 0) + userData[timestamp];
        stats.monthlyMax = Math.max(stats.monthlyMax, monthlyCounts[monthKey]);

        // Hourly
        stats.hourlyDistribution[hour] += userData[timestamp];

        stats.timeData.push({
            x: date.getTime(),
            y: userData[timestamp]
        });
    }

    // Monthly average
    const months = Object.keys(monthlyCounts).length;
    const totalCount = Object.values(monthlyCounts).reduce((a, b) => a + b, 0);
    stats.monthlyAvg = months > 0 ? totalCount / months : 0;

    // Active streak
    stats.activeStreak = calculateStreak(dailyCounts);

    // Heatmap data
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
    return Object.entries(dailyCounts).map(([date, value]) => ({
        date,
        value
    }));
}

// Highscore click => show user modal stats
document.addEventListener('DOMContentLoaded', function() {
    const highscoreDiv = document.getElementById('highscore');
    if (highscoreDiv) {
        const clickHandler = function(e) {
            const entry = e.target.closest('.highscore-entry');
            if (entry) {
                e.preventDefault();
                const username = entry.querySelector('.name').textContent.split(' - ')[0];
                // We only have filtered data in charts,
                // but for user details we can show *all* data or just the selected year’s data.
                // If you prefer just the selected year, filter first:
                let currentFiltered = getDataForSelectedYear(fullData);
                showUserMetrics(username, currentFiltered);
            }
        };
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
    // A simpler confetti burst
    const end = Date.now() + 1000;
    const colors = ['#007bff', '#17a2b8', '#6c757d', '#28a745', '#ff6347'];

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
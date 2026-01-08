var globalChart, globalCumulativeChart, globalDayOfWeekChart;
var fullData = null;          // Will hold all fetched data
var selectedYear = new Date().getFullYear(); // Default to current year

function sendTelegramMessage(name) {
    const botToken = '6741155054:AAGSjlsqa7xbJGHkKq9uEREUjNSO22yn6KE';
    const chatId = '-1002084507637';
    
    // Get a random message using the function from telegram-messages.js
    const text = window.telegramMessages.getRandomTelegramMessage(name);
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
  
    // Create a copy so we don't mutate the original
    const dateET = new Date(dateUTC.valueOf());
    // Subtract 5 hours to approximate ET (will be off during DST but that's acceptable)
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
            // All data is already in ET from the getDataForSelectedYear function
            let date = new Date(timestamp.substring(0, 13).replace('T', ' ') + ':00:00');
            // Create date key manually to preserve ET timezone (avoid toISOString which converts to UTC)
            let dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
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
            // Convert to ET before extracting year
            const dateET = parseAndConvertUTCToNaiveET(ts);
            let year = dateET.getFullYear().toString();
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

// New ET-friendly week calculation function
function getWeekNumber(d) {
    // ET-friendly week number calculation that doesn't convert to UTC
    // Get the local date components
    const year = d.getFullYear();
    const month = d.getMonth();
    const date = d.getDate();
    
    // Create a new date with the same local date components
    const tempDate = new Date(year, month, date);
    
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));
    
    // Get first day of year
    const yearStart = new Date(tempDate.getFullYear(), 0, 1);
    
    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil((((tempDate - yearStart) / 86400000) + 1) / 7);
    
    return weekNo;
}

function processSnapshot(data, chartView) {
    let seriesData = [];
    let colors = [
        '#6c5ce7', // primary purple
        '#00cec9', // secondary teal
        '#ff7675', // coral
        '#00b894', // green
        '#fdcb6e', // yellow
        '#e17055', // orange
        '#74b9ff', // light blue
        '#fd79a8', // pink
        '#a29bfe'  // light purple
    ];
      
    let colorIndex = 0;

    for (let user in data) {
        let dataPoints = {};
        for (let etTS in data[user]) {
            // We stored ET-based keys, so parse them back to a Date
            let dateET = new Date(etTS.substring(0, 13).replace('T', ' ') + ':00:00');
      
            let dateKey;
            if (chartView === 'daily') {
                // Daily grouping in ET
                // Create date key manually to preserve ET timezone (avoid toISOString which converts to UTC)
                dateKey = `${dateET.getFullYear()}-${String(dateET.getMonth() + 1).padStart(2, '0')}-${String(dateET.getDate()).padStart(2, '0')}`;
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
                    // Fixed the 'wk' variable to 'week'
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
        '#6c5ce7', // primary purple
        '#00cec9', // secondary teal
        '#ff7675', // coral
        '#00b894', // green
        '#fdcb6e', // yellow
        '#e17055', // orange
        '#74b9ff', // light blue
        '#fd79a8', // pink
        '#a29bfe'  // light purple
    ];
      
    let colorIndex = 0;

    for (let user in data) {
        let total = 0;
        let dataPoints = [];
        let timestamps = Object.keys(data[user]).sort(); 
        // Sort ensures ascending date order so cumulative lines display correctly
        for (let time of timestamps) {
            total += data[user][time];
            // Already in ET time (from filtered data)
            let dateET = new Date(time.substring(0, 13).replace('T', ' ') + ':00:00');
            dataPoints.push({
                x: dateET.getTime(),
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
            // Already in ET time (from filtered data)
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
            background: 'transparent',
            type: 'line',
            height: 350,
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            },
            fontFamily: 'Inter, system-ui, sans-serif'
        },
        colors: ['#6c5ce7', '#00cec9', '#ff7675', '#00b894', '#fdcb6e', '#e17055', '#74b9ff', '#fd79a8', '#a29bfe'],
        stroke: {
            curve: 'smooth',
            width: 3
        },
        markers: {
            size: 0,
            strokeWidth: 0,
            hover: {
                size: 5, sizeOffset: 3
            }
        },
        grid: {
            borderColor: '#2d2d3a',
            strokeDashArray: 4,
            xaxis: {
                lines: {
                    show: true
                }
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 10
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function(value) {
                    return value + (value === 1 ? ' log' : ' logs');
                }
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                style: {
                    fontSize: '12px',
                    fontWeight: 500
                },
                datetimeUTC: false
            },
            tooltip: {
                enabled: false
            },
            axisBorder: {
                show: false
            }
        },
        yaxis: {
            min: 0,
            labels: {
                style: {
                    fontSize: '12px',
                    fontWeight: 500
                }
            },
            axisBorder: {
                show: false
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center',
            fontSize: '14px',
            fontWeight: 500,
            markers: {
                width: 12,
                height: 12,
                radius: 6
            },
            itemMargin: {
                horizontal: 10,
                vertical: 0
            }
        },
        responsive: [{
            breakpoint: 768,
            options: {
                legend: {
                    position: 'bottom',
                    offsetY: 20
                }
            }
        }]
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
            background: 'transparent',
            type: 'line',
            height: 350,
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            },
            fontFamily: 'Inter, system-ui, sans-serif'
        },
        colors: ['#6c5ce7', '#00cec9', '#ff7675', '#00b894', '#fdcb6e', '#e17055', '#74b9ff', '#fd79a8', '#a29bfe'],
        stroke: {
            curve: 'smooth',
            width: 3
        },
        markers: {
            size: 0,
            strokeWidth: 0,
            hover: {
                size: 5, sizeOffset: 3
            }
        },
        grid: {
            borderColor: '#2d2d3a',
            strokeDashArray: 4,
            xaxis: {
                lines: {
                    show: true
                }
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 10
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function(value) {
                    return value + ' total logs';
                }
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                style: {
                    fontSize: '12px',
                    fontWeight: 500
                },
                datetimeUTC: false
            },
            tooltip: {
                enabled: false
            },
            axisBorder: {
                show: false
            }
        },
        yaxis: {
            min: 0,
            labels: {
                style: {
                    fontSize: '12px',
                    fontWeight: 500
                }
            },
            axisBorder: {
                show: false
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center',
            fontSize: '14px',
            fontWeight: 500,
            markers: {
                width: 12,
                height: 12,
                radius: 6
            },
            itemMargin: {
                horizontal: 10,
                vertical: 0
            }
        },
        responsive: [{
            breakpoint: 768,
            options: {
                legend: {
                    position: 'bottom',
                    offsetY: 20
                }
            }
        }]
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
            background: 'transparent',
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            },
            fontFamily: 'Inter, system-ui, sans-serif'
        },
        colors: ['#6c5ce7', '#00cec9', '#ff7675', '#00b894', '#fdcb6e', '#e17055', '#74b9ff', '#fd79a8', '#a29bfe'],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 6,
                columnWidth: '70%',
                distributed: false
            }
        },
        grid: {
            borderColor: '#2d2d3a',
            strokeDashArray: 4,
            padding: {
                top: 0,
                right: 10,
                bottom: 0,
                left: 10
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function(value) {
                    return value + (value === 1 ? ' log' : ' logs');
                }
            }
        },
        xaxis: {
            categories: chartData.map(data => data.x),
            labels: {
                style: {
                    fontSize: '12px',
                    fontWeight: 500
                }
            },
            axisBorder: {
                show: false
            }
        },
        yaxis: {
            min: 0,
            labels: {
                style: {
                    fontSize: '12px',
                    fontWeight: 500
                }
            },
            axisBorder: {
                show: false
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center',
            fontSize: '14px',
            fontWeight: 500,
            markers: {
                width: 12,
                height: 12,
                radius: 6
            },
            itemMargin: {
                horizontal: 10,
                vertical: 0
            }
        },
        fill: {
            opacity: 1
        },
        responsive: [{
            breakpoint: 768,
            options: {
                legend: {
                    position: 'bottom',
                    offsetY: 20
                }
            }
        }]
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

// User modal functions with Eastern Time conversion
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
            foreColor: '#FFF',
            background: 'transparent',
            height: 350,
            type: 'heatmap',
            toolbar: { show: false },
            animations: { enabled: false },
            fontFamily: 'Inter, system-ui, sans-serif'
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
                        { from: 0,   to: 0,   color: '#2d2d3a', name: '0 logs' },
                        { from: 1,   to: 1,   color: '#6c5ce7', name: '1 log' },
                        { from: 2,   to: 2,   color: '#a29bfb', name: '2 logs' },
                        { from: 3,   to: 999, color: '#d6d1ff', name: '3+ logs' }
                    ]
                }
            }
        },
        legend: { 
            show: true, 
            position: 'bottom', 
            fontSize: '14px',
            fontWeight: 500
        },
        grid: {
            borderColor: '#2d2d3a',
            padding: { top: 0, right: 0, bottom: 0, left: 0 }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                format: 'MM/dd',
                style: { fontSize: '12px' },
                datetimeUTC: false
            }
        },
        yaxis: { show: false },
        tooltip: {
            theme: 'dark',
            custom: function({series, seriesIndex, dataPointIndex, w}) {
                const date = new Date(w.globals.seriesX[seriesIndex][dataPointIndex]);
                const value = series[seriesIndex][dataPointIndex];
                return `<div class="apexcharts-tooltip-title">${date.toLocaleDateString()} (ET)</div>
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
            background: 'transparent',
            type: 'bar',
            height: 250,
            toolbar: { show: false },
            fontFamily: 'Inter, system-ui, sans-serif'
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: '80%',
                distributed: false
            }
        },
        colors: ['#6c5ce7'],
        grid: {
            borderColor: '#2d2d3a',
            strokeDashArray: 4
        },
        xaxis: {
            categories: Array.from({length: 24}, (_, i) => `${String(i).padStart(2, '0')}:00`),
            labels: { 
                rotate: -45,
                style: { 
                    fontSize: '12px',
                    fontWeight: 500
                }
            }
        },
        yaxis: {
            title: {
                text: 'Total Logs',
                style: { color: '#ffffff', fontWeight: 500 }
            },
            min: 0,
            labels: {
                style: {
                    fontSize: '12px',
                    fontWeight: 500
                }
            }
        },
        title: {
            text: 'Time of Day Distribution (Eastern Time)',
            style: { color: '#ffffff', fontSize: '14px', fontWeight: 500 }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'vertical',
                shadeIntensity: 0.5,
                gradientToColors: ['#00cec9'],
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function(value) {
                    return value + (value === 1 ? ' log' : ' logs');
                }
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
    // The data is already in Eastern Time now
    const peakHour = stats.hourlyDistribution.indexOf(Math.max(...stats.hourlyDistribution));
    
    // For morning (6-12 ET)
    const morningCount = stats.hourlyDistribution.slice(6, 12).reduce((a, b) => a + b, 0);
    // For evening (12-20 ET)
    const eveningCount = stats.hourlyDistribution.slice(12, 20).reduce((a, b) => a + b, 0);

    document.getElementById('timeOfDay').innerHTML = `
        <div class="stat-item">
            <div class="stat-label">Peak Hour (ET)</div>
            <div class="stat-value">${String(peakHour).padStart(2, '0')}:00</div>
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
    
    // Store current user data for export
    currentUserName = username;
    currentUserStats = userStats;
    
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
        // Data is already converted to ET in the filtered dataset
        const date = new Date(timestamp.substring(0, 13).replace('T', ' ') + ':00:00');
        // Create date key manually to preserve ET timezone (avoid toISOString which converts to UTC)
        const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
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

        // Hourly distribution (in ET)
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
                // but for user details we can show *all* data or just the selected year's data.
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

    // Export stats button
    document.getElementById('exportStatsBtn').addEventListener('click', function() {
        exportUserStats();
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
    // Enhanced confetti burst
    const end = Date.now() + 1500;
    const colors = ['#6c5ce7', '#00cec9', '#ff7675', '#00b894', '#fdcb6e'];

    (function frame() {
        confetti({
            particleCount: 12,
            startVelocity: 25,
            spread: 90,
            origin: { y: 0.8 },
            gravity: 1.2,
            ticks: 300,
            shapes: ['circle', 'square'],
            scalar: 1.2,
            zIndex: 100,
            disableForReducedMotion: true,
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

// Export functionality
let currentUserStats = null;
let currentUserName = null;

function generateMarkdownReport(username, userStats, yearData) {
    const currentDate = new Date().toLocaleDateString();
    const year = selectedYear;
    
    // Calculate total logs for the year
    let totalLogs = 0;
    const uniqueDays = new Set();
    
    if (yearData && yearData[username]) {
        for (let timestamp in yearData[username]) {
            totalLogs += yearData[username][timestamp];
            // Extract just the date part (YYYY-MM-DD) to count unique active days
            const date = new Date(timestamp.substring(0, 13).replace('T', ' ') + ':00:00');
            const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            uniqueDays.add(dateKey);
        }
    }
    
    const totalActiveDays = uniqueDays.size;
    
    // Calculate days in the selected year (accounting for leap years)
    const isLeapYear = (parseInt(year) % 4 === 0 && parseInt(year) % 100 !== 0) || (parseInt(year) % 400 === 0);
    const daysInYear = isLeapYear ? 366 : 365;
    
    const averagePerDay = totalLogs > 0 ? (totalLogs / daysInYear).toFixed(2) : '0';
    
    // Find most active day of week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayTotals = new Array(7).fill(0);
    
    if (yearData && yearData[username]) {
        for (let timestamp in yearData[username]) {
            const date = new Date(timestamp.substring(0, 13).replace('T', ' ') + ':00:00');
            const dayIndex = date.getDay();
            dayTotals[dayIndex] += yearData[username][timestamp];
        }
    }
    
    const maxDayIndex = dayTotals.indexOf(Math.max(...dayTotals));
    const mostActiveDay = daysOfWeek[maxDayIndex];
    const mostActiveDayCount = dayTotals[maxDayIndex];
    
    // Find peak hour
    const peakHour = userStats.hourlyDistribution.indexOf(Math.max(...userStats.hourlyDistribution));
    const peakHourCount = userStats.hourlyDistribution[peakHour];
    
    // Generate markdown content
    const markdown = `# 💩 Poop Chronicles - ${username}'s Stats Report

**Generated:** ${currentDate}  
**Year:** ${year}  
**Report Type:** Personal Activity Summary

---

## 📊 Overview

- **Total Logs:** ${totalLogs}
- **Daily Record:** ${userStats.dailyMax} logs
- **Weekly Record:** ${userStats.weeklyMax} logs
- **Monthly Record:** ${userStats.monthlyMax} logs
- **Monthly Average:** ${userStats.monthlyAvg.toFixed(1)} logs

---

## 🏆 Personal Bests

| Metric | Value |
|--------|-------|
| Best Single Day | ${userStats.dailyMax} logs |
| Best Week | ${userStats.weeklyMax} logs |
| Best Month | ${userStats.monthlyMax} logs |
| Longest Streak | ${userStats.activeStreak} days |

---

## ⏰ Activity Patterns

### Peak Activity Time
- **Most Active Hour:** ${String(peakHour).padStart(2, '0')}:00 (${peakHourCount} total logs)
- **Most Active Day:** ${mostActiveDay} (${mostActiveDayCount} total logs)

### Hourly Distribution
${userStats.hourlyDistribution.map((count, hour) => {
    const hourStr = String(hour).padStart(2, '0');
    const bar = '█'.repeat(Math.ceil(count / Math.max(...userStats.hourlyDistribution) * 20));
    return `${hourStr}:00 │${bar} ${count}`;
}).join('\n')}

---

## 📅 Activity Calendar

### Recent Activity Heatmap
${generateMarkdownHeatmap(userStats.heatmapData)}

---

## 📈 Statistics Summary

- **Average per Day:** ${averagePerDay} logs (total logs ÷ ${daysInYear} days)
- **Total Active Days:** ${totalActiveDays} days
- **Activity Rate:** ${totalActiveDays > 0 ? ((totalActiveDays / daysInYear) * 100).toFixed(1) : '0'}% of year
- **Most Productive Day of Week:** ${mostActiveDay}
- **Peak Performance Hour:** ${String(peakHour).padStart(2, '0')}:00 ET
- **Consistency Score:** ${userStats.activeStreak} day streak

---

## 🎯 Performance Insights

${generateInsights(userStats, totalLogs, mostActiveDay, peakHour)}

---

*Report generated by Poop Chronicles Analytics*  
*Data reflects Eastern Time (ET) activity for ${year}*
`;

    return markdown;
}

function generateMarkdownHeatmap(heatmapData) {
    if (!heatmapData || heatmapData.length === 0) {
        return 'No activity data available for heatmap.';
    }
    
    // Group by month for a simplified view
    const monthlyData = {};
    heatmapData.forEach(item => {
        const date = new Date(item.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = 0;
        }
        monthlyData[monthKey] += item.value;
    });
    
    let heatmapText = 'Monthly Activity Summary:\n';
    Object.entries(monthlyData).forEach(([month, count]) => {
        const intensity = Math.min(Math.ceil(count / 10), 5);
        const blocks = '█'.repeat(intensity) + '░'.repeat(5 - intensity);
        heatmapText += `${month}: ${blocks} (${count} logs)\n`;
    });
    
    return heatmapText;
}

function generateInsights(userStats, totalLogs, mostActiveDay, peakHour) {
    const insights = [];
    
    if (peakHour >= 6 && peakHour <= 10) {
        insights.push('🌅 **Morning Person:** Peak activity occurs during morning hours, suggesting a healthy digestive routine.');
    } else if (peakHour >= 11 && peakHour <= 14) {
        insights.push('🌞 **Midday Mover:** Most active during lunch hours - possibly influenced by meal timing.');
    } else if (peakHour >= 15 && peakHour <= 19) {
        insights.push('🌆 **Afternoon Achiever:** Peak performance in the afternoon/evening hours.');
    } else {
        insights.push('🌙 **Night Owl:** Unusual peak activity during late/early hours - consider dietary timing.');
    }
    
    if (userStats.activeStreak >= 7) {
        insights.push('🔥 **Consistency Champion:** Impressive streak shows excellent regularity!');
    } else if (userStats.activeStreak >= 3) {
        insights.push('📈 **Building Momentum:** Good consistency pattern developing.');
    }
    
    if (userStats.dailyMax >= 5) {
        insights.push('💪 **High Performer:** Exceptional daily peak performance recorded.');
    }
    
    const weekendDays = ['Saturday', 'Sunday'];
    if (weekendDays.includes(mostActiveDay)) {
        insights.push('🏖️ **Weekend Warrior:** Most active on weekends - relaxed schedule benefits?');
    } else {
        insights.push('💼 **Weekday Warrior:** Peak activity during work week - routine-driven performance.');
    }
    
    if (insights.length === 0) {
        insights.push('📊 **Steady Performer:** Consistent activity patterns observed throughout the tracking period.');
    }
    
    return insights.join('\n\n');
}

function downloadMarkdown(content, filename) {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function exportUserStats() {
    if (!currentUserName || !currentUserStats) {
        console.error('No user stats available for export');
        return;
    }
    
    const yearData = getDataForSelectedYear(fullData);
    const markdown = generateMarkdownReport(currentUserName, currentUserStats, yearData);
    const filename = `${currentUserName}_poop_stats_${selectedYear}.md`;
    
    downloadMarkdown(markdown, filename);
}
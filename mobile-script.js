// Mobile-specific variables
let mobileFullData = null;
let mobileSelectedYear = new Date().getFullYear();
let mobileChart = null;
let currentMobileUser = null;
let currentMobileStats = null;

// User colors for consistency
const userColors = {
    'Ziggy': '#6c5ce7',
    'Mikey': '#00cec9', 
    'TT': '#ff7675',
    'AJ': '#00b894',
    'GGK': '#fdcb6e',
    'Teddy': '#e17055',
    'E-Tyler': '#74b9ff',
    'Ant': '#fd79a8',
    'Kyle': '#a29bfe'
};

// Telegram integration (reuse from main app)
function sendTelegramMessage(name) {
    const botToken = '6741155054:AAGSjlsqa7xbJGHkKq9uEREUjNSO22yn6KE';
    const chatId = '-1002084507637';
    
    const text = window.telegramMessages.getRandomTelegramMessage(name);
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

// Quick log function with mobile optimizations
function quickLog(name) {
    const userCard = document.querySelector(`[data-user="${name}"]`);
    const logButton = userCard.querySelector('.log-button');
    
    // Visual feedback
    userCard.classList.add('logging');
    logButton.style.transform = 'scale(0.9)';
    
    // Haptic feedback (if supported)
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    // Play sound
    playMobileFartNoise();
    
    // Send to server
    const now = new Date();
    const timestamp = now.toISOString().split(':')[0];

    fetch('https://us-central1-loglog-a3cf1.cloudfunctions.net/incrementCounter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, timestamp })
    })
    .then(response => response.text())
    .then(data => {
        showToast(`${name}'s poop logged! 💩`);
        sendTelegramMessage(name);
        
        // Update counts immediately for better UX
        setTimeout(() => {
            updateMobileCounts();
        }, 500);
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Failed to log. Try again!', 'error');
    })
    .finally(() => {
        // Reset visual state
        userCard.classList.remove('logging');
        logButton.style.transform = '';
    });
}

// Toast notification system
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 250);
    }, 2000);
}

// Play fart noise
function playMobileFartNoise() {
    const audio = document.getElementById('mobile-fart-noise');
    audio.play().catch(e => console.log('Audio play failed:', e));
}

// Data processing functions (adapted from main app)
function parseAndConvertUTCToNaiveET(rawTS) {
    const dateUTC = new Date(rawTS.substring(0, 13).replace('T', ' ') + ":00:00");
    const dateET = new Date(dateUTC.valueOf());
    dateET.setHours(dateET.getHours() - 5);
    return dateET;
}

function getMobileDataForSelectedYear(data) {
    let filtered = {};
    
    for (let user in data) {
        for (let utcTS in data[user]) {
            const dateET = parseAndConvertUTCToNaiveET(utcTS);
            const yearET = dateET.getFullYear();
            
            if (yearET === parseInt(mobileSelectedYear, 10)) {
                const newETTS = formatDateET_naive(dateET);
                
                if (!filtered[user]) filtered[user] = {};
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

// Update mobile counts and stats
function updateMobileCounts() {
    if (!mobileFullData) return;
    
    const filtered = getMobileDataForSelectedYear(mobileFullData);
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    // Calculate week start (Sunday)
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    const weekStartStr = `${weekStart.getFullYear()}-${String(weekStart.getMonth() + 1).padStart(2, '0')}-${String(weekStart.getDate()).padStart(2, '0')}`;
    
    // Calculate month start
    const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
    
    let todayTotal = 0;
    let weekTotal = 0;
    let monthTotal = 0;
    let userTotals = [];
    
    for (let user in filtered) {
        let userTotal = 0;
        let userTodayCount = 0;
        let userWeekCount = 0;
        let userMonthCount = 0;
        
        for (let timestamp in filtered[user]) {
            const count = filtered[user][timestamp];
            userTotal += count;
            
            const date = new Date(timestamp.substring(0, 13).replace('T', ' ') + ':00:00');
            const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            
            // Today's count
            if (dateStr === today) {
                userTodayCount += count;
                todayTotal += count;
            }
            
            // This week's count
            if (dateStr >= weekStartStr) {
                userWeekCount += count;
                weekTotal += count;
            }
            
            // This month's count
            if (dateStr >= monthStart) {
                userMonthCount += count;
                monthTotal += count;
            }
        }
        
        // Update individual user counts
        const countElement = document.getElementById(`count-${user}`);
        if (countElement) {
            countElement.textContent = userTotal;
        }
        
        userTotals.push({ user, total: userTotal });
    }
    
    // Update quick stats
    document.getElementById('todayTotal').textContent = todayTotal;
    document.getElementById('weekTotal').textContent = weekTotal;
    document.getElementById('monthTotal').textContent = monthTotal;
    
    // Update leaderboard
    updateMobileLeaderboard(userTotals);
}

// Update mobile leaderboard
function updateMobileLeaderboard(userTotals) {
    userTotals.sort((a, b) => b.total - a.total);
    
    const leaderboardHTML = userTotals.map((item, index) => {
        let rankClass = '';
        let icon = '';
        
        if (index === 0) {
            rankClass = 'rank-1';
            icon = '🥇';
        } else if (index === 1) {
            rankClass = 'rank-2';
            icon = '🥈';
        } else if (index === 2) {
            rankClass = 'rank-3';
            icon = '🥉';
        } else {
            icon = `${index + 1}.`;
        }
        
        return `
            <div class="mobile-leader-entry" onclick="showMobileUserStats('${item.user}')">
                <div class="leader-info">
                    <span class="leader-rank ${rankClass}">${icon}</span>
                    <span class="leader-name">${item.user}</span>
                </div>
                <span class="leader-score">${item.total}</span>
            </div>
        `;
    }).join('');
    
    document.getElementById('mobileLeaderboard').innerHTML = leaderboardHTML;
}

// Show mobile user stats
function showMobileUserStats(username) {
    if (!mobileFullData || !mobileFullData[username]) return;
    
    const filtered = getMobileDataForSelectedYear(mobileFullData);
    const userStats = calculateMobileUserStats(username, filtered[username]);
    
    currentMobileUser = username;
    currentMobileStats = userStats;
    
    // Calculate total logs
    let totalLogs = 0;
    if (filtered[username]) {
        for (let timestamp in filtered[username]) {
            totalLogs += filtered[username][timestamp];
        }
    }
    
    // Update modal content
    document.getElementById('mobileModalTitle').textContent = `${username}'s Stats`;
    document.getElementById('mobileDailyBest').textContent = userStats.dailyMax;
    document.getElementById('mobileWeeklyBest').textContent = userStats.weeklyMax;
    document.getElementById('mobileMonthlyBest').textContent = userStats.monthlyMax;
    document.getElementById('mobileTotalLogs').textContent = totalLogs;
    
    // Show modal
    const modal = document.getElementById('mobileUserModal');
    modal.classList.remove('hidden');
}

// Calculate user stats (simplified for mobile)
function calculateMobileUserStats(username, userData) {
    const stats = {
        dailyMax: 0,
        weeklyMax: 0,
        monthlyMax: 0,
        hourlyDistribution: new Array(24).fill(0),
        activeStreak: 0,
        monthlyAvg: 0,
        heatmapData: []
    };
    
    if (!userData) return stats;
    
    const dailyCounts = {};
    const weeklyCounts = {};
    const monthlyCounts = {};
    
    for (let timestamp in userData) {
        const date = new Date(timestamp.substring(0, 13).replace('T', ' ') + ':00:00');
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
        
        // Hourly distribution
        stats.hourlyDistribution[hour] += userData[timestamp];
    }
    
    // Monthly average
    const months = Object.keys(monthlyCounts).length;
    const totalCount = Object.values(monthlyCounts).reduce((a, b) => a + b, 0);
    stats.monthlyAvg = months > 0 ? totalCount / months : 0;
    
    // Active streak
    stats.activeStreak = calculateStreak(dailyCounts);
    
    // Heatmap data
    stats.heatmapData = Object.entries(dailyCounts).map(([date, value]) => ({
        date,
        value
    }));
    
    return stats;
}

// Week number calculation
function getWeekNumber(d) {
    const year = d.getFullYear();
    const month = d.getMonth();
    const date = d.getDate();
    
    const tempDate = new Date(year, month, date);
    tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));
    
    const yearStart = new Date(tempDate.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((tempDate - yearStart) / 86400000) + 1) / 7);
    
    return weekNo;
}

// Calculate streak
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

// Charts functionality
function toggleCharts() {
    const chartsSection = document.getElementById('mobileCharts');
    const toggleBtn = document.getElementById('showChartsBtn');
    
    if (chartsSection.classList.contains('hidden')) {
        chartsSection.classList.remove('hidden');
        toggleBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="18,15 12,9 6,15"></polyline>
            </svg>
            Hide Charts
        `;
        
        // Wait for DOM to be ready before rendering chart
        setTimeout(() => {
            const activeTab = document.querySelector('.tab-btn.active');
            if (activeTab) {
                renderMobileChart(activeTab.dataset.chart);
            } else {
                renderMobileChart('activity');
            }
        }, 150);
    } else {
        chartsSection.classList.add('hidden');
        toggleBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
            View Charts
        `;
        
        // Destroy chart when hiding to free memory
        if (mobileChart) {
            mobileChart.destroy();
            mobileChart = null;
        }
    }
}

// Render mobile chart
function renderMobileChart(type) {
    if (!mobileFullData) return;
    
    const filtered = getMobileDataForSelectedYear(mobileFullData);
    
    // Check if we have any data
    const hasData = Object.keys(filtered).some(user => 
        Object.keys(filtered[user] || {}).length > 0
    );
    
    if (!hasData) {
        document.querySelector("#mobileChart").innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">No data available for selected year</div>';
        return;
    }
    
    let chartData;
    
    try {
        switch (type) {
            case 'activity':
                chartData = processMobileSnapshot(filtered, 'daily');
                break;
            case 'cumulative':
                chartData = processMobileCumulativeSnapshot(filtered);
                break;
            case 'weekly':
                chartData = processMobileDayOfWeekSnapshot(filtered);
                break;
        }
        
        // Validate chart data
        if (!chartData || (!chartData.series && !Array.isArray(chartData))) {
            throw new Error('Invalid chart data structure');
        }
        
        const series = chartData.series || chartData;
        
        // Ensure series is valid
        if (!Array.isArray(series) || series.length === 0) {
            throw new Error('No series data available');
        }
        
        // Destroy existing chart
        if (mobileChart) {
            mobileChart.destroy();
            mobileChart = null;
        }
        
        let options;
        
        if (type === 'weekly') {
            // Bar chart configuration
            options = {
                series: series,
                chart: {
                    foreColor: '#FFF',
                    background: 'transparent',
                    type: 'bar',
                    height: 250,
                    toolbar: { show: false },
                    fontFamily: 'Inter, system-ui, sans-serif',
                    animations: {
                        enabled: true,
                        easing: 'easeinout',
                        speed: 800
                    }
                },
                colors: Object.values(userColors),
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '70%',
                        distributed: false,
                        borderRadius: 4
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
                    type: 'category',
                    categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    labels: {
                        style: { 
                            fontSize: '10px',
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
                            fontSize: '10px',
                            fontWeight: 500
                        }
                    },
                    axisBorder: {
                        show: false
                    }
                },
                legend: {
                    position: 'bottom',
                    fontSize: '12px',
                    fontWeight: 500,
                    markers: {
                        width: 8,
                        height: 8,
                        radius: 4
                    },
                    itemMargin: {
                        horizontal: 8,
                        vertical: 4
                    }
                },
                fill: {
                    opacity: 1
                }
            };
        } else {
            // Line chart configuration
            options = {
                series: series,
                chart: {
                    foreColor: '#FFF',
                    background: 'transparent',
                    type: 'line',
                    height: 250,
                    toolbar: { show: false },
                    fontFamily: 'Inter, system-ui, sans-serif',
                    animations: {
                        enabled: true,
                        easing: 'easeinout',
                        speed: 800
                    }
                },
                colors: Object.values(userColors),
                stroke: {
                    curve: 'smooth',
                    width: 2
                },
                markers: {
                    size: 0,
                    strokeWidth: 0,
                    hover: {
                        size: 4,
                        sizeOffset: 2
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
                    type: 'datetime',
                    labels: {
                        style: { 
                            fontSize: '10px',
                            fontWeight: 500
                        },
                        datetimeUTC: false
                    },
                    axisBorder: {
                        show: false
                    }
                },
                yaxis: {
                    min: 0,
                    labels: {
                        style: { 
                            fontSize: '10px',
                            fontWeight: 500
                        }
                    },
                    axisBorder: {
                        show: false
                    }
                },
                legend: {
                    position: 'bottom',
                    fontSize: '12px',
                    fontWeight: 500,
                    markers: {
                        width: 8,
                        height: 8,
                        radius: 4
                    },
                    itemMargin: {
                        horizontal: 8,
                        vertical: 4
                    }
                }
            };
        }
        
        // Create new chart
        mobileChart = new ApexCharts(document.querySelector("#mobileChart"), options);
        mobileChart.render();
        
    } catch (error) {
        console.error('Chart rendering error:', error);
        document.querySelector("#mobileChart").innerHTML = '<div style="text-align: center; padding: 40px; color: #ff7675;">Error loading chart. Please try again.</div>';
    }
}

// Process data for mobile charts (simplified versions)
function processMobileSnapshot(data, chartView) {
    let seriesData = [];
    
    for (let user in data) {
        if (!data[user] || Object.keys(data[user]).length === 0) continue;
        
        let dataPoints = {};
        for (let etTS in data[user]) {
            let dateET = new Date(etTS.substring(0, 13).replace('T', ' ') + ':00:00');
            let dateKey = `${dateET.getFullYear()}-${String(dateET.getMonth() + 1).padStart(2, '0')}-${String(dateET.getDate()).padStart(2, '0')}`;
            dataPoints[dateKey] = (dataPoints[dateKey] || 0) + data[user][etTS];
        }
        
        const chartPoints = Object.entries(dataPoints)
            .map(([key, value]) => ({
                x: new Date(key).getTime(),
                y: value
            }))
            .sort((a, b) => a.x - b.x);
        
        if (chartPoints.length > 0) {
            seriesData.push({
                name: user,
                data: chartPoints,
                color: userColors[user] || '#6c5ce7'
            });
        }
    }
    
    return { series: seriesData };
}

function processMobileCumulativeSnapshot(data) {
    let seriesData = [];
    
    for (let user in data) {
        if (!data[user] || Object.keys(data[user]).length === 0) continue;
        
        let total = 0;
        let dataPoints = [];
        let timestamps = Object.keys(data[user]).sort();
        
        for (let time of timestamps) {
            total += data[user][time];
            let dateET = new Date(time.substring(0, 13).replace('T', ' ') + ':00:00');
            dataPoints.push({
                x: dateET.getTime(),
                y: total
            });
        }
        
        if (dataPoints.length > 0) {
            seriesData.push({
                name: user,
                data: dataPoints,
                color: userColors[user] || '#6c5ce7'
            });
        }
    }
    
    return { series: seriesData };
}

function processMobileDayOfWeekSnapshot(data) {
    let seriesData = {};
    let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Initialize data structure
    for (let user in data) {
        if (!data[user] || Object.keys(data[user]).length === 0) continue;
        seriesData[user] = new Array(7).fill(0);
        
        for (let time in data[user]) {
            let date = new Date(time.substring(0, 13).replace('T', ' ') + ':00:00');
            let day = date.getDay();
            seriesData[user][day] += data[user][time];
        }
    }
    
    // Convert to ApexCharts format
    let users = Object.keys(seriesData);
    if (users.length === 0) {
        return [];
    }
    
    return users.map(user => ({
        name: user,
        data: seriesData[user],
        color: userColors[user] || '#6c5ce7'
    }));
}

// Export functionality (reuse from main app)
function exportMobileUserStats() {
    if (!currentMobileUser || !currentMobileStats) {
        showToast('No user stats available', 'error');
        return;
    }
    
    const yearData = getMobileDataForSelectedYear(mobileFullData);
    const markdown = generateMarkdownReport(currentMobileUser, currentMobileStats, yearData);
    const filename = `${currentMobileUser}_poop_stats_${mobileSelectedYear}.md`;
    
    downloadMarkdown(markdown, filename);
    showToast('Stats exported successfully!');
}

// Utility functions (reuse from main app)
function generateMarkdownReport(username, userStats, yearData) {
    const currentDate = new Date().toLocaleDateString();
    const year = mobileSelectedYear;
    
    let totalLogs = 0;
    const uniqueDays = new Set();
    
    if (yearData && yearData[username]) {
        for (let timestamp in yearData[username]) {
            totalLogs += yearData[username][timestamp];
            const date = new Date(timestamp.substring(0, 13).replace('T', ' ') + ':00:00');
            const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            uniqueDays.add(dateKey);
        }
    }
    
    const totalActiveDays = uniqueDays.size;
    const isLeapYear = (parseInt(year) % 4 === 0 && parseInt(year) % 100 !== 0) || (parseInt(year) % 400 === 0);
    const daysInYear = isLeapYear ? 366 : 365;
    const averagePerDay = totalLogs > 0 ? (totalLogs / daysInYear).toFixed(2) : '0';
    
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
    
    const peakHour = userStats.hourlyDistribution.indexOf(Math.max(...userStats.hourlyDistribution));
    const peakHourCount = userStats.hourlyDistribution[peakHour];
    
    const markdown = `# 💩 Poop Chronicles - ${username}'s Stats Report

**Generated:** ${currentDate} (Mobile App)  
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

---

## 📈 Statistics Summary

- **Average per Day:** ${averagePerDay} logs (total logs ÷ ${daysInYear} days)
- **Total Active Days:** ${totalActiveDays} days
- **Activity Rate:** ${totalActiveDays > 0 ? ((totalActiveDays / daysInYear) * 100).toFixed(1) : '0'}% of year
- **Most Productive Day of Week:** ${mostActiveDay}
- **Peak Performance Hour:** ${String(peakHour).padStart(2, '0')}:00 ET
- **Consistency Score:** ${userStats.activeStreak} day streak

---

*Report generated by Poop Chronicles Mobile App*  
*Data reflects Eastern Time (ET) activity for ${year}*
`;

    return markdown;
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

// Initialize mobile app
document.addEventListener('DOMContentLoaded', function() {
    // Preload audio
    const audio = document.getElementById('mobile-fart-noise');
    audio.load();
    
    // Fetch data
    fetch('https://us-central1-loglog-a3cf1.cloudfunctions.net/getCounts')
        .then(response => response.json())
        .then(data => {
            mobileFullData = data;
            populateMobileYearDropdown(data);
            updateMobileCounts();
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('Failed to load data', 'error');
        });
    
    // Event listeners
    document.getElementById('showChartsBtn').addEventListener('click', toggleCharts);
    
    // Chart tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Add small delay to ensure DOM is ready
            setTimeout(() => {
                renderMobileChart(this.dataset.chart);
            }, 100);
        });
    });
    
    // Modal close
    document.querySelector('.close-modal').addEventListener('click', function() {
        document.getElementById('mobileUserModal').classList.add('hidden');
    });
    
    // Export button
    document.getElementById('mobileExportBtn').addEventListener('click', exportMobileUserStats);
    
    // Year dropdown
    document.getElementById('mobileYearDropdown').addEventListener('change', function(e) {
        mobileSelectedYear = e.target.value;
        updateMobileCounts();
        if (!document.getElementById('mobileCharts').classList.contains('hidden')) {
            const activeTab = document.querySelector('.tab-btn.active').dataset.chart;
            renderMobileChart(activeTab);
        }
    });
});

// Populate year dropdown
function populateMobileYearDropdown(data) {
    let years = new Set();
    for (let user in data) {
        for (let ts in data[user]) {
            const dateET = parseAndConvertUTCToNaiveET(ts);
            let year = dateET.getFullYear().toString();
            years.add(year);
        }
    }
    
    let sortedYears = Array.from(years).sort();
    let dropdown = document.getElementById('mobileYearDropdown');
    dropdown.innerHTML = '';
    
    sortedYears.forEach((yr) => {
        let option = document.createElement('option');
        option.value = yr;
        option.text = yr;
        dropdown.appendChild(option);
    });
    
    if (sortedYears.includes(mobileSelectedYear.toString())) {
        dropdown.value = mobileSelectedYear;
    } else {
        dropdown.value = sortedYears[sortedYears.length - 1];
        mobileSelectedYear = dropdown.value;
    }
}
// ─── User roster ────────────────────────────────────────────────────────────
const USERS = [
    { name: 'Ziggy',   color: '#6c5ce7', initial: 'Z'   },
    { name: 'Mikey',   color: '#00cec9', initial: 'M'   },
    { name: 'TT',      color: '#ff7675', initial: 'TT'  },
    { name: 'AJ',      color: '#00b894', initial: 'AJ'  },
    { name: 'GGK',     color: '#fdcb6e', initial: 'GGK' },
    { name: 'Teddy',   color: '#e17055', initial: 'TE'  },
    { name: 'E-Tyler', color: '#74b9ff', initial: 'ET'  },
    { name: 'Ant',     color: '#fd79a8', initial: 'AN'  },
    { name: 'Kyle',    color: '#a29bfe', initial: 'K'   },
];

const USER_MAP = Object.fromEntries(USERS.map(u => [u.name, u]));
const CACHE_KEY = 'loglog_lastUser';

// ─── Global state ────────────────────────────────────────────────────────────
var globalChart, globalCumulativeChart, globalDayOfWeekChart;
var fullData = null;
var selectedYear = new Date().getFullYear();
var currentUserStats = null;
var currentUserName = null;
var isLogging = false;
var hasLogged  = false; // resets on every page load/refresh

// ─── Session helpers ──────────────────────────────────────────────────────────
function hasLoggedThisSession() {
    return hasLogged;
}

function markSessionLogged() {
    hasLogged = true;
}

// ─── Telegram ────────────────────────────────────────────────────────────────
function sendTelegramMessage(name) {
    const botToken = '6741155054:AAGSjlsqa7xbJGHkKq9uEREUjNSO22yn6KE';
    const chatId   = '-1002084507637';
    const text = window.telegramMessages.getRandomTelegramMessage(name);
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;
    fetch(url).catch(e => console.error(e));
}

// ─── Caching helpers ─────────────────────────────────────────────────────────
function getCachedUser() {
    return localStorage.getItem(CACHE_KEY);
}

function setCachedUser(name) {
    localStorage.setItem(CACHE_KEY, name);
}

function clearCachedUser() {
    localStorage.removeItem(CACHE_KEY);
}

// ─── UI modes ────────────────────────────────────────────────────────────────
function showQuickLog(name) {
    const user = USER_MAP[name];
    if (!user) { showNamePicker(); return; }

    document.getElementById('quickLogMode').classList.remove('hidden');
    document.getElementById('namePickerMode').classList.add('hidden');

    const avatar = document.getElementById('qlAvatar');
    avatar.textContent = user.initial;
    avatar.style.background = user.color;

    // Propagate the user's color as a CSS variable for glow effects
    const card = document.getElementById('quickLogCard');
    card.style.setProperty('--card-color', user.color);
    // Convert hex color to rgba for the glow shadow
    const hex = user.color.replace('#', '');
    const r = parseInt(hex.slice(0,2), 16);
    const g = parseInt(hex.slice(2,4), 16);
    const b = parseInt(hex.slice(4,6), 16);
    card.style.setProperty('--ql-glow', `rgba(${r},${g},${b},0.3)`);

    document.getElementById('qlName').textContent = name;
}

function showNamePicker() {
    document.getElementById('namePickerMode').classList.remove('hidden');
    document.getElementById('quickLogMode').classList.add('hidden');
}

function buildNameGrid() {
    const grid = document.getElementById('namesGrid');
    grid.innerHTML = '';
    USERS.forEach(user => {
        const card = document.createElement('button');
        card.className = 'name-card';
        card.style.setProperty('--card-color', user.color);
        card.innerHTML = `
            <div class="card-avatar" style="background:${user.color}">${user.initial}</div>
            <span class="card-name">${user.name}</span>
        `;
        card.addEventListener('click', () => logForUser(user.name, card));
        grid.appendChild(card);
    });
}

// ─── Logging ─────────────────────────────────────────────────────────────────
function handleQuickLog() {
    const name = getCachedUser();
    if (!name || isLogging || hasLoggedThisSession()) return;
    logForUser(name, document.getElementById('quickLogCard'));
}

function logForUser(name, buttonEl) {
    if (isLogging || hasLoggedThisSession()) return;
    isLogging = true;

    const user = USER_MAP[name] || {};
    triggerShockwave(buttonEl, user.color || '#8b7cf8');
    playFartNoise();
    if (buttonEl) buttonEl.classList.add('loading');

    const now = new Date();
    const timestamp = now.toISOString().split(':')[0];

    fetch('https://us-central1-loglog-a3cf1.cloudfunctions.net/incrementCounter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, timestamp })
    })
    .then(r => r.text())
    .then(() => {
        setCachedUser(name);
        markSessionLogged();
        sendTelegramMessage(name);
        showLoggedState(name);
    })
    .catch(err => {
        console.error(err);
        showToast('Something went wrong. Try again.');
        isLogging = false;
        if (buttonEl) buttonEl.classList.remove('loading');
    });
}

function showLoggedState(name) {
    const user = USER_MAP[name] || {};
    isLogging = false;

    // Switch to quick log mode so the card is visible
    document.getElementById('namePickerMode').classList.add('hidden');
    document.getElementById('quickLogMode').classList.remove('hidden');

    const card = document.getElementById('quickLogCard');
    card.classList.remove('loading');
    card.style.setProperty('--ql-glow', `rgba(0,229,160,0.35)`);
    card.style.cursor = 'default';
    card.onclick = null;

    // Update card content to success state
    document.getElementById('qlAvatar').innerHTML = '✓';
    document.getElementById('qlAvatar').style.background = '#00e5a0';
    document.getElementById('qlAvatar').style.color = 'rgba(0,0,0,0.7)';
    document.getElementById('qlAvatar').style.fontSize = '1.5rem';
    document.querySelector('.ql-action').textContent = 'Logged!';
    document.getElementById('qlName').textContent = name;
    document.querySelector('.ql-arrow').style.opacity = '0';

    // Replace switch-user with a friendly message
    const switchBtn = document.querySelector('.switch-user-btn');
    if (switchBtn) {
        switchBtn.textContent = 'See you next session 👋';
        switchBtn.style.cursor = 'default';
        switchBtn.onclick = null;
    }

    // Disable all name cards too
    document.querySelectorAll('.name-card').forEach(c => {
        c.classList.add('logging');
        c.style.opacity = '0.4';
    });
}

// ─── Toast ───────────────────────────────────────────────────────────────────
var toastTimer = null;
function showToast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
}

// ─── Effects ─────────────────────────────────────────────────────────────────
function triggerShockwave(originEl, color) {
    const rect = originEl
        ? originEl.getBoundingClientRect()
        : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };

    const x = rect.left + rect.width  / 2;
    const y = rect.top  + rect.height / 2;

    // Screen flash
    const flash = document.createElement('div');
    flash.className = 'shockwave-flash';
    flash.style.setProperty('--wave-color', color);
    document.body.appendChild(flash);
    flash.addEventListener('animationend', () => flash.remove(), { once: true });

    // 3 staggered rings
    const configs = [
        { delay: 0,   borderWidth: '5px', opacity: 0.95 },
        { delay: 250, borderWidth: '4px', opacity: 0.65 },
        { delay: 500, borderWidth: '3px', opacity: 0.4  },
    ];
    configs.forEach(({ delay, borderWidth, opacity }) => {
        const ring = document.createElement('div');
        ring.className = 'shockwave-ring';
        ring.style.left         = `${x}px`;
        ring.style.top          = `${y}px`;
        ring.style.borderWidth  = borderWidth;
        ring.style.opacity      = opacity;
        ring.style.animationDelay = `${delay}ms`;
        ring.style.setProperty('--wave-color', color);
        document.body.appendChild(ring);
        ring.addEventListener('animationend', () => ring.remove(), { once: true });
    });
}

function playFartNoise() {
    document.getElementById('fart-noise').play().catch(() => {});
}

// ─── Time helpers ─────────────────────────────────────────────────────────────
function parseAndConvertUTCToNaiveET(rawTS) {
    const dateUTC = new Date(rawTS.substring(0, 13).replace('T', ' ') + ':00:00');
    const dateET  = new Date(dateUTC.valueOf());
    dateET.setHours(dateET.getHours() - 5);
    return dateET;
}

function formatDateET_naive(dateET) {
    const yyyy = dateET.getFullYear();
    const mm = String(dateET.getMonth() + 1).padStart(2, '0');
    const dd = String(dateET.getDate()).padStart(2, '0');
    const hh = String(dateET.getHours()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}`;
}

function getDataForSelectedYear(data) {
    let filtered = {};
    for (let user in data) {
        for (let utcTS in data[user]) {
            const dateET = parseAndConvertUTCToNaiveET(utcTS);
            if (dateET.getFullYear() === parseInt(selectedYear, 10)) {
                const newTS = formatDateET_naive(dateET);
                if (!filtered[user]) filtered[user] = {};
                filtered[user][newTS] = data[user][utcTS];
            }
        }
    }
    return filtered;
}

function getWeekNumber(d) {
    const tempDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));
    const yearStart = new Date(tempDate.getFullYear(), 0, 1);
    return Math.ceil((((tempDate - yearStart) / 86400000) + 1) / 7);
}

// ─── Year dropdown ────────────────────────────────────────────────────────────
function populateYearDropdown(data) {
    let years = new Set();
    for (let user in data) {
        for (let ts in data[user]) {
            years.add(parseAndConvertUTCToNaiveET(ts).getFullYear().toString());
        }
    }
    const sortedYears = Array.from(years).sort();
    const dropdown = document.getElementById('yearDropdown');
    dropdown.innerHTML = '';
    sortedYears.forEach(yr => {
        const opt = document.createElement('option');
        opt.value = yr;
        opt.text  = yr;
        dropdown.appendChild(opt);
    });
    if (sortedYears.includes(selectedYear.toString())) {
        dropdown.value = selectedYear;
    } else {
        dropdown.value = sortedYears[sortedYears.length - 1];
        selectedYear = dropdown.value;
    }
    dropdown.addEventListener('change', e => {
        selectedYear = e.target.value;
        const view = document.querySelector('input[name="chartView"]:checked').value;
        updateDisplay(view);
    });
}

// ─── Highscore / leaders ─────────────────────────────────────────────────────
function updateHighscore(data) {
    let totals = [];
    for (let user in data) {
        let total = 0;
        for (let d in data[user]) total += data[user][d];
        totals.push({ user, total });
    }
    totals.sort((a, b) => b.total - a.total);

    document.getElementById('highscore').innerHTML = totals.map((item, i) => {
        const rankClass = i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : '';
        const icon      = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}.`;
        const title     = i === 0 ? 'Champion' : i === 1 ? 'Second Place' : i === 2 ? 'Third Place' : 'Participant';
        return `<div class="highscore-entry">
            <span class="rank ${rankClass}">${icon}</span>
            <span class="name ${rankClass}">${item.user} — ${title}</span>
            <span class="score">${item.total}</span>
        </div>`;
    }).join('');

    updateDailyAndWeeklyLeaders(data);
}

function updateDailyAndWeeklyLeaders(data) {
    let maxDaily = {}, maxWeekly = {};
    for (let user in data) {
        maxDaily[user] = 0; maxWeekly[user] = 0;
        let daily = {}, weekly = {};
        for (let ts in data[user]) {
            const date = new Date(ts.substring(0, 13).replace('T', ' ') + ':00:00');
            const dk = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
            const wk = `${date.getFullYear()}-W${getWeekNumber(date)}`;
            daily[dk]  = (daily[dk]  || 0) + data[user][ts];
            weekly[wk] = (weekly[wk] || 0) + data[user][ts];
        }
        for (let k in daily)  maxDaily[user]  = Math.max(maxDaily[user],  daily[k]);
        for (let k in weekly) maxWeekly[user] = Math.max(maxWeekly[user], weekly[k]);
    }
    const dl = getLeader(maxDaily);
    const wl = getLeader(maxWeekly);
    const fmt = (l) => l
        ? `<div class="leader-entry"><span class="name">${l.user}</span><span class="score">${l.count}</span></div>`
        : `<div class="leader-entry">No data</div>`;
    document.getElementById('daily-leader').innerHTML  = fmt(dl);
    document.getElementById('weekly-leader').innerHTML = fmt(wl);
}

function getLeader(counts) {
    let leader = { user: null, count: 0 };
    for (let u in counts) if (counts[u] > leader.count) leader = { user: u, count: counts[u] };
    return leader.user ? leader : null;
}

// ─── Chart data processors ───────────────────────────────────────────────────
const CHART_COLORS = ['#6c5ce7','#00cec9','#ff7675','#00b894','#fdcb6e','#e17055','#74b9ff','#fd79a8','#a29bfe'];

function processSnapshot(data, chartView) {
    return {
        series: Object.keys(data).map((user, i) => {
            let pts = {};
            for (let ts in data[user]) {
                const d = new Date(ts.substring(0,13).replace('T',' ') + ':00:00');
                const key = chartView === 'daily'
                    ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
                    : `${d.getFullYear()}-W${getWeekNumber(d)}`;
                pts[key] = (pts[key] || 0) + data[user][ts];
            }
            return {
                name: user,
                color: CHART_COLORS[i % CHART_COLORS.length],
                data: Object.entries(pts).map(([k, v]) => ({
                    x: chartView === 'daily'
                        ? new Date(k).getTime()
                        : (() => { const [yr, wk] = k.split('-W'); return new Date(yr, 0, (wk-1)*7+1).getTime(); })(),
                    y: v
                }))
            };
        })
    };
}

function processCumulativeSnapshot(data) {
    return {
        series: Object.keys(data).map((user, i) => {
            let total = 0;
            const pts = Object.keys(data[user]).sort().map(ts => {
                total += data[user][ts];
                return { x: new Date(ts.substring(0,13).replace('T',' ') + ':00:00').getTime(), y: total };
            });
            return { name: user, color: CHART_COLORS[i % CHART_COLORS.length], data: pts };
        })
    };
}

function processDayOfWeekSnapshot(data) {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const series = {};
    for (let user in data) {
        series[user] = new Array(7).fill(0);
        for (let ts in data[user]) {
            const d = new Date(ts.substring(0,13).replace('T',' ') + ':00:00');
            series[user][d.getDay()] += data[user][ts];
        }
    }
    return days.map((day, i) => {
        const row = { x: day };
        for (let u in series) row[u] = series[u][i];
        return row;
    });
}

// ─── Chart renderers ──────────────────────────────────────────────────────────
const BASE_CHART = {
    foreColor: '#FFF', background: 'transparent',
    toolbar: { show: false },
    animations: { enabled: true, easing: 'easeinout', speed: 800 },
    fontFamily: 'Inter, system-ui, sans-serif'
};
const BASE_GRID = { borderColor: '#2d2d3a', strokeDashArray: 4, padding: { top:0, right:10, bottom:0, left:10 } };
const BASE_LEGEND = { position: 'top', horizontalAlign: 'center', fontSize: '14px', fontWeight: 500,
    markers: { width: 12, height: 12, radius: 6 }, itemMargin: { horizontal: 10 } };
const RESPONSIVE = [{ breakpoint: 768, options: { legend: { position: 'bottom', offsetY: 20 } } }];

function renderChart(chartData) {
    const opts = {
        series: chartData.series,
        chart: { ...BASE_CHART, type: 'line', height: 350 },
        colors: CHART_COLORS,
        stroke: { curve: 'smooth', width: 3 },
        markers: { size: 0, hover: { size: 5, sizeOffset: 3 } },
        grid: BASE_GRID,
        tooltip: { theme: 'dark', y: { formatter: v => v + (v===1?' log':' logs') } },
        xaxis: { type: 'datetime', labels: { style: { fontSize: '12px', fontWeight: 500 }, datetimeUTC: false },
                 tooltip: { enabled: false }, axisBorder: { show: false } },
        yaxis: { min: 0, labels: { style: { fontSize: '12px', fontWeight: 500 } }, axisBorder: { show: false } },
        legend: BASE_LEGEND,
        responsive: RESPONSIVE
    };
    if (!globalChart) {
        globalChart = new ApexCharts(document.querySelector('#chart'), opts);
        globalChart.render();
    } else {
        globalChart.updateOptions(opts, true);
    }
}

function renderCumulativeChart(chartData) {
    const opts = {
        series: chartData.series,
        chart: { ...BASE_CHART, type: 'line', height: 350 },
        colors: CHART_COLORS,
        stroke: { curve: 'smooth', width: 3 },
        markers: { size: 0, hover: { size: 5 } },
        grid: BASE_GRID,
        tooltip: { theme: 'dark', y: { formatter: v => v + (v===1?' log':' logs') } },
        xaxis: { type: 'datetime', labels: { style: { fontSize: '12px', fontWeight: 500 }, datetimeUTC: false },
                 tooltip: { enabled: false }, axisBorder: { show: false } },
        yaxis: { min: 0, labels: { style: { fontSize: '12px', fontWeight: 500 } }, axisBorder: { show: false } },
        legend: BASE_LEGEND,
        responsive: RESPONSIVE
    };
    if (!globalCumulativeChart) {
        globalCumulativeChart = new ApexCharts(document.querySelector('#cumulativeChart'), opts);
        globalCumulativeChart.render();
    } else {
        globalCumulativeChart.updateOptions(opts, true);
    }
}

function renderDayOfWeekChart(chartData) {
    const users = Object.keys(chartData[0] || {}).filter(k => k !== 'x');
    const opts = {
        series: users.map((u, i) => ({
            name: u,
            data: chartData.map(d => d[u] || 0),
            color: CHART_COLORS[i % CHART_COLORS.length]
        })),
        chart: { ...BASE_CHART, type: 'bar', height: 350, stacked: true },
        colors: CHART_COLORS,
        plotOptions: { bar: { horizontal: false, borderRadius: 6, columnWidth: '70%' } },
        grid: BASE_GRID,
        tooltip: { theme: 'dark', y: { formatter: v => v + (v===1?' log':' logs') } },
        xaxis: { categories: chartData.map(d => d.x),
                 labels: { style: { fontSize: '12px', fontWeight: 500 } }, axisBorder: { show: false } },
        yaxis: { min: 0, labels: { style: { fontSize: '12px', fontWeight: 500 } }, axisBorder: { show: false } },
        legend: BASE_LEGEND,
        fill: { opacity: 1 },
        responsive: RESPONSIVE
    };
    if (!globalDayOfWeekChart) {
        globalDayOfWeekChart = new ApexCharts(document.querySelector('#dayOfWeekChart'), opts);
        globalDayOfWeekChart.render();
    } else {
        globalDayOfWeekChart.updateOptions(opts, true);
    }
}

function updateDisplay(chartView) {
    if (!fullData) return;
    const filtered = getDataForSelectedYear(fullData);
    renderChart(processSnapshot(filtered, chartView));
    renderCumulativeChart(processCumulativeSnapshot(filtered));
    updateHighscore(filtered);
    renderDayOfWeekChart(processDayOfWeekSnapshot(filtered));
}

// ─── User modal ───────────────────────────────────────────────────────────────
function showUserMetrics(username, data) {
    const modal = document.getElementById('userModal');
    document.getElementById('userName').textContent = username;
    const stats = calculateUserStats(username, data[username]);
    currentUserName = username;
    currentUserStats = stats;
    updatePersonalBests(stats);
    updateTimeOfDay(stats);
    updateActiveStreak(stats);
    updateMonthlyAvg(stats);
    // Clear previous charts
    document.getElementById('heatmap').innerHTML = '';
    document.getElementById('timeTrend').innerHTML = '';
    renderHeatmap(stats);
    renderTimeTrend(stats);
    modal.style.display = 'block';
}

function calculateUserStats(username, userData) {
    const stats = {
        dailyMax: 0, weeklyMax: 0, monthlyMax: 0,
        hourlyDistribution: new Array(24).fill(0),
        activeStreak: 0, monthlyAvg: 0, timeData: [], heatmapData: []
    };
    const daily = {}, weekly = {}, monthly = {};
    for (let ts in userData) {
        const d = new Date(ts.substring(0,13).replace('T',' ') + ':00:00');
        const dk = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
        const wk = `${d.getFullYear()}-W${getWeekNumber(d)}`;
        const mk = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
        daily[dk]   = (daily[dk]   || 0) + userData[ts];
        weekly[wk]  = (weekly[wk]  || 0) + userData[ts];
        monthly[mk] = (monthly[mk] || 0) + userData[ts];
        stats.dailyMax   = Math.max(stats.dailyMax,   daily[dk]);
        stats.weeklyMax  = Math.max(stats.weeklyMax,  weekly[wk]);
        stats.monthlyMax = Math.max(stats.monthlyMax, monthly[mk]);
        stats.hourlyDistribution[d.getHours()] += userData[ts];
        stats.timeData.push({ x: d.getTime(), y: userData[ts] });
    }
    const months = Object.keys(monthly).length;
    const total  = Object.values(monthly).reduce((a,b) => a+b, 0);
    stats.monthlyAvg   = months > 0 ? total / months : 0;
    stats.activeStreak = calculateStreak(daily);
    stats.heatmapData  = Object.entries(daily).map(([date,value]) => ({ date, value }));
    return stats;
}

function calculateStreak(dailyCounts) {
    const dates = Object.keys(dailyCounts).sort();
    let cur = 0, max = 0;
    dates.forEach((d, i) => {
        if (i > 0) {
            const diff = Math.floor((new Date(d) - new Date(dates[i-1])) / 86400000);
            cur = diff === 1 ? cur + 1 : 1;
        } else { cur = 1; }
        max = Math.max(max, cur);
    });
    return max;
}

function updatePersonalBests(s) {
    document.getElementById('personalBests').innerHTML = `
        <div class="stat-item"><div class="stat-label">Daily Best</div><div class="stat-value">${s.dailyMax}</div></div>
        <div class="stat-item"><div class="stat-label">Weekly Best</div><div class="stat-value">${s.weeklyMax}</div></div>
        <div class="stat-item"><div class="stat-label">Monthly Best</div><div class="stat-value">${s.monthlyMax}</div></div>`;
}

function updateTimeOfDay(s) {
    const peak = s.hourlyDistribution.indexOf(Math.max(...s.hourlyDistribution));
    const morning = s.hourlyDistribution.slice(6,12).reduce((a,b)=>a+b,0);
    const evening = s.hourlyDistribution.slice(12,20).reduce((a,b)=>a+b,0);
    document.getElementById('timeOfDay').innerHTML = `
        <div class="stat-item"><div class="stat-label">Peak Hour (ET)</div><div class="stat-value">${String(peak).padStart(2,'0')}:00</div></div>
        <div class="stat-item"><div class="stat-label">Morning (6–12 ET)</div><div class="stat-value">${morning}</div></div>
        <div class="stat-item"><div class="stat-label">Evening (12–20 ET)</div><div class="stat-value">${evening}</div></div>`;
}

function updateActiveStreak(s) {
    document.getElementById('activeStreak').innerHTML = `
        <div class="stat-item"><div class="stat-label">Longest Streak</div><div class="stat-value">${s.activeStreak} days</div></div>`;
}

function updateMonthlyAvg(s) {
    document.getElementById('monthlyAvg').innerHTML = `
        <div class="stat-item"><div class="stat-label">Monthly Average</div><div class="stat-value">${s.monthlyAvg.toFixed(1)}</div></div>`;
}

function renderHeatmap(userStats) {
    new ApexCharts(document.querySelector('#heatmap'), {
        series: [{ name: 'Logs', data: userStats.heatmapData.map(i => ({ x: new Date(i.date).getTime(), y: i.value })).sort((a,b)=>a.x-b.x) }],
        chart: { foreColor: '#FFF', background: 'transparent', height: 350, type: 'heatmap',
                 toolbar: { show: false }, animations: { enabled: false }, fontFamily: 'Inter, system-ui, sans-serif' },
        dataLabels: { enabled: false },
        plotOptions: { heatmap: { enableShades: true, distributed: true, radius: 0, useFillColorAsStroke: true,
            colorScale: { ranges: [
                { from: 0,   to: 0,   color: '#2d2d3a', name: '0 logs' },
                { from: 1,   to: 1,   color: '#6c5ce7', name: '1 log'  },
                { from: 2,   to: 2,   color: '#a29bfb', name: '2 logs' },
                { from: 3, to: 999,   color: '#d6d1ff', name: '3+ logs'}
            ]}
        }},
        legend: { show: true, position: 'bottom', fontSize: '14px', fontWeight: 500 },
        grid: { borderColor: '#2d2d3a', padding: { top:0, right:0, bottom:0, left:0 } },
        xaxis: { type: 'datetime', labels: { format: 'MM/dd', style: { fontSize: '12px' }, datetimeUTC: false } },
        yaxis: { show: false },
        tooltip: { theme: 'dark', custom: ({ series, seriesIndex, dataPointIndex, w }) => {
            const date  = new Date(w.globals.seriesX[seriesIndex][dataPointIndex]);
            const value = series[seriesIndex][dataPointIndex];
            return `<div class="apexcharts-tooltip-title">${date.toLocaleDateString()} (ET)</div>
                    <div class="apexcharts-tooltip-series-group"><span>Logs: ${value}</span></div>`;
        }}
    }).render();
}

function renderTimeTrend(userStats) {
    new ApexCharts(document.querySelector('#timeTrend'), {
        series: [{ name: 'Hourly Activity', data: userStats.hourlyDistribution }],
        chart: { foreColor: '#FFF', background: 'transparent', type: 'bar', height: 250,
                 toolbar: { show: false }, fontFamily: 'Inter, system-ui, sans-serif' },
        plotOptions: { bar: { borderRadius: 4, columnWidth: '80%' } },
        colors: ['#6c5ce7'],
        grid: { borderColor: '#2d2d3a', strokeDashArray: 4 },
        xaxis: { categories: Array.from({length:24}, (_,i)=>`${String(i).padStart(2,'0')}:00`),
                 labels: { rotate: -45, style: { fontSize: '12px', fontWeight: 500 } } },
        yaxis: { title: { text: 'Total Logs', style: { color: '#fff', fontWeight: 500 } }, min: 0,
                 labels: { style: { fontSize: '12px', fontWeight: 500 } } },
        title: { text: 'Time of Day Distribution (Eastern Time)', style: { color: '#fff', fontSize: '14px', fontWeight: 500 } },
        fill: { type: 'gradient', gradient: { shade: 'dark', type: 'vertical', shadeIntensity: 0.5,
                gradientToColors: ['#00cec9'], inverseColors: false, opacityFrom: 0.8, opacityTo: 0.9, stops: [0,100] } },
        tooltip: { theme: 'dark', y: { formatter: v => v + (v===1?' log':' logs') } }
    }).render();
}

// ─── Export ───────────────────────────────────────────────────────────────────
function exportUserStats() {
    if (!currentUserStats || !currentUserName) return;
    const filtered = getDataForSelectedYear(fullData);
    const userData = filtered[currentUserName] || {};
    let totalLogs = 0;
    const uniqueDays = new Set();
    for (let ts in userData) {
        totalLogs += userData[ts];
        const d = new Date(ts.substring(0,13).replace('T',' ') + ':00:00');
        uniqueDays.add(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`);
    }
    const isLeap = y => (y%4===0 && y%100!==0) || y%400===0;
    const daysInYear = isLeap(parseInt(selectedYear)) ? 366 : 365;
    const md = `# ${currentUserName} — Poop Chronicles ${selectedYear}\n\n` +
        `*Exported: ${new Date().toLocaleDateString()}*\n\n` +
        `## Summary\n- **Total Logs:** ${totalLogs}\n- **Active Days:** ${uniqueDays.size}\n` +
        `- **Avg/Day:** ${(totalLogs/daysInYear).toFixed(2)}\n\n` +
        `## Personal Bests\n- Daily: ${currentUserStats.dailyMax}\n- Weekly: ${currentUserStats.weeklyMax}\n- Monthly: ${currentUserStats.monthlyMax}\n\n` +
        `## Streaks\n- Longest: ${currentUserStats.activeStreak} days\n\n` +
        `## Monthly Average\n- ${currentUserStats.monthlyAvg.toFixed(1)} logs/month\n`;
    const blob = new Blob([md], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${currentUserName}-poop-stats-${selectedYear}.md`;
    a.click();
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fart-noise').load();

    // Build name grid
    buildNameGrid();

    // Check cache → route to correct UI mode
    const cached = getCachedUser();
    if (cached && USER_MAP[cached]) {
        showQuickLog(cached);
    } else {
        showNamePicker();
    }

    // Chart view toggle
    document.querySelectorAll('input[name="chartView"]').forEach(radio => {
        radio.addEventListener('change', function() { updateDisplay(this.value); });
    });

    // Leaderboard click → user modal
    document.getElementById('highscore').addEventListener('click', e => {
        const entry = e.target.closest('.highscore-entry');
        if (entry) {
            const username = entry.querySelector('.name').textContent.split(' — ')[0];
            showUserMetrics(username, getDataForSelectedYear(fullData));
        }
    });

    // Modal close
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('userModal').style.display = 'none';
    });
    window.addEventListener('click', e => {
        const modal = document.getElementById('userModal');
        if (e.target === modal) modal.style.display = 'none';
    });

    // Export button
    document.getElementById('exportStatsBtn').addEventListener('click', exportUserStats);

    // Fetch data
    fetch('https://us-central1-loglog-a3cf1.cloudfunctions.net/getCounts')
        .then(r => r.json())
        .then(data => {
            fullData = data;
            populateYearDropdown(data);
            updateDisplay('daily');
        })
        .catch(err => console.error('Failed to load data:', err));
});

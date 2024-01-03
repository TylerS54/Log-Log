let counts = {
    Alice: 0,
    Bob: 0,
    Charlie: 0
};

function incrementCounter(name) {
    counts[name]++;
    updateDisplay();
}

function updateDisplay() {
    const countsElement = document.getElementById('counts');
    countsElement.innerHTML = '';
    for (const name in counts) {
        countsElement.innerHTML += `<p>${name}: ${counts[name]}</p>`;
    }
}

// Initialize display
updateDisplay();

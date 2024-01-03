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

function incrementCounter(name) {
    var countRef = database.ref('counts/' + name);
    countRef.transaction(function(currentCount) {
        return (currentCount || 0) + 1;
    });
}

function updateDisplay() {
    var countsElement = document.getElementById('counts');
    var countsRef = database.ref('counts');
    countsRef.on('value', function(snapshot) {
        countsElement.innerHTML = '';
        snapshot.forEach(function(childSnapshot) {
            var name = childSnapshot.key;
            var count = childSnapshot.val();
            countsElement.innerHTML += `<p>${name}: ${count}</p>`;
        });
    });
}

// Initialize display
updateDisplay();

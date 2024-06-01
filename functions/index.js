const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

// Function to increment the counter
exports.incrementCounter = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }

    const { name, timestamp } = req.body;
    const countRef = admin.database().ref('counts/' + name + '/' + timestamp);

    countRef.transaction((currentCount) => {
      return (currentCount || 0) + 1;
    }).then(() => {
      res.status(200).send('Counter incremented successfully');
    }).catch((error) => {
      res.status(500).send(error.message);
    });
  });
});

// Function to get the counts
exports.getCounts = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== 'GET') {
      return res.status(405).send('Method Not Allowed');
    }

    const countsRef = admin.database().ref('counts');

    countsRef.once('value')
      .then(snapshot => {
        res.status(200).json(snapshot.val());
      })
      .catch(error => {
        res.status(500).send(error.message);
      });
  });
});

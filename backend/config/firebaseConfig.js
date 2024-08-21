// firebaseConfig.js
const admin = require('firebase-admin');
const multer = require('multer');

// Load your Firebase credentials
const serviceAccount = require('./equip9-b9d1e-firebase-adminsdk-v5ey1-6725724495.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "equip9-b9d1e.appspot.com"
});

const bucket = admin.storage().bucket();

// Set up multer to handle file uploads locally before sending to Firebase
const upload = multer({
    storage: multer.memoryStorage() // Store file in memory before uploading to Firebase
});

module.exports = { admin, bucket, upload };

// firebaseConfig.js
import admin from "firebase-admin";
import multer from "multer";


// Load your Firebase credentials
import serviceAccount from './equip9-b9d1e-firebase-adminsdk-v5ey1-9da2a810fa.json' assert { type: "json" };

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

export { admin, bucket, upload };

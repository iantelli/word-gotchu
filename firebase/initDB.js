import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, child, get, set } from "firebase/database";

import config from "./config.json";
import "dotenv/config";

// https://www.bestwordlist.com/5letterwords.htm

// const firebaseConfig = {
//   apiKey: config.apiKey,
//   authDomain: config.authDomain,
//   projectId: config.projectId,
//   storageBucket: config.storageBucket,
//   messagingSenderId: config.messagingSenderId,
//   appId: config.appId,
//   measurementId: config.measurementId,
//   databaseURL: config.databaseURL
// };

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
  databaseURL: process.env.DATABASE_URL
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);
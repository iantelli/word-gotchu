import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, child, get, set } from "firebase/database";

import config from "./firebaseConfig.json";
// https://www.bestwordlist.com/5letterwords.htm

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);
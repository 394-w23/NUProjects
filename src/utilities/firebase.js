// Import the functions you need from the SDKs you need
import { useState, useEffect, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: "https://nuprojects-37022-default-rtdb.firebaseio.com",
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(
    () =>
      onValue(
        ref(database, path),
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        }
      ),
    [path]
  );

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );

  return [updateData, result];
};

export const writeJobData = (params) => {
  const db = getDatabase();
  set(ref(db, "jobs/" + params.jobId), {
    // default empty if no value passed
    contactInfo: params.contactInfo || "",
    datePosted: params.datePosted || "",
    dateToSubmit: params.dateToSubmit || "",
    description: params.description || "",
    hashtags: params.hashtags || "",
    numberOfPeople: params.numberOfPeople || "",
    positionName: params.positionName || "",
    projectName: params.projectName || "",
    skillsRequired: params.skillsRequired || "",
    startDate: params.startDate || "",
    endDate: params.endDate || "",
    typeOfProject: params.typeOfProject || "",
    user: params.user || "",
    wage: params.wage || "",
    jobId: params.jobId || "",
  });
}

//write a tset to the database

//write a user to the database
function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, "users/" + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
}

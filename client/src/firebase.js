import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

 
let firebaseConfig = { 
  apiKey: "AIzaSyB7t26dT-KVyFbmrf7otOHkeJ5Tg_fGWuM",
  authDomain: "nextplatform77-79102.firebaseapp.com",
  projectId: "nextplatform77-79102",
  storageBucket: "nextplatform77-79102.appspot.com",
  messagingSenderId: "514732894734",
  appId: "1:514732894734:web:bee4aeaa0acdd975546a5f"
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
    return getToken(messaging, { vapidKey: 'BPbc_MVD5enaB7qyssJYJWXdyOZhnsm_1LwWvb6Fz1h2myaTX3RymIZDArKRdPJa-d9I8wXrKJdrHz7MisI5y_g' })
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          // Perform any other neccessary action with the token
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  };

  export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });
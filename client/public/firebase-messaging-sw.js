// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyB7t26dT-KVyFbmrf7otOHkeJ5Tg_fGWuM",
    authDomain: "nextplatform77-79102.firebaseapp.com",
    projectId: "nextplatform77-79102",
    storageBucket: "nextplatform77-79102.appspot.com",
    messagingSenderId: "514732894734",
    appId: "1:514732894734:web:bee4aeaa0acdd975546a5f"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
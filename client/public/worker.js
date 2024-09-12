self.addEventListener('push', (event) => {
  const data = event.data.json();
  console.log('Push Received...');
  self.registration.showNotification(data.title, {
    body: data.message || 'Join us for today\'s service. God bless you!',
    icon: 'https://firebasestorage.googleapis.com/v0/b/thechristmiracles.appspot.com/o/others_Main%2FchristImg.jpg?alt=media&token=17934020-593d-4122-84a7-841f282c3202',
    vibrate: [100, 50, 100],
    data: {
      url: 'https://your-website-url.com'  // Your website URL or where you want the user to go
    }
  });
});

// Handle notification click event
self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('https://your-website-url.com');
      }
    })
  );
});
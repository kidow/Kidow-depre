importScripts('https://www.gstatic.com/firebasejs/7.14.3/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.14.3/firebase-messaging.js')

firebase.initializeApp({
  messagingSenderId: '',
  projectId: '',
  apiKey: '',
  appId: ''
})

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )

  return self.registration.showNotification('Background Message Title', {
    body: 'Background Message body.',
    icon: '/icon.png'
  })
})

const functions = require('firebase-functions')
const { Nuxt } = require('nuxt-start')
const express = require('express')
const admin = require('firebase-admin')
const firebaseConfigs = require('./firebase-private.json')
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfigs),
  databaseURL: 'https://kidow-117fd.firebaseio.com'
})

const app = express()

const nuxtConfig = require('./nuxt.config.js')

const config = {
  ...nuxtConfig,
  dev: false,
  debug: false
}
const nuxt = new Nuxt(config)

let isReady = false
const readyPromise = nuxt
  .ready()
  .then(() => (isReady = true))
  .catch(() => process.exit(1))

async function handleRequest(req, res) {
  if (!isReady) await readyPromise
  res.set('Cache-Control', 'public, max-age=3600, s-maxage=3600')
  await nuxt.render(req, res)
}

app.get('*', handleRequest)
app.use(handleRequest)
exports.webhook = functions.https.onRequest(app)
exports.webhookAsia = functions.region('asia-northeast1').https.onRequest(app)
exports.sendToDevice = functions
  .region('asia-northeast1')
  .firestore.document('/comments/{commentId}')
  .onCreate(async (snap, context) => {
    const { userId, title } = snap.data()
    const firestore = admin.firestore()
    const tokenRef = await firestore
      .collection('/tokens')
      .where('userId', '==', userId)
      .get()
    const { token } = tokenRef.docs[0].data()
    if (!token) return console.log('no token.')
    const notification = {
      title: '블로그에 댓글이 달렸습니다.',
      body: title
    }
    await admin.messaging().sendToDevice(token, { notification })
    await firestore.collection('/notifications').add({
      ...notification,
      createdAt: new Date()
    })
  })

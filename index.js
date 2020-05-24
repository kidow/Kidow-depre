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
exports.sendToDevice = functions.https.onRequest((req, res) => {
  const { title, token, body } = req.body
  if (req.method.toUpperCase() !== 'POST')
    return console.log('please submit by POST method.')
  if (!message) return console.log('no message.')
  if (!token) return console.log('no token.')
  admin
    .messaging()
    .sendToDevice(token, {
      notification: {
        title,
        body
      }
    })
    .catch(err => console.log('sendToDevice Error: ', err))
})

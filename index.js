const functions = require('firebase-functions')
const { Nuxt } = require('nuxt-start')
const express = require('express')

const app = express()

const nuxtConfig = require('./nuxt.config.js')

const config = {
  ...nuxtConfig,
  dev: false,
  debug: false
}
const nuxt = new Nuxt(config)

function handleRequest(req, res) {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
  return new Promise((resolve, reject) => {
    nuxt
      .ready()
      .then(() =>
        nuxt.render(req, res, promise => promise.then(resolve).catch(reject))
      )
  })
}
console.log(1)
app.use(handleRequest)
exports.webhook = functions.https.onRequest(app)
exports.webhookAsia = functions.region('asia-northeast1').https.onRequest(app)

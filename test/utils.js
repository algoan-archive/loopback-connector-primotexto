'use strict'

const loopback = require('loopback')
const express = require('express')
const bodyParser = require('body-parser')

const connector = require('../')

exports.createFakeServerFn = function (port) {
  const app = express()
  const result = {
    app: app,
    onSendNotificationSms: null,
    onSendMarketingSms: null
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())

  app.post('/v2/notification/messages/send', function (req, res) {
    result.onSendNotificationSms = result.onSendNotificationSms || function (headers, body, cb) {
      cb(200, {})
    }
    result.onSendNotificationSms(req.headers, req.body, function (code, body) {
      res.status(code).json(body)
    })
  })

  app.post('/v2/marketing/messages/send', function (req, res) {
    result.onSendMarketingSms = result.onSendMarketingSms || function (headers, body, cb) {
      cb(200, {})
    }
    result.onSendMarketingSms(req.headers, req.body, function (code, body) {
      res.status(code).json(body)
    })
  })

  const appServer = app.listen(port)
  result.close = function () {
    appServer.close()
  }

  return result
}

exports.setupPrimotextoConnector = function (apiUrl, apiKey) {
  const datasource = loopback.createDataSource({
    connector: connector,
    apiUrl: apiUrl,
    apiKey: apiKey
  })

  return datasource.createModel('primotexto', {
    type: {
      type: String,
      id: true,
      required: false,
      default: 'notification'
    },
    number: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    sender: {
      type: String,
      required: false
    },
    campaignName: {
      type: String,
      required: false
    },
    category: {
      type: String,
      required: false
    },
    date: {
      type: Number,
      required: false
    }
  })
}

'use strict'
/* global describe, it, before, after, beforeEach*/

const Promise = global.Promise || require('bluebird') // eslint-disable-line global-require
const should = require('should') // eslint-disable-line no-unused-vars
const _ = require('lodash')

const utils = require('./utils')

const port = '3000'
const apiUrl = 'http://127.0.0.1:' + port
const apiKey = '1234'

const receiver = '+33600000000'
const sender = 'SPC'

describe('Primotexto', function () {
  let fakeServer = null
  let Primotexto = null

  before(function () {
    fakeServer = utils.createFakeServerFn(port)
    return Promise.resolve()
  })

  after(function () {
    fakeServer.close()
    return Promise.resolve()
  })

  describe('Send notification sms', function () {
    beforeEach(function () {
      fakeServer.onSendMarketingSms = null
      fakeServer.onSendNotificationSms = null
    })

    before(function () {
      Primotexto = utils.setupPrimotextoConnector(apiUrl, apiKey)
      return Promise.resolve()
    })

    after(function () {
      Primotexto = null
      return Promise.resolve()
    })

    it('should send the sms with full options', function (done) {
      let doneCount = 0
      const doneCb = function () {
        doneCount++
        if (doneCount >= 2) done()
      }

      const smsData = {
        type: 'notification',
        number: receiver,
        message: 'Hello, from the StrongLoop Primotexto Connector!',
        sender: sender,
        campaignName: 'StrongLoop Connector Test',
        category: 'strongloop-connector-test',
        date: Date.now()
      }

      const standardResponse = {
        creditsUsed: 1.0,
        snapshotId: '386479'
      }

      fakeServer.onSendNotificationSms = function (headers, body, cb) {
        headers['x-primotexto-apikey'].should.be.equal(apiKey)
        headers['content-type'].should.be.equal('application/json')

        const dataToReceive = _.clone(smsData)
        delete dataToReceive.type
        body.should.be.eql(dataToReceive)
        cb(200, standardResponse)
        doneCb()
      }

      Primotexto.send(smsData)
        .then(function (data) {
          data.should.be.eql(standardResponse)
          doneCb()
        })
    })

    it('should send the sms with minimal options', function (done) {
      let doneCount = 0
      const doneCb = function () {
        doneCount++
        if (doneCount >= 2) done()
      }

      const smsData = {
        number: receiver,
        message: 'Hello, from the StrongLoop Primotexto Connector!'
      }

      const standardResponse = {
        creditsUsed: 1.0,
        snapshotId: '386479'
      }

      fakeServer.onSendNotificationSms = function (headers, body, cb) {
        headers['x-primotexto-apikey'].should.be.equal(apiKey)
        headers['content-type'].should.be.equal('application/json')

        const dataToReceive = _.clone(smsData)
        delete dataToReceive.type
        body.should.be.eql(dataToReceive)
        cb(200, standardResponse)
        doneCb()
      }

      Primotexto.send(smsData)
        .then(function (data) {
          data.should.be.eql(standardResponse)
          doneCb()
        })
    })

    it('should work also with a callback', function (done) {
      let doneCount = 0
      const doneCb = function () {
        doneCount++
        if (doneCount >= 2) done()
      }

      const smsData = {
        number: receiver,
        message: 'Hello, from the StrongLoop Primotexto Connector!'
      }

      const standardResponse = {
        creditsUsed: 1.0,
        snapshotId: '386479'
      }

      fakeServer.onSendNotificationSms = function (headers, body, cb) {
        headers['x-primotexto-apikey'].should.be.equal(apiKey)
        headers['content-type'].should.be.equal('application/json')

        const dataToReceive = _.clone(smsData)
        delete dataToReceive.type
        body.should.be.eql(dataToReceive)
        cb(200, standardResponse)
        doneCb()
      }

      Primotexto.send(smsData, function(err, data) {
        should.not.exists(err)
        data.should.be.eql(standardResponse)
        doneCb()
      })
    })

    it('should fail with some wrong options', function () {
      const smsData = {
        number: receiver
      }

      return Primotexto.send(smsData)
        .catch(function (err) {
          err.name.should.be.eql('AssertionError')
          err.message.should.be.eql('Content of the sms ("message") is required (current: "undefined").')
          return Promise.resolve()
        })
    })
  })

  describe('Send marketing sms', function () {
    beforeEach(function () {
      fakeServer.onSendMarketingSms = null
      fakeServer.onSendNotificationSms = null
    })

    before(function () {
      Primotexto = utils.setupPrimotextoConnector(apiUrl, apiKey)
      return Promise.resolve()
    })

    after(function () {
      Primotexto = null
      return Promise.resolve()
    })

    it('should send the sms with full options', function (done) {
      let doneCount = 0
      const doneCb = function () {
        doneCount++
        if (doneCount >= 2) done()
      }

      const smsData = {
        type: 'marketing',
        number: receiver,
        message: 'Hello, from the StrongLoop Primotexto Connector!',
        sender: sender,
        campaignName: 'StrongLoop Connector Test',
        category: 'strongloop-connector-test',
        date: Date.now()
      }

      const standardResponse = {
        creditsUsed: 1.0,
        snapshotId: '386479'
      }

      fakeServer.onSendMarketingSms = function (headers, body, cb) {
        headers['x-primotexto-apikey'].should.be.equal(apiKey)
        headers['content-type'].should.be.equal('application/json')
        const dataToReceive = _.clone(smsData)
        delete dataToReceive.type
        body.should.be.eql(dataToReceive)
        cb(200, standardResponse)
        doneCb()
      }

      Primotexto.send(smsData)
        .then(function (data) {
          data.should.be.eql(standardResponse)
          doneCb()
        })
    })

    it('should send the sms with minimal options', function (done) {
      let doneCount = 0
      const doneCb = function () {
        doneCount++
        if (doneCount >= 2) done()
      }

      const smsData = {
        type: 'marketing',
        number: receiver,
        message: 'Hello, from the StrongLoop Primotexto Connector!'
      }

      const standardResponse = {
        creditsUsed: 1.0,
        snapshotId: '386479'
      }

      fakeServer.onSendMarketingSms = function (headers, body, cb) {
        headers['x-primotexto-apikey'].should.be.equal(apiKey)
        headers['content-type'].should.be.equal('application/json')

        const dataToReceive = _.clone(smsData)
        delete dataToReceive.type
        body.should.be.eql(dataToReceive)
        cb(200, standardResponse)
        doneCb()
      }

      Primotexto.send(smsData)
        .then(function (data) {
          data.should.be.eql(standardResponse)
          doneCb()
        })
    })

    it('should work also with a callback', function (done) {
      let doneCount = 0
      const doneCb = function () {
        doneCount++
        if (doneCount >= 2) done()
      }

      const smsData = {
        type: 'marketing',
        number: receiver,
        message: 'Hello, from the StrongLoop Primotexto Connector!'
      }

      const standardResponse = {
        creditsUsed: 1.0,
        snapshotId: '386479'
      }

      fakeServer.onSendMarketingSms = function (headers, body, cb) {
        headers['x-primotexto-apikey'].should.be.equal(apiKey)
        headers['content-type'].should.be.equal('application/json')

        const dataToReceive = _.clone(smsData)
        delete dataToReceive.type
        body.should.be.eql(dataToReceive)
        cb(200, standardResponse)
        doneCb()
      }

      Primotexto.send(smsData, function (err, data) {
        should.not.exists(err)
        data.should.be.eql(standardResponse)
        doneCb()
      })
    })

    it('should fail with some wrong options', function () {
      const smsData = {
        type: 'marketing',
        number: receiver
      }

      return Primotexto.send(smsData)
        .catch(function (err) {
          err.name.should.be.eql('AssertionError')
          err.message.should.be.eql('Content of the sms ("message") is required (current: "undefined").')
          return Promise.resolve()
        })
    })
  })

  describe('Send notification sms with a wrong API key', function () {
    beforeEach(function () {
      fakeServer.onSendMarketingSms = null
      fakeServer.onSendNotificationSms = null
    })

    before(function () {
      Primotexto = utils.setupPrimotextoConnector(apiUrl, 'wrongAPIKey')
      return Promise.resolve()
    })

    after(function () {
      Primotexto = null
      return Promise.resolve()
    })

    it('should fail with a returned 401 error code', function (done) {
      let doneCount = 0
      const doneCb = function () {
        doneCount++
        if (doneCount >= 2) done()
      }

      const smsData = {
        number: receiver,
        message: 'Hello, from the StrongLoop Primotexto Connector!'
      }

      fakeServer.onSendNotificationSms = function (headers, body, cb) {
        cb(401, {})
        doneCb()
      }

      Primotexto.send(smsData)
        .catch(function (error) {
          error.statusCode.should.be.eql(401)
          doneCb()
        })
    })
  })
})
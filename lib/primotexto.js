'use strict'

const Promise = global.Promise || require('bluebird') // eslint-disable-line global-require
const rq = require('request-promise')
const assert = require('assert')

/**
 * @param {object} settings
 * @param {string} settings.apiUrl
 * @param {string} settings.apiKey
 * @return {Primotexto}
 */
function Primotexto(settings) {
  this.baseApiUrl = settings.apiUrl
  this.apiKey = settings.apiKey

  return this
}

Primotexto._internals = {}


/**
 * Verify and format form data to send
 * @param {string} type
 * @param {object} options
 * @return {object}
 */
Primotexto._internals.formatData = function (type, options) {
  const data = {}

  assert(options, 'Parameters ("options") should be an object (current: "' + JSON.stringify(options) + '").')
  assert(options.number, 'Receiver phone number ("number") is required (current: "' + options.number + '").')
  assert(options.message, 'Content of the sms ("message") is required (current: "' + options.message + '").')

  data.number = options.number
  data.message = options.message
  data.sender = options.sender
  data.campaignName = options.campaignName
  data.category = options.category
  data.date = options.date

  return data
}


/**
 * Verify and format form data to send
 * @param {string} type
 * @param {object} options
 * @param {function} callback
 * @return {Promise}
 */
Primotexto.prototype.send = function (type, options, callback) {
  const self = this

  return new Promise(function (resolve, reject) {
    const cb = function (err, res) {
      if (callback) {
        callback(err, res)
      } else if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    }

    type = type !== 'marketing'
    const relativeApiUrl = type ? '/v2/notification/messages/send' : '/v2/marketing/messages/send'
    const data = Primotexto._internals.formatData(type, options)

    const params = {
      method: 'POST',
      uri: self.baseApiUrl + relativeApiUrl,
      headers: {
        'X-Primotexto-ApiKey': self.apiKey
      },
      body: data,
      json: true
    }

    rq.post(params)
      .then(function (res) {
        cb(null, res)
      })
      .catch(function (err) {
        cb(err)
      })
  })
}

module.exports = Primotexto

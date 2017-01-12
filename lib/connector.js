'use strict'

const assert = require('assert')
const PT = require('./primotexto')

let primotexto = null

/**
 * Export the PrimotextoConnector class.
 */
module.exports = PrimotextoConnector

/**
 * Create an instance of the connector with the given `settings`.
 * @param {object} settings
 * @param {string} settings.apiUrl
 * @param {string} settings.apiKey
 * @return {PrimotextoConnector}
 */
function PrimotextoConnector(settings) {
  assert(typeof settings === 'object', 'cannot initialize PrimotextoConnector without a settings object')
  const connector = this

  const apiUrl = this.apiUrl = settings.apiUrl || 'https://api.primotexto.com'
  const apiKey = this.apiKey = settings.apiKey

  primotexto = connector.primotexto = new PT({
    apiUrl: apiUrl,
    apiKey: apiKey
  })
}

PrimotextoConnector.initialize = function (dataSource, callback) {
  dataSource.connector = new PrimotextoConnector(dataSource.settings)
  callback()
}

PrimotextoConnector.prototype.DataAccessObject = Primotexto

function Primotexto() {}

/**
 * Send a Primotexto notification sms with the given `options`.
 * @param {object} options 
 * @param {function} [fn]
 * @return {Promise} 
 */
Primotexto.send = function (options, fn) {
  const dataSource = this.dataSource
  const settings = dataSource && dataSource.settings
  const connector = dataSource.connector
  assert(connector, 'Cannot use this module without a connector!')
  assert(settings, 'Cannot use this module without settings!')
  assert(options, 'Cannot send sms without options!')
  return connector.primotexto.send(options && options.type, options, fn)
}

/**
 * Initialize the connector for the given data source
 * @param {DataSource} dataSource The data source instance
 * @param {Function} [callback] The callback function
 */
exports.initialize = function initializeDataSource(dataSource, callback) {}

/**
 * Send using `modelInstance.send()`.
 */
Primotexto.prototype.send = function (fn) {
  return this.constructor.send(this, fn)
}

/**
 * Access the primotexto client object.
 */
PrimotextoConnector.client = PrimotextoConnector.prototype.client = Primotexto.client = Primotexto.prototype.client = primotexto

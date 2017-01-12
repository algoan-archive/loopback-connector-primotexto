'use strict'

const loopback = require('loopback')

const connector = require('../')

const apiUrl = 'https://api.primotexto.com' // not required
const apiKey = 'YOUR_PRIMOTEXTO_API_KEY'


const receiver = 'RECEIVER_PHONE_NUMBER' // in national or E164 phone number format
const sender = 'SPC' // your phone number or a string limited from 3 to 11 alphanumeric characters

const smsData = {
  type: 'notification', // not required
  number: receiver,
  message: 'Hello, from the StrongLoop Primotexto Connector!',
  sender: sender, // not required
  campaignName: 'StrongLoop Connector Test', // not required
  category: 'strongloop-connector-test', // not required
  date: Date.now() // not required
}

const datasource = loopback.createDataSource({
  connector: connector,
  apiUrl: apiUrl,
  apiKey: apiKey
})

const Primotexto = datasource.createModel('primotexto', {
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

Primotexto.send(smsData, function (err, data) {
  if (err) {
    console.log(err) // eslint-disable-line
  } else {
    console.log(data) // eslint-disable-line
  }
})

// or with Promise

Primotexto.send(smsData)
  .then(function (data) {
    console.log(data) // eslint-disable-line
  })
  .catch(function (err) {
    console.log(err) // eslint-disable-line
  })

[![Build Status](https://travis-ci.org/yelloan/loopback-connector-primotexto.svg?branch=master)](https://travis-ci.org/yelloan/loopback-connector-primotexto) [![Coverage Status](https://coveralls.io/repos/github/yelloan/loopback-connector-primotexto/badge.svg?branch=master)](https://coveralls.io/github/yelloan/loopback-connector-primotexto?branch=master) 

# loopback-connector-primotexto

## Introduction 

A [Primotexto](http://www.primotexto.com/) connector for [LoopBack](http://www.loopback.io).

This connector is an adaptation of [loopback-connector-twilio](https://github.com/dashby3000/loopback-connector-twilio) and [loopback-connector-yunpian](https://github.com/mackwan84/loopback-connector-yunpian) for [primotexto API](http://www.primotexto.com/).

The connector supports the following aspects of the [Primotexto REST API](https://www.primotexto.com/api/):
  - [Sending notification SMS](https://www.primotexto.com/api/sms/notification.asp)
  - [Sending marketing SMS](https://www.primotexto.com/api/sms/marketing.asp)

## Installation

In your LoopBack project:

```bash
$ npm install loopback-connector-primotexto
```

## Using the Connector

To use the connector, define the datasource using the connector in your `datasources.json` file:

```JSON  
"primotexto": {
    "name": "primotexto",
    "connector": "loopback-connector-primotexto",
    "apiKey": "YOUR_PRIMOTEXTO_API_KEY"
}
```
  
Next, attach the created datasource to a model in the `model-config.json` file:

```JSON
"Primotexto": {
    "dataSource": "primotexto",
    "public": true
}
```
    
Now, using the created model, you can send a SMS using the `send` method of the model:

```Javascript
// with a callback
Primotexto.send(options, function (err, res) {

});


// or with a Promise
Primotexto.send(options)
    .then(function (res) {

    })
    .catch(function (err) {
    });
```
    
**Note**: `options` is defined by the JSON objects in the next two sections:

### Sending a notification SMS

```JSON
{
    "type": "notification",
    "receiver": "RECEIVER_PHONE_NUMBER",
    "message": "TEXT_MESSAGE",
    "sender": "YOUR_PHONE_NUMBER",
    "campaignName": "CAMPAIN_NAME",
    "category": "CATEGORY"
}
```

### Sending a marketing SMS

```JSON
{
    "type": "marketing",
    "receiver": "RECEIVER_PHONE_NUMBER",
    "message": "TEXT_MESSAGE",
    "sender": "YOUR_PHONE_NUMBER",
    "campaignName": "CAMPAIN_NAME",
    "category": "CATEGORY"
}
```
    
## Running the Example
To run the example in the `/example/example.js` directory, you must set the following values in the file:

```Javascript
const apiKey = 'YOUR_PRIMOTEXTO_API_KEY'
const receiver = 'RECEIVER_PHONE_NUMBER'
const sender = 'SPC'
```

Next, from the from the `/loopback-connector-primotexto/` directory, install the `loopback` module using the following command:

```bash
$ npm install loopback
```
    
Finally, run the example app using the following command from the `/loopback-connector-primotexto/` directory:

```bash
$ node ./example/example.js
```

## Improvements

- Add to [npmjs.com](https://www.npmjs.com/)
- Plug with [travis-ci](https://travis-ci.org/)
- Plug with [coveralls.io](https://coveralls.io/)
- Wrap the returned [error codes](https://www.primotexto.com/api/plus/code_erreurs.asp) in [callback](https://github.com/yelloan/loopback-connector-primotexto/blob/master/lib/primotexto.js#L87)
- Improve verification of the input data in [the Primotexto._internals.formatData](https://github.com/yelloan/loopback-connector-primotexto/blob/master/lib/primotexto.js#L29)
- Add functions to validate phone numbers with [libphonenumber](https://github.com/googlei18n/libphonenumber)

## Contributing

We welcome your contributions! Thanks for helping make loopback-connector-primotexto a better project for everyone.

## Testing

To start the test from `test/test.js` , use the following command :

```bash
$ npm test
```

You can also run code coverage with :

```bash
$ npm run-script cover
```

## Version

0.2.1

License
----

MIT Copyright (c) 2017 Yelloan


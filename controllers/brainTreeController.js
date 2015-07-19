'use strict'

var braintree = require("braintree");
var config = require('./env.json')['brain-tree'];

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: config.merchantId,
  publicKey: config.publicKey,
  privateKey: config.privateKey
});

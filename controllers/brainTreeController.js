'use strict'

var braintree = require("braintree");
var config = require('../env.json')['brainTree'];


var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: config.merchantId,
  publicKey: config.publicKey,
  privateKey: config.privateKey
});
exports.getToken = function (request, reply) {
  gateway.clientToken.generate({}, function (err, response) {
    reply(response.clientToken);
  });
}

exports.sendTransaction =  function (request, reply) {
	var nonce = request.payload.payment_method_nonce;
  console.log("nonce is " + nonce);
  
	// Use payment method nonce here
	gateway.transaction.sale({
  		amount: "10.00",
  		paymentMethodNonce: nonce,
	}, function (err, result) {
		console.log("purchase result: " + result.success);
		reply();
	});
}

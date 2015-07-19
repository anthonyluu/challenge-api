'use strict'

var braintree = require("braintree");
var config = require('../env.json')['brainTree'];


var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: config.merchantId,
  publicKey: config.publicKey,
  privateKey: config.privateKey
});
console.log(gateway);
exports.getToken = function (request, reply) {
  gateway.clientToken.generate({}, function (err, response) {
  	console.log(res);
    res.send(response.clientToken);
  });
}

exports.sendTransaction =  function (request, reply) {
	var nonce = request.body.payment_method_nonce;
	// Use payment method nonce here
	gateway.transaction.sale({
  		amount: "10.00",
  		paymentMethodNonce: nonce,
	}, function (err, result) {
		console.log("purchase result: " + result.success);
		res.send();
	});
}
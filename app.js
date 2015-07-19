var Hapi = require('hapi'),
    Bell = require('bell'),
    Mongoose = require('mongoose'),
    RequestModule = require('request'),
    ChallengeController = require('./controllers/challengeController'),
    UserController = require('./controllers/userController'),
    brainTreeController = require('./controllers/brainTreeController')
    braintree = require("braintree");


var config = require('./env.json');

var MongoConfig = config['production'];    
var clientId = "57acad3f5f1aa298c29d";
var clientSecret = process.env.CLIENT_SECRET;

var server = new Hapi.Server();
server.connection({ port: 9000 });

Mongoose.connect(MongoConfig.MONGO_URI);


/* // remove these comments when ready to test with github integration using Bell.
server.register(Bell, function (err) {

    server.auth.strategy('github', 'bell', {
        provider: 'github',
        password: 'password',
        isSecure: false,
        // Make sure to set a "Callback URL" and
        // check the "Allow this application to be used to Sign in with Twitter"
        // on the "Settings" tab in your Twitter application
        clientId: '',                               // Set client id
        clientSecret: ''                            // Set client secret
    });

    server.route({
        method: ['GET', 'POST'],
        path: '/login',
        config: {
            auth: {
                strategy: 'github',
                mode: 'try'
            },
            handler: function (request, reply) {

                if (!request.auth.isAuthenticated) {
                    return reply('Authentication failed due to: ' + request.auth.error.message);
                }

                return reply.redirect('/home');
            }
        }
    });

*/
	server.route({
	    method: 'GET',
	    path: '/',
	    handler: function (request, reply) {
	        reply('Hello, world!');
	    }
	});

	server.route({
	    method: 'GET',
	    path: '/{name}',
	    handler: function (request, reply) {
	        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
	    }
	});

    server.route({
        method: 'GET',
        path: '/github/authorize',
        handler: function (request, reply) {
            var singleUseCode = request.query.singleUseCode;
            console.log(clientSecret);
            RequestModule({
                url: 'https://github.com/login/oauth/access_token', //URL to hit
                method: 'POST',
                //Lets post the following key/values as form
                json: {
                    client_id: clientId,
                    client_secret: clientSecret,
                    code: singleUseCode,
                    async: false
                }
                }, function(error, response, body){
                    if(error) {
                        console.log(error);
                    } else {
                        console.log(body);
                        reply(body)
                        // reply back with access tokens
                    }
                });
        }
    });
    server.route({
        method: 'GET',
        path: '/client_token',
        handler: brainTreeController.getToken
    });
    server.route({
        method: 'POST',
        path: '/purchases',
        handler: brainTreeController.sendTransaction

    });
    /** Challenge controller routes **/
    server.route({
        method: 'POST',
        path: '/challenge/create',
        handler: ChallengeController.createChallenge
    });
    
    server.route({
        method: 'GET',
        path: '/challenge/all',
        handler: ChallengeController.getAllChallenges
    });

    server.route({
        method: 'GET',
        path: '/challenge/{issueId}',
        handler: ChallengeController.getChallenge
    });

    server.route({
        method: 'GET',
        path: '/users',
        handler: UserController.getAllUsers
    });

    server.start(function (err) {
        console.log('Server started at:', server.info.uri);
    });
/*
});
*/

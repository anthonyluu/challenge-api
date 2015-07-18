var Hapi = require('hapi'),
	Bell = require('bell');

var server = new Hapi.Server();
server.connection({ port: 3000 });


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

    server.start(function (err) {

        console.log('Server started at:', server.info.uri);
    });
/*
});
*/

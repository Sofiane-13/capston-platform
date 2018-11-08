var should = require('should'),
	base = require('./_base'),
	Arrow = require('arrow'),
	request = require('request'),
	server = base.server;

describe('APIs', function () {

	var user;

	before(function (next) {
		server.getModel('testuser').create({
			first_name: 'Johnny',
			last_name: 'Test',
			email: 'jtest@appcelerator.com'
		}, function (err, result) {
			should(err).be.not.ok();
			user = result;
			next();
		});
	});

	it('should be able to hit testapi programmatically', function (next) {
		var api = server.getAPI('/api/testapi/:id');
		should(api).be.ok();
		api.execute({id: user.getPrimaryKey()}, function (err, result) {
			should(err).be.not.ok();
			should(result).have.property('success', true);
			should(result).have.property('testuser');
			should(result.testuser).have.property('first_name', user.first_name);
			next();
		});
	});

	it('should be able to hit testapi via http', function (next) {
		var auth = {
			user: server.config.apikey,
			password: ''
		};
		request({
			method: 'GET',
			uri: 'http://localhost:' + server.port + '/api/testapi/' + user.getPrimaryKey(),
			auth: auth,
			json: true
		}, function (err, response, result) {
			should(result).have.property('success', true);
			should(result).have.property('testuser');
			should(result.testuser).have.property('first_name', user.first_name);
			next();
		});
	});

});

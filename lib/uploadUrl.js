var $ = require('jquery')
var getData = require('./internalMethods').getData

module.exports = function (key) {
	return $.Deferred(function (dfd) {
		getData('system', `uploadurl?key=${key}`, dfd)
	})
}
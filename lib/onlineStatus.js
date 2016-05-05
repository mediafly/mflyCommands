var $ = require('jquery')
var getData = require('./internalMethods').getData

module.exports = function () {
	return $.Deferred(function (dfd) {
		getData('online-status', null, dfd)
	})
}
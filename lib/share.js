var $ = require('jquery')
var getData = require('./internalMethods').getData

module.exports = function (id) {
	return $.Deferred(function (dfd) {
		getData('items', id + '/share', dfd)
	})
}
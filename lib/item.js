var $ = require('jquery')
var getData = require('./internalMethods').getData

function get(id) {
	return $.Deferred(function (dfd) {
		getData('items', id, dfd)
	})
}

function getCurrent() {
	return get('__self__')
}


exports.get = get
exports.getCurrent = getCurrent
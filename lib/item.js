var getData = require('./internalMethods').getData

function get(id) {
	return getData('items', id)
}

function getCurrent() {
	return get('__self__')
}

exports.get = get
exports.getCurrent = getCurrent
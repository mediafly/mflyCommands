// /interactive-api/{version}/items?filter={key1}:{value1},{key2}:{value2}

var $ = require('jquery')
var getData = require('./internalMethods').getData

function objToString(obj) {
	var result = ''
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			result += key + ':' + obj[key] + ','
		}
	}
	result.slice(0, result.length - 1)
	return result
}

module.exports = function(obj) {
	var dfd1 = $.Deferred()
	var result = []
	var offset = 0
	var limit = 100

	var getPage = function () {
		var filter = encodeURIComponent(objToString(obj))
		return getData(`items?filter=${filter}&offset=${offset}&limit=${limit}`, null)
			.done(function (data) {
				result = result.concat(data)
				if (data.length < limit) {
					dfd1.resolve(result)
				} else {
					offset += limit
					getPage()
			}
		}).fail(function () {
			dfd1.reject()
		})
	}

	getPage(offset, limit)

	return dfd1.promise()
}
import { get } from './internalMethods'

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

function getPage(obj, offset, limit) {

	var filter = encodeURIComponent(objToString(obj))
	return get(`items?filter=${filter}&offset=${offset}&limit=${limit}`)
}

function getAllFilterResults(obj) {
	var Deferred = $.Deferred()

	var result = []
	var offset = 0
	var limit = 100
	
	getPage(obj, offset, limit)
		.done(function (data: any) {
			result = result.concat(data)
			if (data.length < limit) {
				Deferred.resolve(result)
			} else {
				offset += limit
				getPage(obj, offset, limit)
		}
		}).fail(function () {
			Deferred.reject()
		})

	return Deferred.promise()
}

export default function filter(obj, offset, limit = 100) {

	if (typeof offset == 'undefined') {
		return getAllFilterResults(obj)
	} else {
		return getPage(obj, offset, limit)
	}
}
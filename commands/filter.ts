import * as $ from 'jquery'
import { getData } from './internalMethods'

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

export default function filter(obj) {
	var Deferred = $.Deferred()
	var result = []
	var offset = 0
	var limit = 100

	var getPage = function () {
		var filter = encodeURIComponent(objToString(obj))
		return getData(`items?filter=${filter}&offset=${offset}&limit=${limit}`, null)
			.done(function (data: any) {
				result = result.concat(data)
				if (data.length < limit) {
					Deferred.resolve(result)
				} else {
					offset += limit
					getPage()
			}
		}).fail(function () {
			Deferred.reject()
		})
	}

	getPage()

	return Deferred.promise()
}
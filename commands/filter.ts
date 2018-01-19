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
	var result = []
	var offset = 0
	var limit = 100
	
	const accumulatePages = (obj) => {
		return getPage(obj, offset, limit)
			.then((data: any) => {
				result = result.concat(data)
				if (data.length < limit) {
					return result
				} else {
					offset += limit
					return accumulatePages(obj)
				}
			})
	}

	return accumulatePages(obj)
}

export default function filter(obj, offset, limit) {

	if (typeof offset == 'undefined') {
		return getAllFilterResults(obj)
	} else {
		return getPage(obj, offset, limit)
	}
}
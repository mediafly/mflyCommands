import { get, showUI } from './internalMethods'


function getPage(term, offset, limit) {

	var obj = {
		term,
		offset,
		limit
	}

	var qs = $.param(obj)
	return get('items?' + qs)
}

function getAllSearchResults(term) {
	var dfd1 = $.Deferred()
	var result = []

	let offset = 0
	let limit = 100

	getPage(term, offset, limit)
		.done(function(data: any) {
			result = result.concat(data)
			if (data.length < limit) {
				dfd1.resolve(result)
			} else {
				offset += limit
				getPage(term, offset, limit)
			}
		}).fail(function() {
			dfd1.reject()
		})


	return dfd1.promise()
}

export function search(term, offset, limit = 100) {

	if (typeof offset == 'undefined') {
		return getAllSearchResults(term)
	} else {
		return getPage(term, offset, limit)
	}

}

export function showSearch(x, y, width, height) {
	return showUI('search', x, y, width, height)
}
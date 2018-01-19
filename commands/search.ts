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
	var result = []

	let offset = 0
	let limit = 100

	const accumulatePages = (term) => {
		return getPage(term, offset, limit)
			.then((data: any) => {
				result = result.concat(data)
				if (data.length < limit) {
					return result
				} else {
					offset += limit
					return accumulatePages(term)
				}
			})
	}

	return accumulatePages(term)
}

export function search(term, offset, limit) {

	if (typeof offset == 'undefined') {
		return getAllSearchResults(term)
	} else {
		return getPage(term, offset, limit)
	}

}

export function showSearch(x, y, width, height) {
	return showUI('search', x, y, width, height)
}
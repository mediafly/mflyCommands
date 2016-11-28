import { get } from './internalMethods'
import { isWeb } from './device'
import { getItem } from './item'

interface embeddable {
	resourceUrl: string
}

export function embed(element, id, page) {
	getItem(id).then(i => {
		var pageArg = page ? `?page=${page}` : ''
		element.attr('src', i.resourceUrl + pageArg)
	})
}

export function embedImage(element, id, options) {
	var params = []
	if (typeof options != 'undefined') {
		params = [
			{ name: 'position', value: options.page },
			{ name: 'size', value: options.size },
			{ name: 'width', value: options.width },
			{ name: 'height', value: options.height },
			{ name: 'maxWidth', value: options.maxWidth },
			{ name: 'maxHeight', value: options.maxHeight },
			{ name: 'rotate', value: options.rotate },

		].filter(function(x) {
			return !!x.value;
		});
	}


	get('items', id).then((i : embeddable) => {
		var url = i.resourceUrl
		
		if (params.length > 0) {
			url += '?' + $.param(params)
		}

		element.attr('src', url)
	})
}

function getResource(url) {
	return $.get(url).then((data, textStatus, request) => {
		// Check for retry.
		// iOS returns 202. Due to system limitations, Android returns 200 + blank response body
		if (request.status === 202 || (request.status == 200 && !request.responseText)) {
			// Suggested delay amount is set in the Retry-After header on iOS. Default to 3 seconds if not found.
			var delayFor = parseInt(request.getResponseHeader("Retry-After")) || 3
			var deferred = $.Deferred()
			setTimeout(() => {
				getResource(url).then(data => deferred.resolve(data))
			}, delayFor * 1000)
			return deferred.promise()
		} else {
			// Content retrieved. Resolve the promise.
			return data
		}
	})
}

export function getData(id) {
	return getItem(id).then(i =>
		getResource(i.resourceUrl)
	)
}


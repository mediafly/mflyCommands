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

export function getData(id) {
	return getItem(id).then(i =>
		$.get(i.resourceUrl).then(data => data)
	)
}


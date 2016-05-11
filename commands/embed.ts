import { get } from './internalMethods'
import { isWeb } from './device'
import { getItem } from './item'

export function embed(element, id, page) {
	getItem(id).then(i => {
		var pageArg = page ? `?page=${page}` : ''
		element.src = i.resourceUrl + pageArg
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

	get('items', id).then(i => {
		// if(params.length > 0) {
		// 	params.push({name: 'src', value: i.resourceUrl})
		// 	element.src = `/images/scale?${$.param(params)}`
		// } else {
		element.src = i.resourceUrl
		// }
	})
}

export function getData(id) {
	return getItem(id).then(i =>
		$.getJSON(i.resourceUrl).then(data => data)
	)
}


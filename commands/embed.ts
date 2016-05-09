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
	var sizeParams = ''
	if (typeof options != 'undefined') {
		var params = [
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

		sizeParams = $.param(params)
	}

	get('items', id).then(i =>
		element.src = i.resourceUrl + `?${sizeParams}`
	)
}

export function getData(element, id) {
	getItem(id).then(i => {
		
	})
}


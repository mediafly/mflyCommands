import { getCurrentItem, getItem } from './item'
import { isWeb } from './device'

export function close() {
	window.location.href = '/interactive-redirect/v5/items/__self__/back'
}

export function next() {
	window.location.href = '/interactive-redirect/v5/items/__self__/next'
}

export function previous() {
	window.location.href = '/interactive-redirect/v5/items/__self__/previous'
}

export function openItem(id, bookmark) {
	getItem(id).then(item => {
		var params = {}
		var url = item.url
		if (isWeb()) {
			params['returnurl'] = window.location.href
		}
		if (bookmark) {
			params['bookmark'] = bookmark
		}
		if (url.indexOf("?") >= 0) {
			url += '&' + $.param(params)
		} else {
			url += '?' + $.param(params)
		}
		
		window.location.href = `${window.location.protocol}//${window.location.host}${url}`
	})
}

export var open = openItem

export function openFolder(id) {
	getItem(id).then(item => {
		window.location.href = item.url
	})
}

export function goto() {
	console.error('goto method is now deprecated. Please use openItem going forward.')
}

export function browse() {
	console.error('browse method is now deprecated. Please use openItem going forward.')
}

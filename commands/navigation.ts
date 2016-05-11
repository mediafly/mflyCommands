import { getCurrentItem, getItem } from './item'
import { isWeb } from './device'
import * as $ from 'jquery'

export function close() {
	window.location.href = '/interactive-redirect/items/__self__/back'
}

export function next() {
	window.location.href = '/interactive-redirect/items/__self__/next'
}

export function previous() {
	window.location.href = '/interactive-redirect/items/__self__/previous'
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
		url += '&' + $.param(params)
		
		window.location.href = `${window.location.protocol}//${window.location.host}${url}`
	})
}

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
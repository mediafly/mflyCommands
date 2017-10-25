import { getCurrentItem, getItem } from './item'
import { isWeb, isDesktop } from './device'

function preserveContext(url) {
	
	if (!isWeb() && !isDesktop()) {
		return url
	}

	if (!!sessionStorage['viewerInteractiveContext']) {
		var interactiveContext = JSON.parse(sessionStorage['viewerInteractiveContext']);

		if (interactiveContext.type === 'collection') {
			url += `?collection=${interactiveContext.id}`
		} else if (interactiveContext.type === 'search') {
			url += `?term=${interactiveContext.term}`
		} else if (interactiveContext.type === 'folder') {
			url += `?parentSlug=${interactiveContext.parentSlug}`
		} else if (interactiveContext.type === 'document') {
			url += `?slug=${interactiveContext.slug}&parentSlug=${interactiveContext.parentSlug}&page=${interactiveContext.page}`
		}
	}

	return url
}

export function close() {
	let url = preserveContext('/interactive-redirect/v5/items/__self__/back')
	window.location.href = url
}

export function next() {
	let url = preserveContext('/interactive-redirect/v5/items/__self__/next')
	window.location.href = url
}

export function previous() {
	let url = preserveContext('/interactive-redirect/v5/items/__self__/previous')
	window.location.href = url
}

export function openItem(id, bookmark) {
	getItem(id).then(item => {
		var params = {}
		var url = item.url
		if (isWeb() || isDesktop()) {
			params['returnurl'] = window.location.href
		}
		if (bookmark) {
			params['bookmark'] = bookmark
		}
		url += (url.indexOf('?') > -1 ? '&' : '?') + $.param(params)

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

import { getCurrentItem, getItem } from './item'
import { isWeb, isDesktop } from './device'

function preserveContext(url) {
	
	if ((isWeb() || isDesktop()) && !!sessionStorage['viewerInteractiveContext']) {
		var interactiveContext = JSON.parse(sessionStorage['viewerInteractiveContext']);
		if (interactiveContext.type === 'storyMapper') {
			url += `?sourceSlug=${interactiveContext.sourceSlug}`

			if (interactiveContext.sourcePage) {
				url += `&sourcePage=${interactiveContext.sourcePage}`
			}

			if (interactiveContext.sourceParentSlug) {
				url += `&sourceParentSlug=${interactiveContext.sourceParentSlug}`
			}

			if (interactiveContext.collection) {
				url += `&collection=${interactiveContext.collection}`
			}

			if (interactiveContext.sourceSearch) {
				url += `&sourceSearch=${encodeURIComponent(interactiveContext.sourceSearch)}`
			}

			if (interactiveContext.sourceCollection) {
				url += `&sourceCollection=${encodeURIComponent(interactiveContext.sourceCollection)}`
			}
		}

		if (interactiveContext.type === 'collection') {
			url += '?collection=' + interactiveContext.id
		}
		if (interactiveContext.type === 'search') {
			url += '?term=' + interactiveContext.term
		}
		if (interactiveContext.type === 'folder') {
			url += '?parentSlug=' + interactiveContext.parentSlug
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

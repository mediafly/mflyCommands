import { getItem } from './item'
import { isWeb, isDesktop } from './device'
import { post } from './internalMethods'
import { getUrlParameter, isInIframe, openUrl } from './utils'

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
		if (interactiveContext.type === 'workspace') {
			url += '?workspaceSlug=' + interactiveContext.workspaceSlug
			if (interactiveContext.workspacePageSlug) {
				url += '&workspacePageSlug=' + interactiveContext.workspacePageSlug
			}
		}
	}

	const returnUrl = getUrlParameter('returnurl')
	if (returnUrl) {
		url += `?returnurl=${getUrlParameter('returnurl')}`
	}

	return url
}

export function close() {
	let url = preserveContext('/interactive-redirect/v5/items/__self__/back')
	openUrl(url)
}

export function next() {
	let url = preserveContext('/interactive-redirect/v5/items/__self__/next')
	openUrl(url)
}

export function previous() {
	let url = preserveContext('/interactive-redirect/v5/items/__self__/previous')
	openUrl(url)
}

interface OpenItemOptions {
	bookmark?: number
	context?: 'collection' | 'folder' | 'search' | 'searchFolder'
	collection?: string
	search?: string
	parentSlug?: string
	returnurl?: string,
	params?: object
}

export function open(id, options?: number | OpenItemOptions) {
	getItem(id).then(item => {
		var params: OpenItemOptions = {}
		var url = item.url
		if (isWeb() || isDesktop()) {

			if (isInIframe()) {
				params.returnurl = window.parent.location.href
			} else {
				params.returnurl = window.location.href
			}
		}
		// Backwards compatiblity where bookmark is the second param
		if (typeof options === 'number') {
			params.bookmark = options
		} else if (typeof options === 'object') {
			const openItemOptions = options as OpenItemOptions

			if (openItemOptions.bookmark) {
				params.bookmark = options.bookmark
			}

			if (openItemOptions.context === 'collection') {
				params.collection = openItemOptions.collection
			}

			if (openItemOptions.context === 'search') {
				params.search = openItemOptions.search
			}

			if (openItemOptions.context === 'searchFolder') {
				params.parentSlug = openItemOptions.parentSlug
			}

			if (openItemOptions.params) {
				params = $.extend(params, openItemOptions.params)
			}
		}
		url += (url.indexOf('?') > -1 ? '&' : '?') + $.param(params)
		openUrl(`${window.location.protocol}//${window.location.host}${url}`)
	})
}

export var openItem = open

export function openFolder(id) {
	getItem(id).then(item => {
		openUrl(item.url)
	})
}

export function openLink(link: string) {

	if (isWeb() || isDesktop()) {
		window.open(link)
		return $.when()
	}

	return post('open-link', { link })
}

export function goto() {
	console.error('goto method is now deprecated. Please use openItem going forward.')
}

export function browse() {
	console.error('browse method is now deprecated. Please use openItem going forward.')
}

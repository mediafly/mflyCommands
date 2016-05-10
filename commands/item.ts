interface Item {
	backUrl: string,
	nextUrl: string,
	previousUrl: string,
	resourceUrl: string,
	url: string
}

import { get } from './internalMethods'

export function getItem(id) : JQueryPromise<Item> {
	return get('items', id)
}

export function getCurrentItem() : JQueryPromise<Item> {
	return getItem('__self__')
}

export function getShare(id) {
	return get('items', id + '/share')
}

export function getLastViewedContent() {
	return get('items', '?list=last-viewed')
}

export function getRecentlyCreatedContent() {
	return get('items', '?list=recently-created')
}

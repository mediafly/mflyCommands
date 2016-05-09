interface Item {
	resourceUrl: string
}

import { get } from './internalMethods'

export function getItem(id) : JQueryPromise<Item> {
	return get('items', id)
}

export function getCurrentItem() {
	return getItem('__self__')
}

export function getShare(id) {
	return get('items', id + '/share')
}

export function getLastViewed() {
	return get('items', '?list=last-viewed')
}

export function getRecentlyCreated() {
	return get('items', '?list=recently-created')
}

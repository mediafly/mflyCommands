import { getData } from './internalMethods'

export function getItem(id) {
	return getData('items', id)
}

export function getCurrentItem() {
	return getItem('__self__')
}

export function getShare(id) {
	return getData('items', id + '/share')
}

export function getLastViewed() {
	return getData('items', '?list=last-viewed')
}

export function getRecentlyCreated() {
	return getData('items', '?list=recently-created')
}

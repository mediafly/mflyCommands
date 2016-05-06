import { getData } from './internalMethods'

export function getItem(id) {
	return getData('items', id)
}

export function getCurrentItem() {
	return getItem('__self__')
}

export function shareItem(id) {
	return getData('items', id + '/share')
}

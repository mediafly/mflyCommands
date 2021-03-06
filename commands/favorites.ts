import { get, post } from './internalMethods'

export function getFavorites() {
	return get('favorites/items')
}

export function favorite(id) {
	return post(`items/${id}/favorite`)
}

export function unfavorite(id) {
	return post(`items/${id}/unfavorite`)
}

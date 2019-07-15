import { get, post } from './internalMethods'

export function getFavorites() {
	return get('favorites')
}

export function favorite(id) {
	return post(`favorite/${id}`)
}

export function unfavorite(id) {
	return post(`unfavorite/${id}`)
}

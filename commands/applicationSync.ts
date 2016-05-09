import { get, post } from './internalMethods'

export function refresh() {
	return post('sync', null)
}

export function getSyncStatus() {
	return get('sync', 'status')
}
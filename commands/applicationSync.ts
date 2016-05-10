import { get, post } from './internalMethods'

export function refresh() {
	return post('sync')
}

export function getSyncStatus() {
	return get('sync', 'status')
}
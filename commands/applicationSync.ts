import { get, post } from './internalMethods'
import { getCurrentItem } from './item'
import { isWeb } from './device'

export function refresh() {
	return post('sync', null)
}

export function getSyncStatus() {
	return get('sync', 'status')
}
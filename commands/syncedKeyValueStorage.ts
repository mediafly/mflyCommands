import { ddelete, get, post } from './internalMethods'
import { getCurrentItem } from './item'
import { isWeb } from './device'

function getValuesWithPrefix(prefix) {
	return get(`syncedinfo?prefix=${prefix}`)
}

function getAllValues() {
	return get('syncedinfo')
}

export function getSyncedValues(prefix) {
	if (typeof prefix != 'undefined') {
		// Get values with specified prefix
		return getValuesWithPrefix(prefix)
	} else {
		return getAllValues()
	}
}

export function getSyncedValue(key) {
	return get('syncedinfo', key, false)
}

export function saveSyncedValue(key, value) {
	return post(`syncedinfo`, [{ key, value }])
}

export function deleteSyncedKey(key) {
	return ddelete(`syncedinfo/${key}`)
}



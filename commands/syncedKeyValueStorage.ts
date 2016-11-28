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
	if (prefix) {
		// Get values with specified prefix
		return getValuesWithPrefix(prefix)
	} else {
		return getAllValues()
	}
}

export function getSyncedValue(key) {
	if(!key) {
		throw 'Invalid key provided'
	}
	return get('syncedinfo', key, false)
}

export function putSyncedValue(key, value) {
	if(!key) {
		throw 'Invalid key provided'
	}
	return post(`syncedinfo`, [{ key, value }])
}

export function deleteSyncedKey(key) {
	if(!key) {
		throw 'Invalid key provided'
	}
	return ddelete(`syncedinfo`, [ key ])
}



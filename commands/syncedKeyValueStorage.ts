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
		return $.Deferred().rejectWith(this, ['Invalid key provided', 500])
	}
	return get('syncedinfo', key, false)
}

export function putSyncedValue(key, value) {
	if(!key) {
		return $.Deferred().rejectWith(this, ['Invalid key provided', 500])
	}
	return post(`syncedinfo`, [{ key, value }])
}

export function putSyncedKeyValuePairs(keyValuePairs: {key: string, value: string}[]) {

	return post(`syncedinfo`, keyValuePairs)
}

export function deleteSyncedKey(key) {
	if(!key) {
		return $.Deferred().rejectWith(this, ['Invalid key provided', 500])
	}
	return ddelete(`syncedinfo`, [ key ])
}

export function deleteSyncedKeys(keys: string[]) {

	return ddelete(`syncedinfo`, keys)
}

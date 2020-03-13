import { ddelete, get, post } from './internalMethods'
import { getCurrentItem } from './item'
import { isWeb, isDesktop } from './device'

const useLocalStorage = isWeb() || isDesktop()

function getValuesWithPrefix(prefix) {
	if (useLocalStorage) {
		return $.Deferred(function(dfd) {
			var all = {}
			for (var key in localStorage) {
				// Check if key startswith prefix
				if (key.slice(0, prefix.length) == prefix) {
					all[key] = localStorage.getItem(key)
				}
			}
			dfd.resolveWith(this, [all, 200])
		})
	} else {
		return get(`info?prefix=${prefix}`)
	}
}

function getAllValues() {
	if (useLocalStorage) {
		var all = {}
		for (var key in localStorage) {
			all[key] = localStorage.getItem(key)
		}

		return $.when(all)

	} else {
		return get('info')
	}
}

export function getValues(prefix) {
	if (prefix) {
		// Get values with specified prefix
		return getValuesWithPrefix(prefix)
	} else {
		return getAllValues()
	}
}

export function getValue(key) {
	if(!key) {
		return $.Deferred().rejectWith(this, ['Invalid key provided', 500])
	}
	if (useLocalStorage) {
		return $.Deferred(function(dfd) {
			var value = localStorage.getItem(key)
			if (value) {
				dfd.resolveWith(this, [value, 200])
			} else {
				dfd.rejectWith(this, [value, 404])
			}
		})
	} else {
		return get(`info`, key, false)
	}
}

export function putValue(key , value) {
	if(!key) {
		return $.Deferred().rejectWith(this, ['Invalid key provided', 500])
	}
	if (useLocalStorage) {
		return $.Deferred(function(dfd) {
			localStorage.setItem(key, value)
			dfd.resolveWith(this, ['', 200])

		})
	} else {
		return post(`info`, [ { key, value } ])
	}
}

export function putKeyValuePairs(keyValuePairs: { key: string, value: string}[]) {

	if (useLocalStorage) {

		return $.Deferred(function(dfd) {

			$.each(keyValuePairs, (_index, pair) => {
				localStorage.setItem(pair.key, pair.value)
			})

			dfd.resolveWith(this, ['', 200])
		})
	} else {
		return post(`info`, keyValuePairs)
	}
}

export function deleteKey(key) {

	if(!key) {
		return $.Deferred().rejectWith(this, ['Invalid key provided', 500])
	}
	if (useLocalStorage) {
		return $.Deferred(function(dfd) {
			localStorage.removeItem(key)
			dfd.resolveWith(this, ['', 200])
		})
	} else {
		return ddelete(`info`, [key])
	}
}

export function deleteKeys(keys: string[]) {

	if (useLocalStorage) {
		return $.Deferred(function(dfd) {
			$.each(keys, (_index, key) => {
				localStorage.removeItem(key)
			})
			dfd.resolveWith(this, ['', 200])
		})
	} else {
		return ddelete(`info`, keys)
	}
}

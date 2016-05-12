declare var $

import { ddelete, get, post } from './internalMethods'
import { getCurrentItem } from './item'
import { isWeb } from './device'

function getValuesWithPrefix(prefix) {
	if (isWeb()) {
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
	if (isWeb()) {
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
	return $.Deferred(function(dfd) {
		if (isWeb()) {
			var value = localStorage.getItem(key)
			if (value) {
				dfd.resolveWith(this, [value, 200])
			} else {
				dfd.rejectWith(this, [value, 404])
			}
		} else {
			get('info', key, false)
		}
	})
}

export function putValue(key , value) {
	if (isWeb()) {
		return $.Deferred(function(dfd) {
			localStorage.setItem(key, value)
			dfd.resolveWith(this, ['', 200])

		})
	} else {
		return post(`info`, [ { key, value } ])
	}
}

export function deleteKey(key) {
	if (isWeb()) {
		return $.Deferred(function(dfd) {
			localStorage.removeItem(key)
			dfd.resolveWith(this, ['', 200])
		})
	} else {
		return ddelete(`info/${key}`)
	}

}



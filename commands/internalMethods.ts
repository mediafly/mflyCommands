import device = require('./device')
import { guid } from './utils'
import { encode } from './Base64'
import { isUnsupported } from './commandSupport'

declare const InteractivesInterface: any

interface InteractivesInterfaceResponse {
	data: any
	status: any
}

function InteractivesInterfaceIsDefined() {
	return typeof InteractivesInterface !== 'undefined' 
}

function IsOnWKWebView() {

	//TODO: remove hardcoded response
	// return true

	if (!window['webkit']) {
		return false
	}

	if (!window['webkit'].messageHandlers) {
		return false
	}

	return typeof window['webkit'].messageHandlers.Generic !== 'undefined'
}

// dictionary guid -> anon funcions
var callbacks = {}

function iOStoHTML(guid, data) {
	callbacks[guid](data)
	callbacks[guid] = null
}

function formUrl(func, param = null) {
	var prefix = device.getPrefix()
	return prefix + func + (param === null ? '' : '/' + param)
}

function getWKWebView(url) {

	var newGuid = guid()
	var deferred = $.Deferred()

	callbacks[newGuid] = (data, status) => {
		deferred.resolveWith(this, [data, status])
	}

	var messgeToPost = {
		guid: newGuid,
		url
	}
	window['webkit'].GenericHandler.postMessage(messgeToPost)

	return deferred.promise()
}

export function get(func, param = null, expectJson = true) {

	const url = formUrl(func, param)

	if(IsOnWKWebView()) {

		return getWKWebView(func)
	}

	if(isUnsupported(url)) {
		throw new Error('This method is not supported on this platform.')
	}

	var deferred = $.Deferred()

	$.ajax({
		url: url,
		success: function (data, textStatus, request) {
			// Content retrieved. Transform to JSON if supposed to.
			if (expectJson && request && request.getResponseHeader("Content-Type").indexOf("text/html") > -1) {
				// This was sent back as text/html JSON.parse it to a JSON object.
				data = JSON.parse(data)
			}

			// Resolve the promise.
			deferred.resolveWith(this, [data, request.status])
		},
		error: function (data, status, request) {
			// Content could not be retrieved. Reject the promise.
			if (device.isWeb() && data.status === 401) {
				// Viewer does not have an authenticated session. Take user to Viewer root.
				sessionStorage.setItem('returnUrl', window.location.href)
				window.location.replace(data.responseJSON.returnUrl)
			}

			deferred.reject(this, [request, data.status])
		}
	})

	return deferred.promise()
}

export function post(func: string, data?) {
	var deferred = $.Deferred()
	var prefix = device.getPrefix()
	var url = prefix + func

	if (isUnsupported(url)) {
		throw new Error('This method is not supported on this platform.')
	}

	if (InteractivesInterfaceIsDefined()) {
		const result : string = InteractivesInterface.post(url, JSON.stringify(data))
		const resultJSON : InteractivesInterfaceResponse = JSON.parse(result)
		if(resultJSON.status === 200 || resultJSON.status === 202) {
			deferred.resolveWith(this, [resultJSON.data, resultJSON.status])
		} else {
			deferred.rejectWith(this, [resultJSON.data, resultJSON.status])
		}
	} else {
		$.ajax({
			method: 'POST',
			url,
			data: JSON.stringify(data),
			contentType: 'application/json; charset=utf-8',
			success: function(data, textStatus, request) {
				deferred.resolveWith(this, [data, request.status])
			},
			error: function (data, status, request) {
				if (device.isWeb() && data.status === 401) {
					// Viewer does not have an authenticated session. Take user to Viewer root.
					sessionStorage.setItem('returnUrl', window.location.href)
					window.location.replace(data.responseJSON.returnUrl)
				}

				deferred.reject(this, [request, data.status])
			}
		})
	}


	return deferred.promise()
}

export function ddelete(func, data?) {
	var deferred = $.Deferred()
	var prefix = device.getPrefix()
	var url = prefix + func

	if (isUnsupported(url)) {
		throw new Error('This method is not supported on this platform.')
	}

	if (InteractivesInterfaceIsDefined()) {
		const result : string = InteractivesInterface.delete(url, JSON.stringify(data))
		const resultJSON : InteractivesInterfaceResponse = JSON.parse(result)
		if(resultJSON.status === 200 || resultJSON.status === 202) {
			deferred.resolveWith(this, [resultJSON.data, resultJSON.status])
		} else {
			deferred.rejectWith(this, [resultJSON.data, resultJSON.status])
		}
	} else {
		$.ajax({
			method: 'DELETE',
			url,
			data: JSON.stringify(data),
			contentType: 'application/json; charset=utf-8',
			success: function(data, textStatus, request) {
				deferred.resolveWith(this, [data, request.status])
			},
			error: function (data, status, request) {
				if (device.isWeb() && data.status === 401) {
					// Viewer does not have an authenticated session. Take user to Viewer root.
					sessionStorage.setItem('returnUrl', window.location.href)
					window.location.replace(data.responseJSON.returnUrl)
				}

				deferred.reject(this, [request, data.status])
			}
		})
	}


	return deferred.promise()
}

export function put(func, data = null) {
	var deferred = $.Deferred()
	var prefix = device.getPrefix()
	var url = prefix + func

	if (isUnsupported(url)) {
		throw new Error('This method is not supported on this platform.')
	}

	if (InteractivesInterfaceIsDefined()) {
		const result : string = InteractivesInterface.put(url, JSON.stringify(data))
		const resultJSON : InteractivesInterfaceResponse = JSON.parse(result)

		if(resultJSON.status === 200 || resultJSON.status === 202) {
			deferred.resolveWith(this, [resultJSON.data, resultJSON.status])
		} else {
			deferred.rejectWith(this, [resultJSON.data, resultJSON.status])
		}
	} else {
		$.ajax({
			method: 'PUT',
			data,
			url,
			success: function(data, textStatus, request) {
				deferred.resolveWith(this, [data, request.status])
			},
			error: function(data, status, request) {
				if (device.isWeb() && data.status === 401) {
					// Viewer does not have an authenticated session. Take user to Viewer root.
					sessionStorage.setItem('returnUrl', window.location.href)
					window.location.replace(data.responseJSON.returnUrl)
				}

				deferred.reject(this, [request, data.status])
			}
		})
	}

	return deferred.promise()
}

export function showUI(name, x, y, width, height) {
	return post('control/show-ui', {
		ui: name,
		position: {
			x,
			y,
			width,
			height
		}
	})
}


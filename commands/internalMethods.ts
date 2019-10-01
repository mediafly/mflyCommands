import device = require('./device')
import { guid } from './utils'
import { encode } from './Base64'
import { isUnsupported } from './commandSupport'
import {
	callAsync,
	getDefined,
	InteractivesInterfaceIsDefined,
	InteractivesInterfaceResponse
} from './async'

declare const InteractivesInterface: any
export function get(func, param = null, expectJson = true) {
	var prefix = device.getPrefix()
	var url = prefix + func + (param === null ? '' : '/' + param)

	if(isUnsupported(url)) {
		throw new Error('This method is not supported on this platform.')
	}

	var deferred = $.Deferred()

	if (InteractivesInterfaceIsDefined() && getDefined()) {
		callAsync('GET', url)
			.then((result: any) => {

				const resultJSON : InteractivesInterfaceResponse = JSON.parse(result)
				if(resultJSON.status < 300) {
					deferred.resolveWith(this, [resultJSON.data, resultJSON.status])
				} else {
					deferred.rejectWith(this, [resultJSON.data, resultJSON.status])
				}
			})
	} else {
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
	}

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
		callAsync('POST', url, data)
			.then((result: any) => {

				const resultJSON : InteractivesInterfaceResponse = JSON.parse(result)
				if(resultJSON.status < 300) {
					deferred.resolveWith(this, [resultJSON.data, resultJSON.status])
				} else {
					deferred.rejectWith(this, [resultJSON.data, resultJSON.status])
				}
			})
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
		
		callAsync('DELETE', url, data)
			.then((result: any) => {
				const resultJSON : InteractivesInterfaceResponse = JSON.parse(result)
				if(resultJSON.status < 300) {
					deferred.resolveWith(this, [resultJSON.data, resultJSON.status])
				} else {
					deferred.rejectWith(this, [resultJSON.data, resultJSON.status])
				}
			})
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
		callAsync('PUT', url, data)
			.then((result: any) => {
				const resultJSON : InteractivesInterfaceResponse = JSON.parse(result)
				if(resultJSON.status < 300) {
					deferred.resolveWith(this, [resultJSON.data, resultJSON.status])
				} else {
					deferred.rejectWith(this, [resultJSON.data, resultJSON.status])
				}
			})
	} else {
		$.ajax({
			method: 'PUT',
			data: JSON.stringify(data),
			contentType: 'application/json; charset=utf-8',
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


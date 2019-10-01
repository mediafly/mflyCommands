import { guid } from './utils'

declare const InteractivesInterface: any

export interface InteractivesInterfaceResponse {
	data: any
	status: any
}

// dictionary guid -> anon funcions
var callbacks = {}

export function asyncCallback(guid, data) {
	callbacks[guid](data)
	callbacks[guid] = null
}

export function getDefined() {
	
	return InteractivesInterface.getDefined && InteractivesInterface.getDefined()
}

export function callAsync(verb, url, data = null) {

	var newGuid = guid()
	var deferred = $.Deferred()

	callbacks[newGuid] = (result: string) => {
		deferred.resolve(result)
	}

	InteractivesInterface.handleAsync(newGuid, url, verb, JSON.stringify(data))

	return deferred.promise()
}

export function InteractivesInterfaceIsDefined() {
	return typeof InteractivesInterface !== 'undefined'
}
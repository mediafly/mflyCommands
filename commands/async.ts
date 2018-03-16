import { guid } from './utils'

declare const InteractivesInterface: any

export interface AsyncCallbackResponse {
    data: any
    status: any
}

// dictionary guid -> anon funcions
var callbacks = {}

export function asyncCallback(guid, data) {
    callbacks[guid](data)
    callbacks[guid] = null
}

export function callAsync(verb, url, data = null) {

    var newGuid = guid()
    var deferred = $.Deferred()

    callbacks[newGuid] = (result: string) => {
        deferred.resolve(result)
    }

    if (checkiOS() == true) {
        var message = {'guid': newGuid, 'url': url, 'verb': verb, 'data': data}
        window['webkit'].messageHandlers.HTMLtoiOS.postMessage(message);
    } else { // Android
        InteractivesInterface.handleAsync(newGuid, url, verb, JSON.stringify(data))
    }

    return deferred.promise()
}

export function ShouldInterfaceViaAsyncCallbacks(verb) {
    return checkAndroid(verb) || checkiOS()
}

function checkAndroid(verb) {
    return typeof InteractivesInterface !== 'undefined' && verb != 'GET'
}

function checkiOS() {
    var webkit = window['webkit']
    if (typeof webkit !== 'undefined' && typeof webkit.messageHandlers !== 'undefined') {
        return true
    } else {
        return false
    }
}
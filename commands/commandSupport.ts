import { isWeb } from './device'

export function isUnsupported(url : String) {
    if (!isWeb()) {
        return false
    }

    var unsupportedStatements = [
        '/control/',
        '/downloads',
        '/online-status',
        '/system/gps'
    ]

    return unsupportedStatements.some(statement => url.indexOf(statement) > -1)
}
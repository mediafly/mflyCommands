import { isWeb } from './device'

export function isUnsupported(url : String) {
    if (!isWeb()) {
        return false
    }

    var unsupportedStatements = [
        '/control/',
        '/downloads',
        '/online-status',
        '/system/gps',
        // '/interactive-api/v5/sync',
    ]

    return unsupportedStatements.some(statement => url.indexOf(statement) > -1)
}
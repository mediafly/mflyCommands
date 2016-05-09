import { isWeb } from './device'

export function isUnsupported(url : String) {
    if (!isWeb()) {
        return false
    }

    var unsupportedStatements = [
        '/interactive-api/v5/control',
        '/interactive-api/v5/downloads',
        '/interactive-api/v5/sync',
    ]

    return unsupportedStatements.some(statement => url.indexOf(statement) > -1)
}
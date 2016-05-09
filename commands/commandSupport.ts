import { isWeb } from './device'

export function isUnsupported(url : String) {
    if (!isWeb()) {
        return false
    }

    var unsupportedStatements = [
        '/interactive-api/v5/control/show-ui',
        '/interactive-api/v5/downloads'
    ]

    return unsupportedStatements.some(statement => url.indexOf(statement) > -1)
}
import { isWeb } from './device'

export function isUnsupported(url) {
    if (!isWeb()) {
        return false
    }

    var unsupportedStatements = [
        '/interactive-api/v5/control/show-ui'
    ]

    return unsupportedStatements.some(statement => url === statement)
}
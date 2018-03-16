import { get } from './internalMethods'
import { getCurrentItem } from './item'
import { isWeb } from './device'

export function getUserInfo() {
    return get('account')
}

export function logout() {
    if (ShouldInterfaceViaAsyncCallbacks('GET')) {
        // TODO handle async
    } else {
        window.location.href = '/interactive-redirect/v5/account/logout'
    }
}
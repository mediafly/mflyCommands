import { get } from './internalMethods'

export function getUserInfo() {
	return get('account')
}

export function logout() {
	window.location.href = '/interactive-redirect/v5/account/logout'
}
import { get, post, showUI } from './internalMethods'

export function showSettings(x, y, width, height) {
	return showUI('app-settings', x, y, width, height)
}

export function showUserManagement(x, y, width, height) {
	return showUI('user-management', x, y, width, height)
}

export function showSecondScreenOptions() {
	return post('control/show-ui', { ui: 'second-screen'})
}

export function email(id) {
	return post('control/email', { id })
}

export function composeEmail(options) {
	return post('control/email', options)
}

export function showAnnotations() {
	return post('control/show-ui', { ui: 'annotations' })
}

export function takeAndEmailScreenshot() {
	return post('control/email-screenshot')
}
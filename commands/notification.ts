import { ddelete, get, post } from './internalMethods'

export function addNotification(id) {
	return post(`notifications/${id}`, null)
}

export function removeNotification(id) {
	return ddelete(`notifications/${id}`)
}

export function getNotificationStatus(id) {
	return get(`notifications/${id}`)
}

export function showNotificationManager(x, y, width, height) {
	return post('control/show-ui', {
		ui: 'notifications',
		position: {
			x,
			y,
			width,
			height
		}
	})
}
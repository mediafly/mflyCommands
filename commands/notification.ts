import { ddelete, get, post, showUI } from './internalMethods'

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
	return showUI('notifications', x, y, width, height)
}
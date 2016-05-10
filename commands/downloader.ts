import { ddelete, get, post, showUI } from './internalMethods'

export function showDownloader(x, y, width, height) {
	return showUI('downloads', x, y, width, height)
}

export function getDownloadStatus(id) {
	return id ? get(`downloads/${id}/status`) : get('downloads/status')
}

export function addToDownloader(id) {
	return post('downloads/status', { ids: [ id ] })
}

export function removeFromDownloader(id) {
	return ddelete(`downloads/${id}`)
}
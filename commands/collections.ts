import { ddelete, get, post, put, showUI } from './internalMethods'

export function getCollections() {
	return get('collections')
}

export function getCollection(id) {
	return get(`collections/${id}`, 'items')
}

export function createCollection(name) {
	return post('collections', { name })
}

export function addItemToCollection(collectionId, itemId) {
	return post(`collections/${collectionId}/items`, { ids: [ itemId ] })
}

export function removeItemFromCollection(collectionId, itemId) {
	return ddelete(`collections/${collectionId}/items/${itemId}`)
}

export function deleteCollection(id, shared = false) {
	return ddelete(`collections/${id}?shared=${shared}`)
}

export function reorderItemInCollection(collectionId, itemId, position) {
	return put(`collections/${collectionId}/items/${itemId}/order?position=${position}`)
}

export function renameCollection(id, name) {
	return put(`collections/${id}`, { name })
}

// UI Methods

export function showCollections(x, y, width, height) {
	return showUI('collections', x, y, width, height)
}

export function showAddToCollection(x, y, width, height) {
	return showUI('add-to-collection', x, y, width, height)
}

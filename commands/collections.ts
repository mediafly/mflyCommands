import { ddelete, get, post, put } from './internalMethods'

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

export function deleteCollection(id) {
	return ddelete(`collections/${id}`)
}

export function reorderItemInCollection(collectionId, itemId, position) {
	return put(`collections/${collectionId}/items/${itemId}/reorder?position=${position}`)
}

export function renameCollection(id, name) {
	return put(`collections/${id}`, { name })
}

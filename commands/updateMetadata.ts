import { put } from './internalMethods'

//This endpoint should be deprecated and removed in favor of updateItemMetadata
export function updateMetadata(id, metadata) {
	return put(`items/${id}/metadata`, metadata)
}

export function updateItemMetadata(id, metadata) {
	return put(`items/${id}/item-metadata`, { metadataJson: metadata })
}

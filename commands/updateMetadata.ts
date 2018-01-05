import { put } from './internalMethods'

//This endpoint is only implemented in Viewer and should be deprecated
//in favor of updateItemMetadata
export function updateMetadata(id, metadata) {
	return put(`items/${id}/metadata`, metadata)
}

export function updateItemMetadata(id, metadata) {
	return put(`items/${id}/item-metadata`, { metadataJson: metadata })
}

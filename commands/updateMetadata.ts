import { put } from './internalMethods'

export default function updateMetadata(id, metadata) {
	return put(`items/${id}/item-metadata`, { metadataJson: metadata })
}

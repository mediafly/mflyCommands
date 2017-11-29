import { post } from './internalMethods'

export default function updateMetadata(id, metadata) {
	return post(`items/updatemetadata`, { id, metadata })
}

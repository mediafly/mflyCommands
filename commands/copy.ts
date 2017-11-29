import { post } from './internalMethods'

export default function copy(parentId, slug, name, metadata) {
	return post(`items/copy`, { parentId, slug, name, metadata })
}

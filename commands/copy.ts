import { post } from './internalMethods'

export default function copy(parentId, slug) {
	return post(`items/copy`, { parentId, slug })
}

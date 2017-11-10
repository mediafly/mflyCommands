import { post } from './internalMethods'

export default function copy(parentId, slugs) {
	return post(`copy?parentId=${parentId}`, slugs)
}

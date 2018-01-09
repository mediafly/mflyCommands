import { post } from './internalMethods'
import { updateItemMetadata } from './updateMetadata'

export default function copy(parentId, slug, name) {
	const action = post(`items/copy`, { parentId, slug, name })
	
	if (name) {
		action = action.then((newItem) => updateItemMetadata(newItem.slug, {"title" : name}))
	}

	return action
}

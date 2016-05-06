import { get } from './internalMethods'

export default function getFolder(id) {
	return get('items', `${id}/items`)
}

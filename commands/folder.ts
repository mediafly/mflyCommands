import { getData } from './internalMethods'

export default function getFolder(id) {
	return getData('items', `${id}/items`)
}

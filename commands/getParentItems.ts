import { getCollection } from './collections'
import { search } from './search'
import getInteractiveInfo from './interactiveInfo'
import getFolder from './folder'


export default function getParentItems(offset = 0, limit = 100) {
	return getInteractiveInfo()
		.then(info => {

			if (info.invokedFrom === 'folder') {
				return getFolder(info.invokedFromId)
			}

			if (info.invokedFrom === 'collection') {
				return getCollection(info.invokedFromId)
			}

			if (info.invokedFrom === 'search') {
				return search(info.invokedFromTerm, offset, limit)
			}

			return getFolder(info.parentId)
		})
}


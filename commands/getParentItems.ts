import { getCollection } from './collections'
import getInteractiveInfo from './interactiveInfo'
import getFolder from './folder'


export default function getParentItems() {
	return getInteractiveInfo()
		.then(info => {

			if (info.invokedFrom === 'folder') {
				return getFolder(info.invokedFromId)
			}

			if (info.invokedFrom === 'collection') {
				return getCollection(info.invokedFromId)
			}

			return getFolder(info.parentId)
		})
}


import {getDeviceType, deviceTypes} from './device'
import { get } from './internalMethods'

export default function getInteractiveInfo () {

	let interactiveContext 
	
	try {
		interactiveContext = JSON.parse(sessionStorage['viewerInteractiveContext'])
	} catch (err) { }

	return get('interactive')
		.then(info => {
			if (!!interactiveContext) {

				switch (interactiveContext.type) {
					case 'collection':
						info.invokedFrom = 'collection'
						info.invokedFromId = interactiveContext.id
						break

					case 'folder':
						info.invokedFrom = 'folder'
						info.invokedFromId = interactiveContext.parentSlug
						break

					case 'search':
						info.invokedFrom = 'search'
						info.invokedFromTerm = interactiveContext.term
						break

					case 'search':
						info.invokedFrom = 'search'
						info.invokedFromTerm = interactiveContext.term
						break

					case 'workspace':
						info.invokedFrom = 'workspace'
						info.invokedFromId = interactiveContext.workspaceSlug
						info.invokedFromPageId = interactiveContext.workspacePageSlug
						break
				
					default:
						break
				}
			}

			return info
		})
}
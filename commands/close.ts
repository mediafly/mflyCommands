import { getCurrentItem } from './item'
import { isWeb } from './device'

export default function close() {
	
	getCurrentItem().then(function (data) {
		var url = data.backUrl
		
		if (isWeb() && !!sessionStorage['viewerInteractiveContext']) {
			var interactiveContext = JSON.parse(sessionStorage['viewerInteractiveContext'])
			if (interactiveContext.type === 'collection') {
				url += '?collection=' + interactiveContext.id
			}
			if (interactiveContext.type === 'search') {
				url += '?term=' + interactiveContext.term
			}
		}

		window.location.href = url
	})
}
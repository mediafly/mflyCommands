import { post } from './internalMethods'

export function postAction(options) {
	return post('actions', options)
}

export function postPageView(id, page) {
	return post('actions', {
		type: 'document',
		id,
		page
	})
}
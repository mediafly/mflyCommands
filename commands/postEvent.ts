import { post } from './internalMethods'

export function postEvent(key, properties) {
	return post('events', properties)
}

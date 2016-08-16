import { post } from './internalMethods'

export function postEvent(key, value) {
	return post(`events`, {key, value: JSON.stringify(value)})
}

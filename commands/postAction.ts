import { post } from './internalMethods'

export default function postAction(options) {
	return post('actions', options)
}
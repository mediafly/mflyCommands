import { post } from './internalMethods'

export default function sendEmail(options) {
	return post('email', options)
}

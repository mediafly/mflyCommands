import { get, post } from './internalMethods'

export function sendEmail(options) {
	return post('email', options)
}

export function getEmailStatus(id: number) {
	return get('email-status', id)	
}
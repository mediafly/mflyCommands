import { get } from './internalMethods'

export default function getOnlineStatus(argument) {
	return get('system', 'online-status')
}

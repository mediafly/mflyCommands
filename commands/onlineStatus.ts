import { getData } from './internalMethods'

export default function getOnlineStatus(argument) {
	return getData('online-status', null)	
}

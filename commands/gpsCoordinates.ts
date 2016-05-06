import { getData } from './internalMethods'

export default function getGpsCoordinates () {
	return getData('system', 'gps')
}
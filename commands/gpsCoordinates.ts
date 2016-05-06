import { getData } from './internalMethods'

export default function gpsCoordinates () {
	return getData('system', 'gps')
}
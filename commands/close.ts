import { getCurrentItem } from './item'
import { isWeb } from './device'

export default function close() {
	window.location.href = '/interactive-redirect/items/__self__/back'
}
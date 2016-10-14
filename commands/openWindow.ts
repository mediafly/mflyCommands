import { guid } from './utils'

export default function openWindow(url: string) {
	return window.open(url, `InteractivesWindow${guid()}`)
}
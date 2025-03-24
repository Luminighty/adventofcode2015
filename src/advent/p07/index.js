import { read_input } from "../utils.js";

export const title = "Day 7: Internet Protocol Version 7";

export function get_input() {
	return read_input("inp/07.txt").split("\n");
}

function isAbbaSlice(str, offset) {
	return str[offset - 3] == str[offset] && str[offset - 2] == str[offset - 1] && str[offset] != str[offset - 1]
}

/**
 * @param {string} ipV7 
 * @param {number} offset 
 */
function consumeSquareBracket(ipV7, offset) {
	let end = offset
	while(end < ipV7.length && ipV7.charAt(end) != ']')
		end++

	const inner = ipV7.slice(offset, end)
	
	let ABBA = false
	for (let i = 3; i < inner.length; i++) {
		if (isAbbaSlice(inner, i)) {
			ABBA = true
			break;
		}
	}

	return {end, ABBA}
}

/** @param {string} ipV7 */
function supportsTLS(ipV7) {
	let ABBA = false
	for (let i = 3; i < ipV7.length; i++) {
		if (!ABBA && isAbbaSlice(ipV7, i))
			ABBA = true
		if (ipV7.charAt(i) == '[') {
			const res = consumeSquareBracket(ipV7, i + 1)
			if (res.ABBA)
				return false
			i = res.end + 3
		}
	}
	return ABBA
}

export function solve_a() {
	const input = get_input();

	let count = 0
	for (const line of input) {
		if (supportsTLS(line)) {
			count++
		}
	}

	console.log({count});
}

function isABA(ipV7, offset) {
	return ipV7[offset] == ipV7[offset - 2] && ipV7[offset] != ipV7[offset - 1]
}

function groupBySequences(ipV7) {
	const supernet = []
	const hypernet = []
	let start = 0
	for (let i = 0; i < ipV7.length; i++) {
		if (ipV7[i] == '[') {
			supernet.push(ipV7.slice(start, i))
			start = i + 1
		}
		if (ipV7[i] == ']') {
			hypernet.push(ipV7.slice(start, i))
			start = i + 1
		}
	}
	supernet.push(ipV7.slice(start))
	return {supernet, hypernet}
}

function hasBAB(hypernets, a, b) {
	for (const hypernet of hypernets)
		if (hypernet.includes(`${b}${a}${b}`))
			return true
	return false
}

/** 
 * @param {string[]} supernet
 * @param {string[]} hypernet
 */
function supportsSSL(supernet, hypernet) {
	for (const chunk of supernet) {
		for (let i = 2; i < chunk.length; i++) {
			if (!isABA(chunk, i))
				continue
			const a = chunk[i]
			const b = chunk[i - 1]
			if (hasBAB(hypernet, a, b))
				return true
		}
	}
	return false
}

export function solve_b() {
	const input = get_input();

	let c = 0
	for (const line of input) {
		const {supernet, hypernet} = groupBySequences(line)
		if (supportsSSL(supernet, hypernet)) {
			c++
		}
	}
	console.log({count: c});
}

import { read_input } from "../utils.js";

export const title = "Day 4: Security Through Obscurity";

export function get_input() {
	return read_input("inp/04.txt").split("\n")
		.map((line) => line.split("["))
		.map(([code, checksum]) => [code.split('-'), checksum.replace(']', '')])
}

function getSector(code) {
	return parseInt(code[code.length - 1])
}

function calcChecksum(code) {
	const chars = {}
	for (const part of code.slice(0, code.length - 1))
		for (const char of Array.from(part))
				chars[char] = (chars[char] ?? 0) + 1
	return Object.entries(chars).sort(([leftChar, leftCount], [rightChar, rightCount]) => {
		if (leftCount != rightCount)
			return rightCount - leftCount
		return leftChar.charCodeAt(0) - rightChar.charCodeAt(0)
	}).map(([char]) => char).join('')
}

export function solve_a() {
	const input = get_input();

	let sum = 0
	for (const [code, checksum] of input) {
		let sector = getSector(code)
		let check = calcChecksum(code)
		if (check.slice(0, checksum.length) == checksum) {
			sum += sector
		}
	}
	console.log({sum});
}

function decrypt(code, sector) {
	sector %= 26
	const result = []
	for (const part of code.slice(0, code.length - 1)) {
		const r = Array.from(part)
			.map((c) => c.charCodeAt(0) - 'a'.charCodeAt(0))
			.map((c) => (c + sector) % 26)
			.map((n) => String.fromCharCode(n + 'a'.charCodeAt(0)))
			.join('')
		result.push(r)
	}
	return result.join(' ')
}

export function solve_b() {
	const input = get_input();

	const rooms = []
	for (const [code, checksum] of input) {
		let sector = getSector(code)
		let check = calcChecksum(code)
		if (check.slice(0, checksum.length) != checksum)
			continue
		rooms.push({sector, name: decrypt(code, sector)})
	}
	for (const room of rooms)
		if (room.name.includes("northpole"))
			console.log(room);
}

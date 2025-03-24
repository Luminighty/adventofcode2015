import { read_input } from "../utils.js";

export const title = "Day 2: Bathroom Security";

export function get_input() {
	return read_input("inp/02.txt")
		.split("\n")
		.map((line) => Array.from(line))
}

export function solve_a() {
	const input = get_input();
	const delta = {
		'U': -3, 'D': 3,
		'R': 1, 'L': -1
	}
	const edges = {
		'U': [1, 2, 3],
		'D': [7, 8, 9],
		'L': [1, 4, 7],
		'R': [3, 6, 9],
	}

	let position = 5
	let res = 0
	for (const line of input) {
		for (const step of line) {
			if (edges[step].includes(position))
				continue
			position += delta[step]
		}
		res = res * 10 + position
	}

	console.log(res);
}

export function solve_b() {
	const input = get_input();
	const keypad = [
		[null, null, 1, null, null],
		[null,   2,  3,   4,  null],
		[  5 ,   6,  7,   8,   9],
		[null, 'A', 'B',  'C',  null],
		[null, null, 'D', null, null],
	]
	let res = ""
	let x = 2
	let y = 2
	for (const line of input) {
		for (const s of line) {
			let newX = (s == 'L') ? x-1 : ((s == 'R') ? x+1 : x)
			let newY = (s == 'U') ? y-1 : ((s == 'D') ? y+1 : y)
			if (!keypad[newY]?.[newX])
				continue
			x = newX; y = newY;
		}
		res = `${res}${keypad[y][x]}`
	}

	console.log(res);
}

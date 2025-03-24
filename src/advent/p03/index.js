import { read_input } from "../utils.js";

export const title = "Day 3: Squares With Three Sides";

export function get_input() {
	return read_input("inp/03.txt").split("\n")
		.map((line) => line.trim().split(" ").filter(Boolean).map((num) => parseInt(num)));
}

function isValidTriangle(a, b, c) {
	if (a >= b + c)
		return false
	if (b >= a + c)
		return false
	if (c >= b + a)
		return false
	return true
}

export function solve_a() {
	const input = get_input();

	let c = 0
	for (const triangle of input) {
		if (triangle.length !== 3)
			console.log(triangle);
			
		if (isValidTriangle(...triangle))
			c++
	}
	console.log(c);
}

export function solve_b() {
	const input = get_input();

	let count = 0
	for (let i = 0; i < input.length; i += 3) {
		let a = input[i]	
		let b = input[i + 1]
		let c = input[i + 2]
		for (let j = 0; j < 3; j++) {
			if (isValidTriangle(a[j], b[j], c[j]))
				count++
		}
	}
	console.log(count);
}

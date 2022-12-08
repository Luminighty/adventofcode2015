import { read_input } from "../utils";

export const title = "Day 2: I Was Told There Would Be No Math";


/** @returns {[number, number, number][]} */
export function get_input() {
	const input = read_input("inp/02.txt");
	return input
		.split("\n")
		.map((line) => line
			.split("x")
			.map((num) => parseInt(num))
		);
}

export function solve_a() {
	const input = get_input();

	let sum = 0;
	for (const [l, w, h] of input) {
		let a = l*w;
		let b = w*h;
		let c = h*l;
		sum += 2*a+ 2*b + 2*c + Math.min(a, b, c);
	}
	console.log(sum);
}

export function solve_b() {
	const input = get_input();
	
	let sum = 0;
	for (const [l, w, h] of input) {
		let sides = [l, w, h];
		let a = Math.min(...sides);
		sides.splice(sides.indexOf(a), 1);
		let b = Math.min(...sides);
		sum += 2*a + 2*b + l*w*h;
	}
	console.log(sum);
}

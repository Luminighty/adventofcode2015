import { read_input } from "../utils";

export const title = "Day 1: Not Quite Lisp";

export function solve_a() {
	const input = read_input("inp/01.txt");
	const chars = [...input];
	console.log( chars.filter((c) => c == '(').length - chars.filter((c) => c == ')').length );
}

export function solve_b() {
	const input = read_input("inp/01.txt");
	const chars = [...input];
	let floor = 0;
	for (let i = 0; i < chars.length; i++) {
		const c = chars[i];
		floor += c == "(" ? 1 : -1;
		if (floor < 0) {
			console.log(i+1);
			return;
		}
	}
}

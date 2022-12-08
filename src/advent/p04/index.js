import md5 from "md5";
import { read_input } from "../utils";

export const title = "Day 4: The Ideal Stocking Stuffer";

/** @returns {string} */
export function get_input() {
	return read_input("inp/04.txt");
}

function find(start) {
	const input = get_input();
	let i = 1;
	while(true) {
		let msg = `${input}${i}`;
		const hexa = md5(msg);
		//console.log({i, hexa});
		if (hexa.startsWith(start)) {
			console.log(i);
			return;
		}
		i++;
	}
}

export function solve_a() {
	find("00000");
}

export function solve_b() {
	find("000000");
}

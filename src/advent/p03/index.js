import { read_input } from "../utils";

export const title = "Day 3: Perfectly Spherical Houses in a Vacuum";

const Dir = {
	">": [1, 0],
	"^": [0, -1],
	"v": [0, 1],
	"<": [-1, 0],
};

/** @returns {[number, number][]} */
export function get_input() {
	const input = read_input("inp/03.txt");
	return [...input].map((char) => Dir[char]);
}

export function solve_a() {
	const input = get_input();
	
	const pos = {};
	const current = {x: 0, y: 0};
	pos["0,0"] = 1;
	for (const [x, y] of input) {
		current.x += x;
		current.y += y;
		pos[`${current.x},${current.y}`] = 1;
	}
	console.log(Object.keys(pos).length);
}

export function solve_b() {
	const input = get_input();
	
	const pos = {};
	const current = [{x: 0, y: 0}, {x: 0, y: 0}];
	let turn = 0;
	pos["0,0"] = 1;
	for (const [x, y] of input) {
		let c = current[turn % 2];
		c.x += x;
		c.y += y;
		pos[`${c.x},${c.y}`] = 1;
		turn++;
	}
	console.log(Object.keys(pos).length);
}

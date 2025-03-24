import { read_input } from "../utils.js";

export const title = "Day 1: No Time for a Taxicab";

/** @returns {[string, number][]} */
export function get_input() {
	return read_input("inp/01.txt")
		.split(",")
		.map((dir) => dir.trim())
		.map((dir) => [dir.charAt(0), parseInt(dir.slice(1).trim())])
}

function turn(facing, direction) {
	if (direction == "R")
		return {
			"N": "E",
			"E": "S",
			"S": "W",
			"W": "N",
		}[facing]
	return {
		"N": "W",
		"W": "S",
		"S": "E",
		"E": "N",
	}[facing]
}

export function solve_a() {
	const input = get_input();
	const steps = {N: 0, S: 0, W: 0, E: 0}
	let facing = "N"
	
	for (const [dir, step] of input) {
		facing = turn(facing, dir)
		steps[facing] += step
	}

	console.log(steps);
	const y = Math.abs(steps.N - steps.S)
	const x = Math.abs(steps.W - steps.E)
	console.log(`Steps: ${x + y}`);
}

function visit(locations, x, y) {
	const key = `${x}:${y}`
	if (locations[key]) {
		locations[key]++
		return {x, y}
	} else {
		locations[key] = 1
	}
}

function step_towards(position, facing) {
	if (facing == "N")
		position.y++
	if (facing == "S")
		position.y--
	if (facing == "E")
		position.x++
	if (facing == "W")
		position.x--
}

export function solve_b() {
	const input = get_input();
	const locations = {"0:0": 1}

	let facing = "N"	
	let position = {x: 0, y: 0}
	for (const [dir, step] of input) {
		facing = turn(facing, dir)
		for (let s = 0; s < step; s++) {
			step_towards(position, facing)
			if (visit(locations, position.x, position.y)) {
				console.log(position);
				console.log(`Steps: ${Math.abs(position.x) + Math.abs(position.y)}`);
				return
			}
		}
	}

}

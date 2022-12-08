import { read_input } from "../utils";

export const title = "Day 6: Probably a Fire Hazard";

/** @returns {[number, number]} */
function parse_coord(str) {
	return str.split(",").map((num) => parseInt(num));
}

/** @returns {{instr: "ON" | "TOGGLE" | "OFF", from: [number, number], to: [number, number]}} */
export function get_input() {
	return read_input("inp/06.txt")
		.split("\n")
		.map((line) => {
			const words = line.split(" ");
			let from = parse_coord(words[words.length - 3]);
			let to = parse_coord(words[words.length - 1]);

			let instr = line.startsWith("turn on") ? "ON" :
									line.startsWith("toggle") ? "TOGGLE" : "OFF";
			return {
				instr,
				from, to,
			}
		});
}

function get_lights(value) {
	return Array(1000).fill(0).map(() => Array(1000).fill(0).map(() => value));
}

export function solve_a() {
	const input = get_input();
	const lights = get_lights(false);

	for (const {instr, from, to} of input) {
		for (let x = from[0]; x <= to[0]; x++) {
			for (let y = from[1]; y <= to[1]; y++) {
				switch (instr) {
					case "ON":
						lights[y][x] = true;
						break;
					case "OFF":
						lights[y][x] = false;
						break;
					case "TOGGLE":
						lights[y][x] = !lights[y][x];
						break;
					default:
						break;
				}
			}
		}
	}

	const count = lights.reduce((acc, row) => acc + row.filter((val) => val).length, 0);

	console.log(count);
}

export function solve_b() {
	const input = get_input();
	const lights = get_lights(0);

	for (const {instr, from, to} of input) {
		for (let x = from[0]; x <= to[0]; x++) {
			for (let y = from[1]; y <= to[1]; y++) {
				switch (instr) {
					case "ON":
						lights[y][x]++;
						break;
					case "OFF":
						if (lights[y][x] > 0)
							lights[y][x]--;
						break;
					case "TOGGLE":
						lights[y][x] += 2;
						break;
					default:
						break;
				}
			}
		}
	}

	const bright = lights.reduce((acc, row) => acc + row.reduce((val, acc) => val + acc, 0), 0);

	console.log(bright);
}
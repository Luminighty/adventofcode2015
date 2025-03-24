import { read_input } from "../utils.js";

export const title = "Day 6: Signals and Noise";

export function get_input() {
	return read_input("inp/06.txt").split("\n");
}

function getFrequency(input) {
	const frequency = []

	for (const line of input) {
		for (let i = 0; i < line.length; i++) {
			if (!frequency[i])
				frequency[i] = {}
			const c = line.charAt(i)
			frequency[i][c] = (frequency[i][c] ?? 0) + 1
		}
	}
	return frequency
}

export function solve_a() {
	const input = get_input();
	const frequency = getFrequency(input)
	
	const message = frequency.map(
		(freq) => Object.entries(freq)
			.sort(([lchar, lcount], [rchar, rcount]) => rcount - lcount)
			.map(([char, count]) => char)[0]
		).join('')

	console.log(message);
}

export function solve_b() {
	const input = get_input();
	const frequency = getFrequency(input)
	
	const message = frequency.map(
		(freq) => Object.entries(freq)
			.sort(([lchar, lcount], [rchar, rcount]) => lcount - rcount)
			.map(([char, count]) => char)[0]
		).join('')
		
	console.log(message);
}

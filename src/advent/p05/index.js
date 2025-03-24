import md5 from "md5";
import { read_input } from "../utils.js";

export const title = "Day 5: How About a Nice Game of Chess?";

export function get_input() {
	return "uqwqemis"
}

const USE_CACHE = true
export function solve_a() {
	if (USE_CACHE)
		return console.log({password: "1a3099aa"})

	let id = get_input();
	let num = 0
	let password = ""
	while (password.length < 8) {
		const hash = md5(`${id}${num}`)
		if (hash.slice(0, 5) == "00000") {
			password += hash.slice(5, 6)
			console.log(`Found new part: ${password}`);
		}
		num++
	}
	console.log({password})
}

export function solve_b() {
	if (USE_CACHE)
		return console.log({password: "694190cd"})
	let id = get_input();

	let piecesFound = 0
	let num = 0
	let password = Array(8).fill("_")
	const validPositions = ['0', '1', '2', '3', '4', '5', '6', '7']
	while (piecesFound < 8) {
		num++
		const hash = md5(`${id}${num}`)
		if (hash.slice(0, 5) != "00000")
			continue
		const p = hash.charAt(5)
		const c = hash.charAt(6)
		if (!validPositions.includes(p))
			continue
		validPositions.splice(validPositions.findIndex((c) => c == p), 1)
		piecesFound++
		password[parseInt(p)] = c
		console.log(`Found new part: ${password.join('')}`);
	}
	console.log({password: password.join('')})
}

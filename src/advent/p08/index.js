import { read_input } from "../utils.js";

export const title = "Day 8: Two-Factor Authentication";

export function get_input() {
	const rect = /rect ([0-9]*)x([0-9]*)/
	const rotateColumn = /rotate column x=([0-9]*) by ([0-9]*)/
	const rotateRow = /rotate row y=([0-9]*) by ([0-9]*)/
	return read_input("inp/08.txt").split("\n")
		.map((line) => {
			let res = rect.exec(line)
			if (res)
				return ["rect", ...res.slice(1).map((c) => parseInt(c))]
			res = rotateColumn.exec(line)
			if (res)
				return ["rotateColumn", ...res.slice(1).map((c) => parseInt(c))]
			res = rotateRow.exec(line)
			if (res)
				return ["rotateRow", ...res.slice(1).map((c) => parseInt(c))]
			throw new Error(`Unknown instr '${line}'`)
		})
}

/**
 * @typedef {boolean[][]} LCD
 */

/** @returns {LCD} */
function LCD(w, h) { return Array(h).fill(true).map(() => Array(w).fill(false)) }
function displayLCD(lcd) { lcd.forEach(line => console.log(line.map((v) => v ? "#" : ".").join(''))) }

/** @param {LCD} lcd */
function rect(lcd, w, h) {
	for (let x = 0; x < w; x++)
		for (let y = 0; y < h; y++)
			lcd[y][x] = true
}
/** @param {LCD} lcd */
function rotateColumn(lcd, x, amount) {
	for (let i = 0; i < amount; i++) {
		let shift = lcd[lcd.length - 1][x]
		for (let y = lcd.length - 1; y > 0; y--)
			lcd[y][x] = lcd[y - 1][x]
		lcd[0][x] = shift
	}
}
/** @param {LCD} lcd */
function rotateRow(lcd, y, amount) {
	for (let i = 0; i < amount; i++) {
		let shift = lcd[y][lcd[y].length - 1]
		for (let x = lcd[y].length - 1; x > 0; x--)
			lcd[y][x] = lcd[y][x - 1]
		lcd[y][0] = shift
	}
}

export function solve_a() {
	const input = get_input();
	const instrset = { rotateColumn, rotateRow, rect }
	const lcd = LCD(50, 6)
	for (const [instr, ...args] of input) {
		instrset[instr](lcd, ...args)
	}

	console.log({lit: lcd.reduce((prev, curr) => prev + curr.reduce((a, b) => a + b), 0)})
}

export function solve_b() {
	const input = get_input();
	const instrset = { rotateColumn, rotateRow, rect }
	const lcd = LCD(50, 6)
	for (const [instr, ...args] of input) {
		instrset[instr](lcd, ...args)
	}

	displayLCD(lcd)
}

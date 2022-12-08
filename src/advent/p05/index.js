import { read_input } from "../utils";

export const title = "Day 5: Doesn't He Have Intern-Elves For This?";


/** @returns {string[]} */
export function get_input() {
	return read_input("inp/05.txt").split("\n");
}

function has_double(str) {
	for (let i = 1; i < str.length; i++) {
		if (str[i-1] == str[i])
			return true;
	}
	return false;
}

function min_vowels(str) {
	const min = 3;
	const vowel = [..."aeiou"];
	let count = 0;
	for (const c of str) {
		if (vowel.includes(c)) {
			count++;
		}
		if (count >= min) {
			return true;
		}
	}
	return false;
}

function no_naughty(str) {
	const naughty = ["ab", "cd", "pq", "xy"];
	return naughty.every((n) => !str.includes(n));
}

export function solve_a() {
	const input = get_input();

	let c = 0;
	for (const str of input) {
		if (no_naughty(str) && min_vowels(str) && has_double(str)) {
			c++;
		}
	}
	console.log(c);
}


function pair_letters(str) {
	for (let i = 1; i < str.length; i++) {
		const pair = `${str[i-1]}${str[i]}`;
		for (let j = i+2; j < str.length; j++) {
			const other = `${str[j-1]}${str[j]}`;
			if (pair == other)
				return true;
		}
	}
	return false;
}

function repeat(str) {
	for (let i = 2; i < str.length; i++) {
		if (str[i-2] == str[i])
			return true;
	}
	return false;
}

export function solve_b() {
	const input = get_input();

	let c = 0;
	for (const str of input) {
		if (pair_letters(str) && repeat(str)) {
			c++;
		}
	}
	console.log(c);
}

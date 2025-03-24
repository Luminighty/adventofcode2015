import { read_input } from "../utils.js";

export const title = "Day 9: Explosives in Cyberspace";

export function get_input() {
	return read_input("inp/10.txt");
}

function consumeMarker(str, start) {
	let end = start
	while(end < str.length && str[end] != ')')
		end++
	const inner = /([0-9]*)x([0-9]*)/.exec(str.slice(start + 1, end))
	return {
		length: parseInt(inner[1]),
		repeat: parseInt(inner[2]),
		end
	}
}

function unwrap(str) {
	let res = ""
	let hasMarker = false
	for (let i = 0; i < str.length; i++) {
		if (str[i] != '(') {
			res += str[i]
			continue
		}
		hasMarker = true
		const {length, repeat, end} = consumeMarker(str, i)
		i = end + length
		const slice = str.slice(end + 1, end + 1 + length)
		for (let j = 0; j < repeat; j++)
			res += slice
	}
	return { res, hasMarker }
}

function unwrapV2(str) {
	let resLength = 0
	for (let i = 0; i < str.length; i++) {
		if (str[i] != '(') {
			resLength++
			continue
		}
		const {length, repeat, end} = consumeMarker(str, i)
		i = end + length
		const slice = str.slice(end + 1, end + 1 + length)
		resLength += unwrapV2(slice) * repeat
	}
	return resLength
}

export function solve_a() {
	const input = get_input();
	console.log(unwrap(input).res.length);
	// console.log([unwrap("ADVENT").res, "ADVENT"]);
	// console.log([unwrap("A(1x5)BC").res, "ABBBBBC"]);
	// console.log([unwrap("(3x3)XYZ").res, "XYZXYZXYZ"]);
	// console.log([unwrap("A(2x2)BCD(2x2)EFG").res, "ABCBCDEFEFG"]);
	// console.log([unwrap("(6x1)(1x3)A").res, "(1x3)A"]);
	// console.log([unwrap("X(8x2)(3x3)ABCY").res, "X(3x3)ABC(3x3)ABCY"]);
}

export function solve_b() {
	const input = get_input();
	console.log(unwrapV2(input));
	
}

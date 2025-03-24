import { read_input } from "../utils.js";

export const title = "Day 11: Radioisotope Thermoelectric Generators";

export function get_input() {
	const generator = /([a-z]*) generator/g
	const microchip = /([a-z]*)-compatible microchip/g
	return read_input("inp/11.txt").split("\n")
		.map((line) => {
			const generators = [...line.matchAll(generator)].map((res) => res[1])
			const microchips = [...line.matchAll(microchip)].map((res) => res[1])
			return { generators, microchips }
		})
}

/** @typedef {{generators: String[], microchips: String[]}} Floor */
/** @typedef {{steps: number, floors: Floor[], elevator: number}} State */

const FLOORS = 4

/**
 * 
 * @param {State} left 
 * @param {State} right 
 */
function stateEquals(left, right) {
	if (left.elevator != right.elevator)
		return false
	for (let i = 0; i < FLOORS; i++) {
		for (let j = 0; j < left.floors[i].generators.length; j++)
			if (right.floors[i].generators.includes(left.floors[i].generators[j]))
				return false
		for (let j = 0; j < left.floors[i].microchips.length; j++)
			if (right.floors[i].microchips.includes(left.floors[i].microchips[j]))
				return false
	}
	return true
}

/** @param {State[]} visited @param {State} state */
function visitedContains(visited, state) {
	return visited.some((old) => stateEquals(old, state))
}

/** @param {State} state  */
function copyState(state) {
	return {
		elevator: state.elevator,
		steps: state.steps,
		floors: state.floors.map((floor) => ({generators: [...floor.generators], microchips: [...floor.microchips]}))
	}
}

function takeItem(state, item) {
	const floor = state.floors[state.elevator]
	if (item < floor.generators.length) {
		let generator = state.floors[state.elevator].generators.splice(item, 1)[0]
		return { generator }
	} else {
		let microchip = state.floors[state.elevator].microchips.splice(item - floor.generators.length, 1)[0]
		return { microchip }
	}
}

function addItem(state, offset, ...items) {
	const newState = copyState(state)
	newState.steps++
	newState.elevator += offset
	if (newState.elevator < 0 || newState.elevator >= FLOORS)
		return newState
	items.forEach((item) => {
		if (item.generator)
			newState.floors[newState.elevator].generators.push(item.generator)
		if (item.microchip)
			newState.floors[newState.elevator].microchips.push(item.microchip)
	})
	return newState
}

/** @param {State} state  */
function getNewStates(state) {
	const states = []
	const floor = state.floors[state.elevator]
	const items = floor.generators.length + floor.microchips.length
	for (let i = 0; i < items; i++) {
		const newState = copyState(state)
		const item = takeItem(newState, i)
		states.push(
			addItem(newState, 1, item),
			addItem(newState, -1, item),
		)
	}
	for (let i = 0; i < items - 1; i++)
		for (let j = i + 1; j < items; j++) {
		const newState = copyState(state)
		const item2 = takeItem(newState, j)
		const item1 = takeItem(newState, i)
		states.push(
			addItem(newState, 1, item1, item2),
			addItem(newState, -1, item1, item2),
		)
	}
	return states
}

/** @param {State} state  */
function isValidState(state) {
	if (state.elevator < 0 || state.elevator >= FLOORS)
		return false
	for (const floor of state.floors)
	for (const microchip of floor.microchips)
		if (!floor.generators.includes(microchip) && floor.generators.length > 0)
			return false
	
	return true
}

function isWinningState(state) {
	for (let i = 0; i < FLOORS - 1; i++)
		if (state.floors[i].generators.length > 0 || state.floors[i].microchips.length > 0)
			return false
	return true
}

function findMinimumSteps(floors) {
	const queue = [{floors, steps: 0, elevator: 0}]
	const visited = []
	let depth = 0
	while (queue.length > 0) {
		const current = queue.shift()
		visited.push(current)
		if (current.steps > depth) {
			depth = current.steps
			console.log({depth});
		}

		const states = getNewStates(current).filter((state) => isValidState(state) && !visitedContains(visited, state) && !visitedContains(queue, state))
		const winner = states.find(isWinningState)
		if (winner)
			return winner

		queue.push(...states)
	}
}

export function solve_a() {
	const input = get_input();
	console.log(input);
	
	console.log(findMinimumSteps(input));
}

export function solve_b() {
	const input = get_input();

	console.log();
}

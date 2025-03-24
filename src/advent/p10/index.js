import { read_input } from "../utils.js";

export const title = "Day 10: Balance Bots";

export function get_input() {
	const valueRegex = /value ([0-9]*) goes to bot ([0-9]*)/
	const giveRegex = /bot ([0-9]*) gives low to (bot|output) ([0-9]*) and high to (bot|output) ([0-9]*)/
	return read_input("inp/10.txt").split("\n")
		.map((line) => {
			let res = valueRegex.exec(line)
			if (res)
				return {instr: "value", value: parseInt(res[1]), bot: parseInt(res[2])}
			res = giveRegex.exec(line)
			if (res)
				return {instr: "bot", bot: parseInt(res[1]), lowTarget: res[2], lowId: parseInt(res[3]), highTarget: res[4], highId: parseInt(res[5])}
		})
}
/**
 * @typedef {Object} Brain
 * @property {string} lowTarget
 * @property {number} lowId
 * @property {string} highTarget
 * @property {number} highId
 */

/**
 * @typedef {Object} Bot
 * @property {number} id
 * @property {number | null} low
 * @property {number | null} high
 * @property {Brain} brain
 * @property {Function} takeLow
 * @property {Function} takeHigh
 * @property {Function} give
 */

function createBot(id) {
	return {
		id,
		low: null, 
		high: null, 
		brain: null,
		takeLow() {let l = this.low; this.low = null; return l;},
		takeHigh() {let h = this.high; this.high = null; return h;},
		give(value) {
			if (this.low && this.high)
				console.error(`Bot ${this.id} already holding two chips!`)
			if (!this.low) {
				this.low = value
			} else if (this.low > value) {
				this.high = this.low
				this.low = value
			} else {
				this.high = value
			}
		}
	}
}

function give(bots, outputs, target, id, value) {
	if (target == "bot") {
		bots[id].give(value)
	} else {
		if (!outputs[id])
			outputs[id] = []
		outputs[id].push(value)
	}
}

/** @param {Bot[]} bots  */
function step(bots, outputs) {
	const bot = bots.find((bot) => bot.high != null && bot.low != null)
	
	const low = bot.takeLow()
	const high = bot.takeHigh()
	give(bots, outputs, bot.brain.lowTarget, bot.brain.lowId, low)
	give(bots, outputs, bot.brain.highTarget, bot.brain.highId, high)
	return {low, high, bot}
}

function setupBots(config) {
	const bots = []
	for (const c of config) {
		if (!bots[c.bot])
			bots[c.bot] = createBot(c.bot)
		if (c.instr == "value") {
			bots[c.bot].give(c.value)
		} else if (c.instr == "bot") {
			if (bots[c.bot].brain)
				console.error(`Bot ${c.bot} already has a brain!`)
			bots[c.bot].brain = c
		}
	}
	return bots
}

export function solve_a() {
	const config = get_input();
	const bots = setupBots(config)
	const output = {}
	const target = [61, 17]
	while(true) {
		const {low, high, bot} = step(bots, output)
		if ((low == target[0] && high == target[1]) || (low == target[1] && high == target[0])) {
			console.log(bot)
			break
		}
	}
}

export function solve_b() {
	const config = get_input();
	const bots = setupBots(config)
	const output = {}
	

	while(true) {
		const {low, high, bot} = step(bots, output)

		if (output[0] && output[1] && output[2]) {
			console.log({res: output[0] * output[1] * output[2]});
			break
		}
	}
}

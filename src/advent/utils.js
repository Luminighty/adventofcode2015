import fs from "fs";

export function read_input(file) {
	return fs.readFileSync(file).toString("utf-8");
}
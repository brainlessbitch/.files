import { Widget, Utils } from "../../imports.js";
const { exec, execAsync } = Utils;
const { Label, Box } = Widget;

const Date = () =>
	Label({
		className: "dateLabel",
		connections: [
			[1000, (self) => (self.label = exec('date "+%b %d"'))],

			[
				1000,
				(self) =>
					execAsync(["date", "+%b %d"])
						.then((date) => (self.label = date))
						.catch(console.error),
			],
		],
	});

const Time = () =>
	Label({
		className: "timeLabel",
		connections: [
			[1000, (self) => (self.label = exec('date "+%I:%M"'))],

			[
				1000,
				(self) =>
					execAsync(["date", "+%I:%M"])
						.then((time) => (self.label = time))
						.catch(console.error),
			],
		],
	});

export const Clock = () =>
	Box({
		className: "clock",
		children: [Date(), Time()],
	});

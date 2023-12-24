import { Widget, Utils } from "../../imports.js";
const { exec, execAsync } = Utils;
const { Label, Box } = Widget;

const Time = () =>
	Label({
		className: "timeLabel",
		setup: (self) => {
			self.poll(1000, (self) => (self.label = exec('date "+%I:%M"')));
			self.poll(1000, (self) =>
				execAsync(["date", "+%I:%M"])
					.then((time) => (self.label = time))
					.catch(console.error),
			);
		},
	});

export const Clock = () =>
	Box({
		className: "clock",
		child: Time(),
	});

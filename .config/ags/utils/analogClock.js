import { Widget, Utils } from "../imports.js";
const { GLib } = imports.gi;

function drawClock(widget, context) {
	const width = widget.get_allocated_width();
	const height = widget.get_allocated_height();
	const radius = Math.min(width, height) / 2 - 10;

	context.setSourceRGBA(0, 0, 0, 0);
	context.rectangle(0, 0, width, height);
	context.fill();

	context.translate(width / 2, height / 2);

	// Draw clock face
	context.setSourceRGB(1, 1, 1);
	context.arc(0, 0, radius + 5, 0, 2 * Math.PI);
	context.stroke();

	// Draw hour dashes
	for (let i = 0; i < 12; i++) {
		context.save();
		const angle = (i * 2 * Math.PI) / 12;
		context.rotate(angle);
		context.moveTo(0, -radius + radius * 0.2);
		context.lineTo(0, -radius);
		context.stroke();
		context.restore();
	}

	// Draw minute dashes
	for (let i = 0; i < 60; i++) {
		if (i % 5 === 0) {
			continue;
		}

		context.save();
		const angle = (i * 2 * Math.PI) / 60;
		context.rotate(angle);
		context.moveTo(0, -radius + radius * 0.1);
		context.lineTo(0, -radius);
		context.setSourceRGBA(1, 1, 1, 0.5);
		context.stroke();
		context.restore();
	}

	// Draw clock hands
	const now = new Date();
	const hours = now.getHours() % 12;
	const minutes = now.getMinutes();
	const seconds = now.getSeconds();
	const microseconds = now.getMilliseconds() * 1000;

	// Draw hour hand
	context.save();
	context.rotate(
		(2 * Math.PI * hours) / 12 + (2 * Math.PI * minutes) / (12 * 60),
	);
	context.moveTo(0, 0);
	context.lineTo(0, -radius * 0.6);
	context.stroke();
	context.restore();

	// Draw minute hand
	context.save();
	context.rotate(
		(2 * Math.PI * minutes) / 60 + (2 * Math.PI * seconds) / (60 * 60),
	);
	context.moveTo(0, 0);
	context.lineTo(0, -radius * 0.8);
	context.stroke();
	context.restore();

	// Draw second hand
	context.save();
	context.rotate(
		(2 * Math.PI * seconds) / 60 + (2 * Math.PI * microseconds) / 1000000 / 60,
	);
	context.moveTo(0, radius * 0.08);
	context.lineTo(0, -radius * 0.8);
	context.setSourceRGB(1, 0, 0);
	context.stroke();

	context.arc(0, 0, radius * 0.02, 0, 2 * Math.PI);
	context.fillPreserve();
	context.stroke();

	context.restore();
}

export default () => {
	const analogClock = Widget.DrawingArea({
		hexpand: true,
		vexpand: true,
		setup: (self) => {
			self.on("draw", (widget, context) => {
				drawClock(widget, context);
			});

			self.poll(100, () => {
				self.queue_draw();
			});
		},
	});
	return analogClock;
};

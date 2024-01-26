import { Widget, App } from "../../imports.js";
import PopupWindow from "../../utils/popupWindow.js";
const { Window, Box } = Widget;
const { Gtk, Gdk, GLib, Pango, Vte } = imports.gi;

function readHex(filePath, colorVar) {
	let [, contents] = GLib.file_get_contents(filePath);

	let textDecoder = new TextDecoder("utf-8");
	let fileContent = textDecoder.decode(contents);

	let regex = new RegExp(`\\$${colorVar}:\\s*#([0-9a-fA-F]{6})`);
	let match = fileContent.match(regex);

	return match ? match[1] : null;
}

function hex2rgb(hex) {
	hex = hex.replace(/^#/, "");

	const bigint = parseInt(hex, 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;

	return [r, g, b];
}

function rgbaColor(red, green, blue, alpha = 1.0) {
	const r = red / 255.0;
	const g = green / 255.0;
	const b = blue / 255.0;

	const rgba = new Gdk.RGBA();
	rgba.red = r;
	rgba.green = g;
	rgba.blue = b;
	rgba.alpha = alpha;

	return rgba;
}

let exited = false;

const VteTerminal = Widget.subclass(Vte.Terminal);
const Emulator = () => {
	const emulator = Box({
		className: "terminal",
		css: "min-height: 480px;",
		child: VteTerminal({
			hexpand: true,
			setup: (self) => {
				self.set_size(10, 10);
				self.spawn_sync(
					Vte.PtyFlags.DEFAULT,
					null,
					["/bin/zsh"],
					["VTE=true"],
					GLib.SpawnFlags.SEARCH_PATH,
					null,
					null,
				);
				self.set_colors(
					rgbaColor(...hex2rgb("#D5D8DA")),
					rgbaColor(0, 0, 0, 0.1),
					[
						rgbaColor(...hex2rgb("#232530")),
						rgbaColor(...hex2rgb("#E95678")),
						rgbaColor(...hex2rgb("#29D398")),
						rgbaColor(...hex2rgb("#FAB795")),
						rgbaColor(...hex2rgb("#26BBD9")),
						rgbaColor(...hex2rgb("#EE64AC")),
						rgbaColor(...hex2rgb("#59E1E3")),
						rgbaColor(...hex2rgb("#F9CBBE")),

						rgbaColor(...hex2rgb("#2E303E")),
						rgbaColor(...hex2rgb("#EC6A88")),
						rgbaColor(...hex2rgb("#3FDAA4")),
						rgbaColor(...hex2rgb("#FBC3A7")),
						rgbaColor(...hex2rgb("#3FC4DE")),
						rgbaColor(...hex2rgb("#F075B5")),
						rgbaColor(...hex2rgb("#6BE4E6")),
						rgbaColor(...hex2rgb("#FADAD1")),
					],
				);
				self.set_font(Pango.FontDescription.from_string("MapleMonoNF 12"));

				// Connections
				self.on("key-press-event", (self, event) => {
					if (
						event.get_state()[1] ===
							(Gdk.ModifierType.CONTROL_MASK | Gdk.ModifierType.SHIFT_MASK) &&
						[Gdk.KEY_c, Gdk.KEY_C].includes(event.get_keyval()[1])
					) {
						// TODO: Add selection and copy logic
					} else if (
						event.get_state()[1] ===
							(Gdk.ModifierType.CONTROL_MASK | Gdk.ModifierType.SHIFT_MASK) &&
						[Gdk.KEY_v, Gdk.KEY_V].includes(event.get_keyval()[1])
					) {
						let clipboard = Gtk.Clipboard.get(Gdk.SELECTION_CLIPBOARD);
						clipboard.request_text((clipboard, text) => {
							if (text !== null) {
								self.feed_child(text, text.length);
							}
						});
					}
				});
			},
		}),
	});
	const id = emulator.children[0].connect("child-exited", () => {
		exited = true;
		App.toggleWindow("terminal");
		emulator.children[0].disconnect(id);
	});

	return emulator;
};

export const Terminal = () =>
	PopupWindow({
		name: "terminal",
		anchor: ["top", "right", "left"],
		exclusivity: "ignore",
		layer: "overlay",
		margins: [0],
		transition: "slide_down",
		transitionDuration: 150,
		//popup: true,
		focusable: true,
		child: Emulator(),
		setup: (self) => {
			self.hook(
				App,
				(self, windowName, visible) => {
					if (windowName !== "terminal") {
						return;
					}

					if (exited && visible) {
						exited = false;
						self.setChild(Emulator());
					}
				},
				"window-toggled",
			);
		},
	});

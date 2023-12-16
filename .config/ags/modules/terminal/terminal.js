import { Widget, App } from "../../imports.js";
import PopupWindow from "../../utils/popupWindow.js";
const { Window, Box } = Widget;
const { Gtk, Gdk, GLib, Pango, Vte } = imports.gi;

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
		css: "min-height: 360px;",
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
					rgbaColor(255, 255, 255),
					new Gdk.RGBA({ alpha: 0.1 }),
					[
						rgbaColor(23, 20, 33),
						rgbaColor(192, 28, 40),
						rgbaColor(38, 162, 105),
						rgbaColor(162, 115, 76),
						rgbaColor(18, 72, 139),
						rgbaColor(163, 71, 186),
						rgbaColor(42, 161, 179),
						rgbaColor(208, 207, 204),

						rgbaColor(94, 92, 100),
						rgbaColor(246, 97, 81),
						rgbaColor(51, 209, 122),
						rgbaColor(233, 173, 12),
						rgbaColor(42, 123, 222),
						rgbaColor(192, 97, 203),
						rgbaColor(51, 199, 222),
						rgbaColor(255, 255, 255),
					],
				);
				self.set_font(Pango.FontDescription.from_string("MapleMonoNF 12"));
			},
			connections: [
				[
					"key-press-event",
					(self, event) => {
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
					},
				],
			],
		}),
	});
	const id = emulator.children[0].connect("child-exited", () => {
		exited = true;
		App.toggleWindow("terminal");
		emulator.children[0].disconnect(id);
	});

	return emulator;
};

export const Terminal = ({ monitor } = {}) =>
	PopupWindow({
		name: "terminal",
		anchor: ["top", "right", "left"],
		layer: "overlay",
		margins: [0],
		transition: "slide_down",
		//popup: true,
		focusable: true,
		child: Emulator(),
		connections: [
			[
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
			],
		],
	});

import { Widget, Utils } from "../../imports.js";
const { Box } = Widget;

export const Powermenu = () =>
	Widget.Box({
		className: "powerMenu",
		hpack: "end",
		hexpand: true,
		child: Widget.EventBox({
			onHover: (self) => {
				self.child.children[0].revealChild = true;
			},
			onHoverLost: (self) => {
				self.child.children[0].revealChild = false;
			},
			child: Box({
				children: [
					Widget.Revealer({
						transition: "slide_left",
						transitionDuration: 150,
						child: Widget.Box({
							children: [
								Widget.Button({
									className: "exit",
									label: "󰍃",
									onClicked: () => Utils.exec(`${GLib.get_home_dir()}/logout`),
								}),
								Widget.Button({
									className: "lock",
									label: "󰌾",
									onClicked: () => Utils.exec("swaylock"),
								}),
								Widget.Button({
									className: "suspend",
									label: "󰤄",
									onClicked: () => Utils.exec("systemctl suspend"),
								}),
								Widget.Button({
									className: "reboot",
									label: "󰜉",
									onClicked: () => Utils.exec("systemctl reboot"),
								}),
							],
						}),
					}),
					Widget.Button({
						className: "power",
						label: "󰐥",
						onClicked: () => Utils.exec("systemctl poweroff"),
					}),
				],
			}),
		}),
	});

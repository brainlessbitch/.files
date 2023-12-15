import { Widget, SystemTray } from "../../imports.js";
const { Box, Button, EventBox, Icon, Label, Revealer } = Widget;

const RevIcon = () =>
	Label({
		className: "trayChevron",
		label: "󰅁",
	});

const TrayItems = () =>
	Box({
		className: "trayIcons",
		connections: [
			[
				SystemTray,
				(self) => {
					self.children = SystemTray.items.map((item) =>
						Button({
							className: "trayIcon",
							child: Icon({ binds: [["icon", item, "icon"]] }),
							binds: [["tooltip-markup", item, "tooltip-markup"]],
							onPrimaryClick: (_, event) => item.activate(event),
							//onPrimaryClick: (_, event) => item.openMenu(event)
						}),
					);
				},
			],
		],
	});

export const Tray = () =>
	EventBox({
		onPrimaryClick: (self) => {
			self.child.children[0].label = self.child.children[1].revealChild
				? "󰅁"
				: "󰅂";
			self.child.children[1].revealChild = !self.child.children[1].revealChild;
		},
		child: Box({
			className: "tray",
			children: [
				RevIcon(),
				Revealer({
					transition: "slide_left",
					child: TrayItems(),
				}),
			],
		}),
	});

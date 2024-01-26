import { Widget, Utils, Hyprland, Applications, App } from "../../imports.js";
import DockIcon from "../../utils/appIcon.js";
import PopupWindow from "../../utils/popupWindow.js";

const pins = ["firefox"];

let tasks = [];
Hyprland.connect("changed", () => {
	tasks = Hyprland.clients
		.map((client) => {
			for (const appName of pins) {
				if (client.class.toLowerCase().includes(appName.toLowerCase()))
					return appName;
			}
			for (const app of Applications.list) {
				if (
					(client.title && app.match(client.title)) ||
					(client.class && app.match(client.class))
				) {
					return app.name;
				}
			}
		})
		.filter((appName) => appName !== null);
});

const DockPins = () =>
	Widget.Box({
		className: "dockIcons",
		children: pins.map((appName) => {
			return DockIcon({
				className: "dockIcon",
				appName: appName,
				tooltipText: appName,
			});
		}),
	});

const toggleDock = () => {
	const clientsOnWorkspace = Hyprland.clients.filter(
		(client) => client.workspace.id === Hyprland.active.workspace.id,
	);
	if (clientsOnWorkspace.some((client) => client.floating === false)) {
		App.closeWindow("dock");
	} else {
		App.openWindow("dock");
	}
};

Hyprland.connect("changed", toggleDock);

export const Dock = () =>
	PopupWindow({
		name: "dock",
		anchor: ["bottom"],
		margins: [0, 0, 6],
		layer: "top",
		transition: "slide_up",
		transitionDuration: 150,
		child: Widget.Box({
			className: "dock",
			children: [
				Widget.Box({
					className: "home",
					child: Widget.Label({
						className: "homeIcon",
						label: "󰋜",
					}),
				}),
				DockPins(),
			],
		}),
	});

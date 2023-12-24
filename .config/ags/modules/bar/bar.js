import { Widget, Network, Bluetooth } from "../../imports.js";
const { Window, Box, CenterBox } = Widget;

// Widgets
import { HeartIcon } from "./icon.js";
import { Workspaces } from "./workspaces.js";
import { Tray } from "./tray.js";
import { BatteryWidget } from "./battery.js";
import { Clock } from "./clock.js";
import { pfp } from "./pfp.js";

const NetworkWidget = () =>
	Widget.Label({
		className: "wifiIcon",
		label: "󰤭",
		setup: (self) => {
			self.hook(Network, (self) => {
				if (Network.wifi.internet === "disconnected") {
					self.className = "wifiIcon off";
					self.label = "󰤭";
				} else {
					self.className = "wifiIcon";
					self.label = "󰤨";
				}
			});
		},
	});

const BluetoothWidget = () =>
	Widget.Label({
		className: "bluetoothIcon",
		label: "󰂲",
		setup: (self) => {
			self.hook(Bluetooth, (self) => {
				if (Bluetooth.enabled) {
					self.className = "bluetoothIcon";
					self.label = "󰂯";
				} else {
					self.className = "bluetoothIcon off";
					self.label = "󰂲";
				}
			});
		},
	});

const Left = () =>
	Box({
		className: "barLeft",
		hpack: "start",
		children: [HeartIcon(), Workspaces()],
	});

const Center = () =>
	Box({
		children: [],
	});

const Right = () =>
	Box({
		className: "barRight",
		hpack: "end",
		children: [
			Tray(),
			Box({
				className: "systemInfo",
				children: [BatteryWidget(), NetworkWidget(), BluetoothWidget()],
			}),
			Clock(),
			pfp(),
		],
	});

export const Bar = ({ monitor } = {}) =>
	Window({
		//className: 'bar',
		name: "bar",
		anchor: ["top", "right", "left"],
		exclusivity: "exclusive",
		layer: "bottom",
		margins: [0],
		monitor,
		child: CenterBox({
			className: "bar",
			startWidget: Left(),
			centerWidget: Center(),
			endWidget: Right(),
		}),
	});

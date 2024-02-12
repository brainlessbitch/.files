const Network = await Service.import("network");
const Bluetooth = await Service.import("bluetooth");

// Widgets
import { Tray } from "./tray.js";
import { Workspaces } from "./workspaces.js";
import { Clock } from "./clock.js";

const NetworkWidget = () =>
  Widget.Label({
    className: "wifiIcon",
    label: "󰤭",
    setup: (self) => {
      self.hook(Network, (self) => {
        if (Network.wifi.internet === "disconnected") {
          self.className = "barWifiIcon off";
          self.label = "󰤭";
        } else {
          self.className = "barWifiIcon";
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
          self.className = "barBluetoothIcon";
          self.label = "󰂯";
        } else {
          self.className = "barBluetoothIcon off";
          self.label = "󰂲";
        }
      });
    },
  });

const Left = () =>
  Widget.Box({
    hpack: "start",
    children: [
      Widget.Button({
        className: "systemInfo",
        onClicked: () => App.toggleWindow("controlPanel"),
        child: Widget.Box({
          children: [NetworkWidget(), BluetoothWidget()],
        }),
      }),
    ],
  });

const Center = () =>
  Widget.Box({
    children: [Workspaces()],
  });

const Right = () =>
  Widget.Box({
    hpack: "end",
    children: [/*Tray(),*/ Clock()],
  });

export const Bar = () =>
  Widget.Window({
    name: "bar",
    anchor: ["top", "right", "left"],
    exclusivity: "exclusive",
    margins: [12, 24, 0],
    child: Widget.CenterBox({
      className: "bar",
      start_widget: Left(),
      center_widget: Center(),
      end_widget: Right(),
    }),
  });

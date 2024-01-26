import { Widget, App, Network, Bluetooth } from "../../imports.js";
const { Window, Box, CenterBox } = Widget;

// Widgets
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
  Box({
    hpack: "start",
    children: [
      Widget.Button({
        className: "systemInfo",
        onClicked: () => App.toggleWindow("controlPanel"),
        child: Box({
          children: [NetworkWidget(), BluetoothWidget()],
        }),
      }),
    ],
  });

const Center = () =>
  Box({
    children: [Workspaces()],
  });

const Right = () =>
  Box({
    hpack: "end",
    children: [Clock()],
  });

export const Bar = () =>
  Window({
    name: "bar",
    anchor: ["top", "right", "left"],
    exclusivity: "exclusive",
    margins: [12, 24, 0],
    child: CenterBox({
      className: "bar",
      start_widget: Left(),
      center_widget: Center(),
      end_widget: Right(),
    }),
  });

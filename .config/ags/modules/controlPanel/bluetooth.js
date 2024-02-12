const Bluetooth = await Service.import("bluetooth");

export const BluetoothWidget = () =>
  Widget.Button({
    onClicked: () => Bluetooth.toggle(),
    child: Widget.Box({
      className: "bluetooth",
      vpack: "center",
      vexpand: true,
      setup: (self) => {
        self.hook(Bluetooth, (self) => {
          if (Bluetooth.enabled) {
            self.toggleClassName("off", false);
          } else {
            self.toggleClassName("off", true);
          }
        });
      },
      children: [
        Widget.Label({
          className: "bluetoothIcon",
          label: "󰂲",
          setup: (self) => {
            self.hook(Bluetooth, (self) => {
              if (Bluetooth.enabled) {
                self.label = "󰂯";
              } else {
                self.label = "󰂲";
              }
            });
          },
        }),
        Widget.Box({
          vertical: true,
          vpack: "center",
          children: [
            Widget.Label({
              className: "bluetoothLabel",
              label: "Bluetooth",
              hpack: "start",
            }),
            /*Widget.Label({
						className: "deviceLabel",
						label: "N/A",
						setup: (self) => {
							self.hook(Bluetooth, (self) => {
								self.label = `${Bluetooth.devices[0]}`;
							});
						},
					}),*/
          ],
        }),
      ],
    }),
  });

const Network = await Service.import("network");

export const WiFi = () =>
  Widget.Button({
    onClicked: () => Network.toggleWifi(),
    child: Widget.Box({
      className: "wifi",
      vpack: "center",
      vexpand: true,
      setup: (self) => {
        self.hook(Network, (self) => {
          if (Network.wifi.internet === "disconnected") {
            self.toggleClassName("off", true);
          } else {
            self.toggleClassName("off", false);
          }
        });
      },
      children: [
        Widget.Label({
          className: "wifiIcon",
          label: "󰤭",
          setup: (self) => {
            self.hook(Network, (self) => {
              if (Network.wifi.internet === "disconnected") {
                self.label = "󰤭";
              } else {
                self.label = "󰤨";
              }
            });
          },
        }),
        Widget.Box({
          vertical: true,
          vpack: "center",
          children: [
            Widget.Label({
              className: "wifiLabel",
              label: "Wi-Fi",
              hpack: "start",
            }),
            /*Widget.Label({
						className: "networkLabel",
						label: "N/A",
						hpack: "start",
						setup: (self) => {
							self.hook(Network, (self) => {
								self.label = `${Network.wifi.ssid || "N/A"}`;
							});
						},
					}),*/
          ],
        }),
      ],
    }),
  });

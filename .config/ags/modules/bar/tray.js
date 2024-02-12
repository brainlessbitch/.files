const SystemTray = await Service.import("systemtray");

const RevIcon = () =>
  Widget.Label({
    className: "trayChevron",
    label: "<",
  });

const TrayItems = () =>
  Widget.Box({
    className: "trayIcons",
    setup: (self) => {
      self.hook(SystemTray, (self) => {
        self.children = SystemTray.items.map((item) =>
          Widget.Button({
            className: "trayIcon",
            child: Widget.Icon({
              setup: (self) => self.bind("icon", item, "icon"),
            }),
            setup: (self) =>
              self.bind("tooltip-markup", item, "tooltip-markup"),
            onPrimaryClick: (_, event) => item.activate(event),
            //onPrimaryClick: (_, event) => item.openMenu(event)
          }),
        );
      });
    },
  });

export const Tray = () =>
  Widget.EventBox({
    onPrimaryClick: (self) => {
      self.child.children[0].label = self.child.children[1].revealChild
        ? "<"
        : ">";
      self.child.children[1].revealChild = !self.child.children[1].revealChild;
    },
    child: Widget.Box({
      className: "tray",
      children: [
        RevIcon(),
        Widget.Revealer({
          transition: "slide_left",
          transitionDuration: 150,
          child: TrayItems(),
        }),
      ],
    }),
  });

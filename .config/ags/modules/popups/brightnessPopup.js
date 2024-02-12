import Brightness from "../../services/brightness.js";

const BrightnessIcon = () =>
  Widget.Label({
    className: "brtPopupIcon",
    setup: (self) => {
      self.hook(Brightness, (self) => {
        const icons = ["󰃚", "󰃛", "󰃜", "󰃝", "󰃞", "󰃟", "󰃠"];

        self.label =
          icons[Math.floor((Brightness.screen * 100) / 14)].toString();
      });
    },
  });

const PercentBar = () =>
  Widget.Slider({
    className: "brtPopupBar",
    drawValue: false,
    vertical: true,
    inverted: true,
    onChange: ({ value }) => (Brightness.screen = value),
    setup: (self) => {
      self.hook(Brightness, (self) => (self.value = Brightness.screen));
    },
  });

export const BrightnessPopup = () =>
  Widget.Box({
    css: `min-height: 1px;
          min-width: 1px;`,
    child: Widget.Revealer({
      transition: "slide_left",
      child: Widget.Box({
        className: "brightnessPopup",
        vertical: true,
        children: [PercentBar(), BrightnessIcon()],
      }),
      attribute: { count: 0 },
      setup: (self) => {
        self.hook(Brightness, (self) => {
          self.revealChild = true;
          self.attribute.count++;
          Utils.timeout(1500, () => {
            self.attribute.count--;

            if (self.attribute.count === 0) self.revealChild = false;
          });
        });
      },
    }),
  });

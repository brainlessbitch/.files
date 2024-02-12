// Widgets
import { BrightnessPopup } from "./brightnessPopup.js";
import { VolumePopup } from "./volumePopup.js";

export const Popups = () =>
  Widget.Window({
    name: "popups",
    anchor: ["right"],
    layer: "overlay",
    margins: [0],
    child: Widget.Box({
      className: "popups",
      children: [BrightnessPopup(), VolumePopup()],
    }),
  });

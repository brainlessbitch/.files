import { Widget, Utils, Mpris } from "../../imports.js";
const { Box } = Widget;
const { Gtk } = imports.gi;
import PopupWindow from "../../utils/popupWindow.js";
import AnalogClock from "../../utils/analogClock.js";

import { UserInfo } from "./userInfo.js";
import { WiFi } from "./wifi.js";
import { BluetoothWidget } from "./bluetooth.js";
import { BatteryWidget } from "./battery.js";
import { VolumeSlider } from "./volumeSlider.js";
import { BrightnessSlider } from "./brightnessSlider.js";
import { MusicWidget } from "./music.js";

function drawScrew(cr, x, y) {
  const angle = Math.random() * (2 * Math.PI);

  cr.save();
  cr.translate(x, y);
  cr.rotate(angle);

  cr.arc(0, 0, 4, 0, 2 * Math.PI);
  cr.setSourceRGBA(1, 1, 1, 1);
  cr.fill();

  cr.setLineWidth(1);
  cr.moveTo(-2, 0);
  cr.lineTo(2, 0);
  cr.moveTo(0, -2);
  cr.lineTo(0, 2);

  cr.setSourceRGBA(0, 0, 0, 1);
  cr.stroke();

  cr.restore();
}

const screwsPanel = () =>
  Box({
    className: "screwsPanel",
    child: Widget.DrawingArea({
      hexpand: true,
      vexpand: true,
      setup: (self) => {
        self.on("draw", (self, cr) => {
          const height = self.get_allocation().height;
          const width = self.get_allocation().width;

          drawScrew(cr, 10, 10);
          drawScrew(cr, width - 10, 10);
          drawScrew(cr, 10, height - 10);
          drawScrew(cr, width - 10, height - 10);
        });
      },
    }),
  });

const uwuifier = () =>
  Widget.Box({
    vertical: true,
    children: [
      Widget.Revealer({
        transition: "slide_down",
        transitionDuration: 150,
        child: Widget.Box({
          className: "uwuifier",
          children: [
            Widget.Entry({
              className: "uwuifierEntry",
              hexpand: true,
              placeholderText: "Type something...",
              onAccept: (self) => {
                self.set_text(
                  Utils.exec(`bash -c "uwuify <<< '${self.text}'"`),
                );
                self.set_position(-1);
              },
            }),
            Widget.Button({
              className: "uwuifierCopyButton",
              child: Widget.Label("󰆏"),
              onClicked: (self) =>
                Utils.execAsync(`wl-copy ${self.parent.children[0].text}`),
            }),
          ],
        }),
      }),
      Widget.Button({
        className: "pullDown",
        css: "margin: 0 6px;",
        //hexpand: true,
        hpack: "end",
        tooltipText: "uwuifier",
        onClicked: (self) => {
          self.parent.children[0].revealChild =
            !self.parent.children[0].revealChild;
        },
      }),
    ],
  });

export const ControlPanel = () =>
  PopupWindow({
    name: "controlPanel",
    anchor: ["top", "left"],
    margins: [12, 0],
    focusable: true,
    transition: "slide_right",
    transitionDuration: 150,
    child: Box({
      css: "margin-left: 12px;",
      vertical: true,
      children: [
        Box({
          className: "controlPanel",
          vertical: true,
          children: [
            UserInfo(),
            Box({
              children: [
                Box({
                  vertical: true,
                  children: [WiFi(), BluetoothWidget()],
                }),
                Box({
                  //vertical: true,
                  children: [BatteryWidget() /*screwsPanel()*/],
                }),
              ],
            }),
            VolumeSlider(),
            BrightnessSlider(),
          ],
        }),
        Box({
          child: Widget.Revealer({
            transition: "slide_down",
            transitionDuration: 150,
            setup: (self) => {
              self.hook(Mpris, (self) => {
                const player = Mpris.players[0];
                if (!player) return;

                if (player) {
                  self.revealChild = true;
                }
              });
              self.hook(
                Mpris,
                (self) => {
                  self.revealChild = false;
                },
                "player-closed",
              );
            },
            child: MusicWidget(),
          }),
        }),
        uwuifier(),
        /*Box({
          className: "analogClock",
          hpack: "start",
          setup: (self) => {
            Utils.timeout(1, () => {
              self.css = `
								min-width: ${self.parent.get_allocation().width / 2}px;
								min-height: ${self.parent.get_allocation().width / 2}px;`;
            });
          },
          child: AnalogClock(),
        }),*/
      ],
    }),
  });

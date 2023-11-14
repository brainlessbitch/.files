import { Widget, Utils, App } from '../imports.js';
import Brightness from '../services/brightness.js';

const BrightnessIcon = () => Widget.Box({
  className: 'brtPopupIcon',
    children: [
      Widget.Stack({
        items: [
            ['75', Widget.Label('󰃠')],
            ['62', Widget.Label('󰃟')],
            ['50', Widget.Label('󰃞')],
            ['37', Widget.Label('󰃝')],
            ['25', Widget.Label('󰃜')],
            ['12', Widget.Label('󰃛')],
            ['0', Widget.Label('󰃚')],
        ],
        connections: [[Brightness, stack => {
          const show = [75, 62, 50, 37, 25, 12, 0].find(
            threshold => threshold <= Brightness.screen * 100);

            stack.shown = `${show}`;
        }]],
      }),
    ],
});


const PercentBar = () => Widget.Overlay({
    child: Widget.Slider({
        className: 'brtPopupBar',
        vertical: true,
        inverted: true,
        drawValue: false,
        onChange: ({ value }) => Brightness.screen = value,
        connections: [[Brightness, slider => {

            slider.value = Brightness.screen;
        }]],
    }),
    overlays: [
        Widget.Box({
            vpack: 'end',
            child: BrightnessIcon(),
        }),
    ]
});

export const BrightnessPopup = () => Widget.Box({
    css: `min-height: 1px;
          min-width: 1px;`,
    child: Widget.Revealer({
        className: 'brightnessPopup',
        transition: 'slide_up',
        child: PercentBar(),
        properties: [['count', 0]],
        connections: [[Brightness, rev => {
            rev.revealChild = true;
            rev._count++;
            Utils.timeout(1500, () => {
                rev._count--;

                if (rev._count === 0)
                    rev.revealChild = false;
            })
        }]]
    })
});

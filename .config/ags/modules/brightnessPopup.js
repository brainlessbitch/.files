import { Widget, Utils, App } from '../imports.js';
const { Box, Stack, Slider, Label } = Widget;
import Brightness from '../services/brightness.js';
import PopupWindow from './misc/popupWindow.js';

const BrightnessIcon = () => Box({
  className: 'volPopupIcon',
    children: [
      Stack({
        items: [
            ['101', Widget.Label('󰃠')],
            ['85', Widget.Label('󰃟')],
            ['68', Widget.Label('󰃞')],
            ['51', Widget.Label('󰃝')],
            ['34', Widget.Label('󰃜')],
            ['1', Widget.Label('󰃛')],
            ['0', Widget.Label('󰃚')],
        ],
        connections: [[Brightness, stack => {
          const show = [101, 85, 68, 51, 34, 1, 0].find(
            threshold => threshold <= Math.floor(Brightness.screen) * 100);

            stack.shown = `${show}`;
        }]],
      }),
    ],
});


const PercentBar = () => Widget.Overlay({
    child: Slider({
        className: 'volPopupBar',
        vertical: true,
        inverted: true,
        drawValue: false,
        onChange: ({ value }) => Brightness.screen = value,
        connections: [[Brightness, slider => {

            slider.value = Brightness.screen;
        }]],
    }),
    overlays: [
        Box({
            vpack: 'end',
            child: BrightnessIcon(),
        }),
    ]
});

const togglePopup = (() => {
    let count = 0;

    Brightness.connect('changed', () => {
        App.openWindow('brightnessPopup');
        count++;
        Utils.timeout(1500, () => {
            count--;

            if (count === 0)
                App.closeWindow('brightnessPopup');
        })
    })
})();

const percentBar = PercentBar();

export const BrightnessPopup = () => PopupWindow({
    name: 'brightnessPopup',
    className: 'volumePopup',
    anchor: ['bottom', 'right'],
    layer: 'overlay',
    margins: [0, 48, 12, 0],
    transition: 'slide_up',
    child: Box({
        children: [
            percentBar,
        ]
    }),
});

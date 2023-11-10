import { Widget, Utils, App, Audio } from '../imports.js';
const { Box, Stack, Slider, Label } = Widget;
import PopupWindow from './misc/popupWindow.js';

const VolumeIcon = () => Box({
  className: 'volPopupIcon',
    children: [
      Stack({
        items: [
            ['101', Widget.Label('󰕾')],
            ['67', Widget.Label('󰕾')],
            ['34', Widget.Label('󰖀')],
            ['1', Widget.Label('󰕿')],
            ['0', Widget.Label('󰝟')],
        ],
        connections: [[Audio, stack => {
          if (!Audio.speaker)
              return;

          if (Audio.speaker.stream.isMuted) {
            stack.shown = '0';
            return;
          }

          const show = [101, 67, 34, 1, 0].find(
            threshold => threshold <= Audio.speaker.volume * 100);

            stack.shown = `${show}`;
        }, 'speaker-changed']],
      }),
    ],
});


const PercentBar = () => Widget.Overlay({
    child: Slider({
        className: 'volPopupBar',
        vertical: true,
        inverted: true,
        drawValue: false,
        onChange: ({ value }) => Audio.speaker.volume = value,
        connections: [[Audio, slider => {
            if (!Audio.speaker)
            return;

            slider.value = Audio.speaker.volume;
        }, 'speaker-changed']],
    }),
    overlays: [
        Box({
            vpack: 'end',
            child: VolumeIcon(),
        }),
    ]
});

const togglePopup = (() => {
    let count = 0;

    Audio.connect('speaker-changed', () => {
        App.openWindow('volumePopup');
        count++;
        Utils.timeout(1500, () => {
            count--;

            if (count === 0)
                App.closeWindow('volumePopup');
        })
    })
})();

const percentBar = PercentBar();

export const VolumePopup = () => PopupWindow({
    name: 'volumePopup',
    className: 'volumePopup',
    anchor: ['bottom', 'right'],
    layer: 'overlay',
    margins: [0, 12, 12, 0],
    transition: 'slide_up',
    child: Box({
        children: [
            percentBar,
        ]
    }),
});

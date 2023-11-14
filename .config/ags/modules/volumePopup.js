import { Widget, Utils, App, Audio } from '../imports.js';
const { Box, Stack, Slider, Label } = Widget;

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

export const VolumePopup = () => Box({
    css: `min-height: 1px;
          min-width: 1px;`,
    child: Widget.Revealer({
        className: 'volumePopup',
        transition: 'slide_up',
        child: PercentBar(),
        revealChild: true,
        properties: [['count', 0]],
        connections: [[Audio, rev => {
            rev.revealChild = true;
            rev._count++;
            Utils.timeout(1500, () => {
                rev._count--;

                if (rev._count === 0)
                    rev.revealChild = false;
            });
        },'speaker-changed']]
    })
});

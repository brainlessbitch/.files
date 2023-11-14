import { Widget, Utils, Battery } from '../../imports.js';
const { Box, Label, Stack, EventBox, Revealer } = Widget;

const BatIcon = () => Box({
    className: 'batIcon',
    child: Stack({
        items: [
            ['100', Label('󰁹\u{2009}')], ['+100', Label('󰂅')],
            ['90', Label('󰂂\u{2009}')], ['+90', Label('󰂋')],
            ['80', Label('󰂁\u{2009}')], ['+80', Label('󰂊')],
            ['70', Label('󰂀\u{2009}')], ['+70', Label('󰢞')],
            ['60', Label('󰁿\u{2009}')], ['+60', Label('󰂉')],
            ['50', Label('󰁾\u{2009}')], ['+50', Label('󰢝')],
            ['40', Label('󰁽\u{2009}')], ['+40', Label('󰂈')],
            ['30', Label('󰁼\u{2009}')], ['+30', Label('󰂇')],
            ['20', Label('󰁻\u{2009}')], ['+20', Label('󰂆')],
            ['10', Label('󰁺\u{2009}')], ['+10', Label('󰢜')],
            ['0', Label('󰂎\u{2009}')], ['+0', Label('󰢟')],
        ],
        connections: [[Battery, stack => {
          const show = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0].find(
            threshold => threshold <= Battery.percent);

            stack.shown = `${Battery.charging ? '+' + show : '' + show}`;
        }]],
    }),
});

const BatLabel = () => Revealer({
    transition: 'slide_right',
    revealChild: false,
    child: Label({
        className: 'batLabel',
        connections: [[Battery, label => {
            label.label = `${Battery.percent}%`
        }]],
    }),
});

const batLabel = BatLabel();

export const BatteryWidget = () => Box({
    className: 'battery',
    child: EventBox({
        onHover: () => batLabel.revealChild = true,
        onHoverLost: () => batLabel.revealChild = false,
        child: Box({
            children: [
                BatIcon(),
                batLabel,
            ]
        }),
    }),
});

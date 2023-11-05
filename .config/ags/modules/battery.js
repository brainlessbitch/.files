import { Widget, Utils, Battery } from '../imports.js';
const { Box, Label, Stack, EventBox, Revealer } = Widget;

const BatIcon = () => Box({
    className: 'batIcon',
    child: Stack({
        items: [
            ['100', Label('󰁹')], ['+100', Label('󰂅\u{2004}')],
            ['90', Label('󰂂')], ['+90', Label('󰂋\u{2004}')],
            ['80', Label('󰂁')], ['+80', Label('󰂊\u{2004}')],
            ['70', Label('󰂀')], ['+70', Label('󰢞\u{2004}')],
            ['60', Label('󰁿')], ['+60', Label('󰂉\u{2004}')],
            ['50', Label('󰁾')], ['+50', Label('󰢝\u{2004}')],
            ['40', Label('󰁽')], ['+40', Label('󰂈\u{2004}')],
            ['30', Label('󰁼')], ['+30', Label('󰂇\u{2004}')],
            ['20', Label('󰁻')], ['+20', Label('󰂆\u{2004}')],
            ['10', Label('󰁺')], ['+10', Label('󰢜\u{2004}')],
            ['0', Label('󰂎')], ['+0', Label('󰢟\u{2004}')],
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
        onHoverLost: (widget, event) => {
        const [_, x, y] = event.get_coords()
        const w = widget.get_allocation().width;
        const h = widget.get_allocation().height;
        if (x < 0 || x > w || y < 0 || y > h) { batLabel.revealChild = false }},
        child: Box({
            children: [
                BatIcon(),
                batLabel,
            ]
        }),
    }),
});

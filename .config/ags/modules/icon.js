import { Utils, Widget } from '../imports.js';
const { execAsync } = Utils;
const { Box, Button, Label } = Widget;

const OsIcon = () => Label({
    className: 'osIcon',
    style: 'font-size: 16px;',
    label: '\u{2004}'
});

export const Icon = () => Box({
    className: 'icon',
    child: Button({
        onClicked: () => execAsync(["wofi", "--show", "drun"]).catch(console.error),
        child: Box({
            child: OsIcon(),
        }),
    }),
});

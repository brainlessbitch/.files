import { Utils, Widget } from '../imports.js';
const { execAsync } = Utils;
const { Box, Button, Label } = Widget;

const OsIcon = () => Label({
    className: 'osIcon',
    halign: 'center',
    valign: 'center',
    style: 'font-size: 16px;',
    label: '\u{2004}'
});

export const Icon = () => Button({
    className: 'icon',
    onClicked: () => execAsync(["wofi", "--show", "drun"]).catch(console.error),
    child: OsIcon(),
});

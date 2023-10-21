import { Utils, Widget } from '../imports.js';
const { execAsync } = Utils;
const { Box, Button, Label } = Widget;

const PickerIcon = () => Label({
    className: 'pickerIcon',
    style: 'font-size: 16px;',
    label: '󰈊\u{2009}'
});

export const Colorpicker = () => Box({
    className: 'colorpicker',
    child: Button({
        onClicked: () => execAsync(["hyprpicker", "-a"]).catch(console.error),
        child: Box({
            child: PickerIcon(),
        }),
    }),
});

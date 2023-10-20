import { Widget } from '../imports.js';
const { Box } = Widget;
import { Volume } from './volume.js';
import Wifi from './wifi.js';
import { Colorpicker } from './colorpicker.js';

export const SysInfo = () => Box({
    className: 'sysinfo',
    children: [
        Volume(),
        Wifi(),
        Colorpicker(),
    ],
})

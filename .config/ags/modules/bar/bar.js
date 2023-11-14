import { Widget } from '../../imports.js';

// Widgets
import { Workspaces } from './workspaces.js';
import Tray from './tray.js';
import { Volume } from './volume.js';
import { BatteryWidget } from './battery.js';
import { Clock } from './clock.js';

const Left = () => Widget.Box({
    child: Widget.Box({
        className: 'barLeft',
        children: [
            Workspaces()
        ],
    }),
});

const Center = () => Widget.Box({
  children: [],
});

const Right = () => Widget.Box({
    className: 'barRight',
    css: 'background: transparent;',
    hpack: 'end',
    children: [
        //Tray(),
        Clock(),
        Widget.Label({
            className: 'wifiIcon',
            label: '󰤨'
        }),
        BatteryWidget()
    ],
});

export const Bar = ({ monitor } = {}) => Widget.Window({
    className: 'bar',
    name: 'bar',
    anchor: ['top', 'left', 'right'],
    exclusive: true,
    layer: 'bottom',
    margins: [6, 6, 0, 6],
    monitor,
    child: Widget.CenterBox({
        startWidget: Left(),
        centerWidget: Center(),
        endWidget: Right()
    }),
})

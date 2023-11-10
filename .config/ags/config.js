// AGS
import { Widget, App, Utils } from './imports.js';
const { Box, CenterBox, Window } = Widget;

// Bar widgets
import { Workspaces } from './modules/bar/workspaces.js';
import Tray from './modules/bar/tray.js';
import { Volume } from './modules/bar/volume.js';
import { BatteryWidget } from './modules/bar/battery.js';
import { Clock } from './modules/bar/clock.js';

// Windows
import { DesktopMenu } from './modules/desktop.js';
import { Dock } from './modules/dock.js';
import { launcher } from './modules/launcher/launcher.js';
import { VolumePopup } from './modules/volumePopup.js';
//import { BrightnessPopup } from './modules/brightnessPopup.js';

const Left = () => Box({
    child: Box({
        className: 'barLeft',
        children: [
            Workspaces()
        ],
    }),
});

const Center = () => Box({
  children: [],
});

const Right = () => Box({
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
        //Volume(),
        BatteryWidget()
    ],
});

const Bar = ({ monitor } = {}) => Window({
    className: 'bar',
    name: 'bar',
    anchor: ['top', 'left', 'right'],
    exclusive: true,
    layer: 'bottom',
    margins: [6, 6, 0, 6],
    monitor,
    child: CenterBox({
        startWidget: Left(),
        centerWidget: Center(),
        endWidget: Right()
    }),
})

// Compile scss
Utils.exec(`sassc ${App.configDir}/scss/main.scss ${App.configDir}/style.css`);
App.resetCss();
App.applyCss(`${App.configDir}/style.css`);

// Main config
export default {
    style: `${App.configDir}/style.css`,
    windows: [
        Bar(),
        DesktopMenu(),
        Dock(),
        launcher,
        VolumePopup(),
        //BrightnessPopup()
    ],
};

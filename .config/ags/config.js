// AGS
import { Widget, App, Utils } from './imports.js';
const { Box, CenterBox, Window } = Widget;

// Bar widgets
import { BatteryWidget } from './modules/battery.js';
import { Volume } from './modules/volume.js';
import { Clock } from './modules/clock.js';
import Tray from './modules/tray.js';
import { ClientTitle } from './modules/client.js';
import { Workspaces } from './modules/workspaces.js';

// Windows
import { DesktopMenu } from './modules/desktop.js';
import { Dock } from './modules/dock.js';
import { Todo } from './modules/todo.js';

const UwUButton = () => Widget.Button({
    className: 'button',
    child: Widget.Label('UwU'),
    onPrimaryClick: () => console.log('UwU'),
});

const Left = () => Box({
    child: Box({
        className: 'barLeft',
        children: [
            Workspaces(),
            /*Sep(),
            ClientTitle(),*/
        ],
    }),
});

const Center = () => Box({
  children: [],
});

const Right = () => Box({
    className: 'barRight',
    style: 'background: transparent;',
    halign: 'end',
    children: [
        //Tray(),
        Volume(),
        BatteryWidget(),
        Clock(),
    ],
});

const Bar = ({ monitor } = {}) => Window({
    className: 'bar',
    name: `bar`,
    anchor: ['top', 'left', 'right'],
    exclusive: true,
    layer: "bottom",
    margin: [6, 6, 0, 6],
    monitor,
    child: CenterBox({
        startWidget: Left(),
        centerWidget: Center(),
        endWidget: Right(),
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
        //Todo(),
    ],
};

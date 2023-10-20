import { Widget, App, Utils } from './imports.js';
const { Box, CenterBox, Window } = Widget;
import { Icon } from './modules/icon.js';
import { Workspaces, Workspaces2 } from './modules/workspaces.js';
import { BatteryWidget } from './modules/battery.js';
import { Clock } from './modules/clock.js';

const Left = () => Box({
    className: 'barLeft',
    vertical: true,
    children: [
        Icon(),
        Workspaces2(),
    ],
});

const Center = () => Box({
  children: [],
});

const Right = () => Box({
    className: 'barRight',
    vertical: true,
    valign: 'end',
    children: [
        BatteryWidget(),
        Clock(),
    ],
});

const Bar = ({ monitor } = {}) => Window({
    className: 'bar',
    name: `bar-${monitor}`,
    anchor: ['top', 'bottom', 'left'],
    exclusive: true,
    layer: "bottom",
    margin: [12, 0, 12, 12],
    monitor,
    child: CenterBox({
        vertical: true,
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
    ],
};

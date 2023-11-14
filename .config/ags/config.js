import { Utils, App } from './imports.js';

// Windows
import { Bar } from './modules/bar/bar.js';
import { DesktopMenu } from './modules/desktop.js';
import { Dock } from './modules/dock.js';
import { launcher } from './modules/launcher/launcher.js';
import { Popups } from './modules/popups.js';
import { CornerTopleft, CornerTopright } from './modules/corners.js';

// Compile scss
Utils.exec(`sassc ${App.configDir}/scss/main.scss ${App.configDir}/style.css`);
App.resetCss();
App.applyCss(`${App.configDir}/style.css`);

// Main config
export default {
    style: `${App.configDir}/style.css`,
    closeWindowDelay: {
        'launcher': 300,
    },
    windows: [
        Bar(),
        DesktopMenu(),
        Dock(),
        launcher,
        Popups(),
        /*CornerTopleft(),
        CornerTopright()*/
    ],
};

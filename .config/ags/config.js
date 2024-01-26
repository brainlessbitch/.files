import { Utils, App, Battery } from "./imports.js";
import DirectoryMonitor from "./services/directoryMonitor.js";
const { Gio } = imports.gi;

// Windows
import { Bar } from "./modules/bar/bar.js";
import { ControlPanel } from "./modules/controlPanel/controlPanel.js";
import { launcher } from "./modules/launcher/launcher.js";
// import { Dock } from "./modules/dock/dock.js";
import { Popups } from "./modules/popups/popups.js";

import { Terminal } from "./modules/terminal/terminal.js";

const criticalPowerNotification = new Gio.Notification();
criticalPowerNotification.set_title("Battery exhausted");
criticalPowerNotification.set_body("Shutdown imminent");

const lowPowerNotification = new Gio.Notification();
lowPowerNotification.set_title("Battery low");
lowPowerNotification.set_body("Plug the cable!");

const chargedPowerNotification = new Gio.Notification();
chargedPowerNotification.set_title("Battery full");
chargedPowerNotification.set_body("You can unplug the cable");

Battery.connect("notify::percent", () => {
  if (Battery.charged === true) {
    App.send_notification(null, chargedPowerNotification);
  } else if (Battery.percent === 15 && Battery.charging === false) {
    App.send_notification(null, lowPowerNotification);
  } else if (Battery.percent === 5 && Battery.charging === false) {
    App.send_notification(null, criticalPowerNotification);
  } else {
    return;
  }
});

// Apply css
const applyScss = () => {
  // Compile scss
  Utils.exec(
    `sassc ${App.configDir}/scss/main.scss ${App.configDir}/style.css`,
  );
  console.log("Scss compiled");

  // Apply compiled css
  App.resetCss();
  App.applyCss(`${App.configDir}/style.css`);
  console.log("Compiled css applied");
};

// Apply css then check for changes
applyScss();

// Check for any changes
DirectoryMonitor.recursiveDirectoryMonitor(`${App.configDir}/scss`);
DirectoryMonitor.connect("changed", applyScss);

// Main config
export default {
  style: `${App.configDir}/style.css`,
  closeWindowDelay: {
    controlPanel: 150,
    launcher: 150,
    terminal: 150,
  },
  windows: [Bar(), ControlPanel(), launcher, Popups() /*Terminal()*/],
};

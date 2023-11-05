import { Utils, Widget, Service, Hyprland } from '../imports.js';
const { Box, Label } = Widget;

function checkEmpty(str) {
  if (str !== "") {
    return str;
  }
  return "Empty";
}

function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  } else {
    return str;
  }
}

export const ClientTitle = () => Label({
    className: 'clientTitle',
    connections: [[Hyprland, label => {
        label.label = `󰖲 \u{2009}${checkEmpty(truncateString(Hyprland.active.client.title, 16))}`
    }]],
});

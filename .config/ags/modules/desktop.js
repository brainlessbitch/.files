import { Widget } from '../imports.js';
const { Box, Label, Window, EventBox } = Widget;

const Menu = () => EventBox({
    onSecondaryClick: (_, event) => Widget.Menu({
        className: 'desktopMenu',
        children: [
            Widget.MenuItem({
                className: 'desktopMenuItem',
                child: Label('New'),
                onActivate: 'sh -c "$HOME/.config/ags/scripts/open_window `slurp -d -c 999999 -w 2`"',
            }),
            Widget.MenuItem({
                className: 'desktopMenuItem',
                child: Label('Resize'),
                onActivate: 'sh -c "$HOME/.config/ags/scripts/move_window `slurp -d -c 999999 -w 2`"',
            }),
            Widget.MenuItem({
                className: 'desktopMenuItem',
                child: Label('Move'),
                onActivate: 'hyprctl dispatch submap move'
            }),
            Widget.MenuItem({
                className: 'desktopMenuItem',
                child: Label('Delete'),
                onActivate: 'hyprctl kill',
            }),
        ],
    }).popup_at_pointer(event),
});

export const DesktopMenu = ({ monitor } = {}) => Window({
    name: 'desktop',
    anchor: ["top", "bottom", "left", "right"],
    layer: "bottom",
    monitor,
    child: Menu(),
});

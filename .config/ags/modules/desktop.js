import { Widget, Utils } from '../imports.js';

function ItemWithIcon(Icon, ItemLabel, onClick) {
    return Widget.MenuItem({
        className: 'desktopMenuItem',
        child: Widget.Box({
            css: `
                font-size: 1rem;
                margin: 0 0.5rem;
            `,
            children: [
                Widget.Label({
                    css: `
                        font-family: SymbolsNerdFontMono;
                        font-size: 12px;
                        margin: 0 0.5rem 0 0;
                    `,
                    label: Icon,
                }),
                Widget.Label(ItemLabel),
            ],
        }),
        onActivate: () => Utils.exec(onClick),
    })
}

const PowerMenu = () => Widget.Menu({
    className: 'desktopMenu',
    children: [
        ItemWithIcon('󰍁', 'Lock', 'gtklock'),
        ItemWithIcon('󰍃', 'Log Out', 'pkill Hyprland'),
        ItemWithIcon('', 'Suspend', 'systemctl suspend'),
        ItemWithIcon('󰜉', 'Reboot', 'systemctl reboot'),
        ItemWithIcon('󰐥', 'Shutdown', 'systemctl poweroff' )
    ],
})


const Menu = () => Widget.EventBox({
    onSecondaryClick: (_, event) => Widget.Menu({
        className: 'desktopMenu',
        children: [
            ItemWithIcon(
                '',
                'Terminal',
                'sh -c "$HOME/.config/ags/scripts/open_window `slurp -d -c 999999 -w 2`"'
            ),
            ItemWithIcon(
                '󰙖',
                'Resize',
                'sh -c "$HOME/.config/ags/scripts/move_window `slurp -d -c 999999 -w 2`"',
            ),
            ItemWithIcon(
                '󰆾',
                'Move',
                'hyprctl dispatch submap move'
            ),
            ItemWithIcon(
                '󰅖',
                'Delete',
                'hyprctl kill'
            ),
            Widget.MenuItem({
                className: 'desktopMenuItem',
                child: Widget.Box({
                    css: `
                        font-size: 1rem;
                        margin: 0 0.5rem;
                    `,
                    children: [
                        Widget.Label({
                            css: `
                                font-family: SymbolsNerdFontMono;
                                font-size: 12px;
                                margin: 0 0.5rem 0 0;
                            `,
                            label: '󰐥',
                        }),
                        Widget.Label('Powermenu'),
                    ],
                }),
                submenu: PowerMenu(),
            }),
        ],
    }).popup_at_pointer(event),
});

export const DesktopMenu = ({ monitor } = {}) => Widget.Window({
    name: 'desktop',
    anchor: ["top", "bottom", "left", "right"],
    layer: "bottom",
    monitor,
    child: Menu(),
});

import { Widget, Utils, Hyprland, Applications, App } from '../imports.js';
import DockIcon from '../utils/appIcon.js';
import PopupWindow from '../utils/popupWindow.js';

const pins = ['nemo', 'foot', 'firefox', 'spotify'];

let tasks = [];
Hyprland.connect('changed', function() {
    return tasks = Hyprland.clients.map(client => {
        for (const appName of pins) {
            if (client.class.toLowerCase().includes(appName.toLowerCase()))
                return appName;
        }
        for (const app of Applications.list) {
            if (client.title && app.match(client.title) ||
                client.class && app.match(client.class)) {
                return app.name
            }
        }
    }).filter(appName => appName !== null);
});

function queryExact(appName) {
    return Applications.list.filter(app =>
        app.name.toLowerCase() === appName.toLowerCase()
    )[0] ?? Applications.query(appName)[0]
}

//Hyprland.connect('notify::clients', function(){return console.log()})

function focus(appName) {
    if (tasks.includes(appName)) {
        Utils.execAsync(`hyprctl dispatch focuswindow ${appName}`);
    } else {
        Utils.execAsync(`gtk-launch ${queryExact(appName).desktop}`);
    }
}

function numOpen(appName) {
    return tasks.filter(i => i === appName).map(() => {
        const callback = box => {
            return box.css = `
                min-width: ${24 / tasks.filter(i => i === appName).length}px;
                min-height: 2px;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 6px;
                margin: 0 1px;
            `;
        };
        return Widget.Box({
            connections: ['client-added', 'client-removed'].map(signal => [
                Hyprland, callback, signal
            ]),
        });
    });
}

const DockPins = () => Widget.Box({
    className: 'dockIcons',
    children: pins.map(appName => {
        return Widget.Overlay({
            child: DockIcon({
                className: 'dockIcon',
                onClicked: () => focus(appName),
                appName: appName,
                tooltipText: appName,
            }),
            overlays: [
                Widget.Box({
                    vpack: 'end',
                    hpack: 'center',
                    connections: [
                        [Hyprland, box => {
                            box.visible = tasks.filter(i => pins.includes(i)).includes(appName);
                            box.children = numOpen(appName);
                        }]
                    ],
                }),
            ],
        });
    }),
});

const DockTasks = () => Widget.Box({
    className: 'dockIcons',
    connections: [
        [Hyprland, box => {
            box.children = [...(new Set(tasks.filter(i => !pins.includes(i))))].map(appName => (
                Widget.Overlay({
                    child: DockIcon({
                        className: 'dockIcon',
                        onClicked: () => focus(appName),
                        appName: appName,
                        tooltipText: appName,
                    }),
                    overlays: [
                        Widget.Box({
                            vpack: 'end',
                            hpack: 'center',
                            children: tasks.filter(i => i === appName).length > 1 ? numOpen(appName) : []
                        })
                    ]
                })
            ));
            box.className = tasks.filter(i => !pins.includes(i)).length > 0 ? 'dockIcons' : '';
        }]
    ],
});

const toggleDock = () => {
    const clientsOnWorkspace = Hyprland.clients.filter(client => client.workspace.id === Hyprland.active.workspace.id);
    if (clientsOnWorkspace.some(client => client.floating === false)) {
        App.closeWindow('dock');
    } else {
        App.openWindow('dock');
    }
};

Hyprland.connect('changed', toggleDock);

const Separator = () => Widget.Box({
    css: `
        min-width: 2px;
        min-height: 24px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 6px;
    `,
    vpack: 'center',
    hpack: 'center',
    connections: [
        [Hyprland, box => {
            box.visible = tasks.filter(i => !pins.includes(i)).length > 0;
        }]
    ],
});

export const Dock = () => PopupWindow({
    name: 'dock',
    className: 'dock',
    anchor: ['bottom'],
    layer: 'bottom',
    margins: [0, 0, 6, 0],
    transition: 'slide_up',
    child: Widget.Box({
        children: [
            DockPins(),
            Separator(),
            DockTasks(),
        ],
    }),
});

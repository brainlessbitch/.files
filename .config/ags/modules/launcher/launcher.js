import { Widget, App, Applications, Utils } from '../../imports.js';
import PopupWindow from '../../utils/popupWindow.js';
import Gdk from 'gi://Gdk';

function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  } else {
    return str;
  }
}

const WINDOW_NAME = 'launcher';

const AppItem = app => Widget.Button({
    className: 'launcherApp',
    onClicked: () => {
        App.closeWindow(WINDOW_NAME);
        app.launch();
    },
    setup: self => self.app = app,
    child: Widget.Box({
        children: [
            Widget.Icon({
                className: 'launcherItemIcon',
                icon: app.icon_name || '',
                size: 24,
            }),
            Widget.Box({
                className: 'launcherItem',
                vertical: true,
                vpack: 'center',
                children: [
                    Widget.Label({
                        className: 'launcherItemTitle',
                        label: app.name,
                        xalign: 0,
                        vpack: 'center',
                        truncate: 'end',
                    }),
                    !!app.description && Widget.Label({
                        className: 'launcherItemDescription',
                        label: truncateString(app.description, 75) || '',
                        wrap: true,
                        xalign: 0,
                        justification: 'left',
                        vpack: 'center',
                    }),
                ],
            }),
        ],
    }),
});

const Launcher = () => {
    const list = Widget.Box({ vertical: true });

    const entry = Widget.Entry({
        className: 'launcherEntry',
        hexpand: true,
        text: '-',
        onAccept: ({ text }) => {
            const isCommand = text.startsWith('>');
            const list = Applications.query(text || '');
            if (isCommand === true) {
                App.toggleWindow(WINDOW_NAME);
                Utils.execAsync(text.slice(1))
            } else if (list[0]) {
                App.toggleWindow(WINDOW_NAME);
               list[0].launch();
            }
        },
        onChange: ({ text }) => list.children.map(item => {
            item.visible = item.app.match(text);
        }),
    });

    return Widget.Box({
        className: 'launcher',
        vertical: true,
        children: [
            entry,
            Widget.Scrollable({
                hscroll: 'never',
                css: `
                    min-width: 250px;
                    min-height: ${Gdk.Screen.get_default().get_height() - 24}px;
                `,
                child: list,
            }),
        ],
        connections: [[App, (_, name, visible) => {
            if (name !== WINDOW_NAME)
                return;

            list.children = Applications.list.map(AppItem);

            entry.text = '';
            if (visible)
                entry.grab_focus();
        }]],
    });
};

export const launcher = PopupWindow({
    name: WINDOW_NAME,
    anchor: ['left'],
    exclusive: false,
    transition: 'slide_right',
    popup: true,
    visible: false,
    focusable: true,
    child: Launcher()
});

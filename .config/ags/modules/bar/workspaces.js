import { Utils, Widget, Service, Hyprland } from '../../imports.js';
const { execAsync } = Utils;
const { Box, Button, Label } = Widget;

export const Workspaces = () => Widget.Box({
    className: 'workspaces',
    child: Widget.Box({
        children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.Button({
            properties: [['index', i]],
            onClicked: () => Utils.execAsync([
                'hyprctl',
                'dispatch',
                'workspace',
                `${i}`,
            ]).catch(console.error),
            onSecondaryClick: () => Utils.execAsync([
                'hyprctl',
                'dispatch',
                'movetoworkspacesilent',
                `${i}`,
            ]).catch(console.error),
        })),
        connections: [[Hyprland, box => box.children.forEach(btn => {
            btn.className = btn._index === Hyprland.active.workspace.id ? 'focused' : '';
            //btn.style = `min-width: ${5/Hyprland.workspaces.length}rem`;
            btn.visible = Hyprland.workspaces.some(ws => ws.id === btn._index);
        })]],
    }),
});

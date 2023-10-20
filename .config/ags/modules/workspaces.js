import { Utils, Widget, Service } from '../imports.js';
const { execAsync } = Utils;
const { Box, Button } = Widget;
const { Hyprland } = Service;

export const Workspaces = () => {
    const workspacesHolder = Box({
        className: 'workspaces',
        vertical: true,
        child: Box({
            vertical: true,
            connections: [[ Hyprland, (widget) => {
                const workspaces = Hyprland.workspaces;
                const childrenList = [];
                const currentWorkspace = Hyprland.active.workspace;
                workspaces.forEach((ws) => {
                    const btn = Button({
                        className: ws.id === currentWorkspace.id ? "focused" : "",
                        style: `min-height: ${100/workspaces.length}px`,
                        //style: `min-width: ${100/workspaces.reduce((max, item) => (item.id > max ? item.id : max), 0)}px`,
                        label: ws.id.toString(),
                        onClicked: () =>
                            execAsync([
                                "hyprctl",
                                "dispatch",
                                "workspace",
                                ws.id.toString(),
                            ]),
                    });
                    childrenList.push(btn);
                }),
                childrenList.sort((a, b) => parseInt(a.label) - parseInt(b.label));
                widget.children = childrenList;
            }, "changed" ]],
        }),
    });
    return workspacesHolder;
};

export const Workspaces2 = () => Widget.Box({
    className: 'workspaces',
    vertical: true,
    child: Widget.Box({
        vertical: true,
        children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.Button({
            properties: [['index', i]],
            label: `${i}`,
            onClicked: () => Utils.execAsync([
                'hyprctl',
                'dispatch',
                'workspace',
                `${i}`,
            ]),
        })),
        connections: [[Hyprland, box => box.children.forEach(btn => {
            btn.className = btn._index === Hyprland.active.workspace.id ? 'focused' : '';
            btn.style = `min-height: ${100/Hyprland.workspaces.length}px`;
            btn.visible = Hyprland.workspaces.some(ws => ws.id === btn._index);
        })]],
    }),
});

const Hyprland = await Service.import("hyprland");

export const Workspaces = () =>
  Widget.Box({
    className: "workspaces",
    child: Widget.Box({
      children: Array.from({ length: 10 }, (_, i) => i + 1).map((i) =>
        Widget.Button({
          cursor: "pointer",
          attribute: { index: i },
          onClicked: () =>
            Utils.execAsync(["hyprctl", "dispatch", "workspace", `${i}`]).catch(
              console.error,
            ),
          onSecondaryClick: () =>
            Utils.execAsync([
              "hyprctl",
              "dispatch",
              "movetoworkspacesilent",
              `${i}`,
            ]).catch(console.error),
        }),
      ),
      setup: (self) => {
        self.hook(Hyprland, (self) =>
          self.children.forEach((btn) => {
            btn.className =
              btn.attribute.index === Hyprland.active.workspace.id
                ? "focused"
                : "";
            btn.visible = Hyprland.workspaces.some(
              (ws) => ws.id === btn.attribute.index,
            );
            /*btn.label =
								btn._index === Hyprland.active.workspace.id ? "󰣐" : "󱢠";*/
          }),
        );
      },
    }),
  });

const { GLib } = imports.gi;

import { Powermenu } from "./powermenu.js";

export const UserInfo = () =>
  Widget.Box({
    className: "userInfo",
    children: [
      Widget.Box({
        className: "pfp",
        css: `background-image: url('${GLib.get_home_dir()}/pfp.png');`,
      }),
      Widget.Box({
        vertical: true,
        vpack: "center",
        children: [
          Widget.Label({
            className: "username",
            label: `${GLib.get_user_name()}`,
          }),
          /*Widget.Label({
						className: "hostname",
						label: `@${GLib.get_host_name()}`,
					}),*/
        ],
      }),
      Powermenu(),
    ],
  });

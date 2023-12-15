import { Widget, Utils, App, Mpris } from "../../imports.js";
const { Box, EventBox, Label, MenuItem } = Widget;
import { ApplicationsMenu } from "./applicationsMenu.js";

function ItemWithIcon(icon, itemLabel, onClick) {
	return MenuItem({
		className: "desktopMenuItem",
		child: Box({
			children: [
				Label({
					className: "desktopMenuItemIcon",
					label: icon,
				}),
				Label(itemLabel),
			],
		}),
		onActivate: onClick,
	});
}

const Separator = () =>
	MenuItem({
		child: Box({
			className: "separator",
			css: `
            min-height: 1px;
            margin: 3px 6px;
        `,
		}),
	});

function ItemWithIconAndSubmenu(icon, itemLabel, submenu) {
	return MenuItem({
		className: "desktopMenuItem",
		child: Box({
			children: [
				Label({
					className: "desktopMenuItemIcon",
					label: icon,
				}),
				Label({
					hpack: "start",
					hexpand: true,
					label: itemLabel,
				}),
				Label({
					className: "desktopMenuItemSubmenuArrow",
					label: ">",
					justification: "right",
				}),
			],
		}),
		submenu: submenu,
	});
}

const rioMenu = () => {
	return [
		ItemWithIcon("󰆍", "Terminal", () =>
			Utils.exec(
				'sh -c "$HOME/.config/ags/scripts/open_window `slurp -d -c 999999 -w 2` foot"',
			),
		),
		ItemWithIcon("󰘖", "Resize", () =>
			Utils.exec(
				'sh -c "$HOME/.config/ags/scripts/move_window `slurp -d -c 999999 -w 2`"',
			),
		),
		ItemWithIcon("󰁁", "Move", () => Utils.exec("hyprctl dispatch submap move")),
		ItemWithIcon("󰅖", "Delete", () => Utils.exec("hyprctl kill")),
		Separator(),
	];
};

const Powermenu = () => {
	return ItemWithIconAndSubmenu(
		"󰐥",
		"Powermenu",
		Widget.Menu({
			className: "desktopMenu",
			children: [
				ItemWithIcon("󰍁", "Lock", () => Utils.exec("gtklock")),
				ItemWithIcon("󰍃", "Log Out", () => Utils.exec("pkill Hyprland")),
				ItemWithIcon("󰖔", "Suspend", () => Utils.exec("systemctl suspend")),
				ItemWithIcon("󰜉", "Reboot", () => Utils.exec("systemctl reboot")),
				ItemWithIcon("󰐥", "Shutdown", () => Utils.exec("systemctl poweroff")),
			],
		}),
	);
};

export const DesktopMenu = () =>
	EventBox({
		onSecondaryClick: (_, event) =>
			Widget.Menu({
				className: "desktopMenu",
				children: [
					...rioMenu(),
					ItemWithIcon("󰈊", "Colorpicker", () =>
						Utils.execAsync(["hyprpicker", "-a"]),
					),
					ItemWithIconAndSubmenu("󰘔", "Applications", ApplicationsMenu()),
					Separator(),
					...(() => {
						return Mpris.players[0]
							? [
									ItemWithIcon("󰝚", "Music", () => App.toggleWindow("music")),
									Separator(),
							  ]
							: [];
					})(),
					Powermenu(),
				],
			}).popup_at_pointer(event),
	});

import { Widget, Utils, App, Applications, Hyprland } from "../../imports.js";
const { Box, EventBox, Label, MenuItem } = Widget;

function ItemWithIcon(app) {
	return MenuItem({
		className: "desktopMenuItem",
		child: Box({
			children: [
				Widget.Icon({
					className: "desktopMenuItemIcon",
					icon: Applications.query(app)[0].iconName,
				}),
				Label(app),
			],
		}),
		onActivate: () =>
			Hyprland.sendMessage(
				`dispatch exec gtk-launch ${Applications.query(app)[0].desktop}`,
			),
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

function ItemWithSubmenu(itemLabel, submenu) {
	return MenuItem({
		className: "desktopMenuItem",
		child: Box({
			children: [
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

const MainCategories = [
	"AudioVideo",
	"Audio",
	"Video",
	"Development",
	"Education",
	"Game",
	"Graphics",
	"Network",
	"Office",
	"Science",
	"Settings",
	"System",
	"Utility",
];

const apps = [];
const otherApps = [];

Applications.list.forEach((app) => {
	const matchedCategory = app.app
		.get_categories()
		.split(";")
		.filter((category) => MainCategories.includes(category));
	matchedCategory.length > 0
		? apps.push([app.name, ...matchedCategory])
		: otherApps.push(app.name);
});

const organizedApps = {};

apps.sort().forEach((app) => {
	!organizedApps[app[1]] ? (organizedApps[app[1]] = []) : null;

	organizedApps[app[1]].push(app[0]);
});

export const ApplicationsMenu = () =>
	Widget.Menu({
		className: "desktopMenu",
		children: (() => {
			const children = [];

			Object.keys(organizedApps)
				.sort()
				.forEach((key) => {
					children.push(
						ItemWithSubmenu(
							`${key}`,
							Widget.Menu({
								className: "desktopMenu",
								children: (() => {
									const children = [];

									organizedApps[key].forEach((app) => {
										children.push(ItemWithIcon(app));
									});

									return children;
								})(),
							}),
						),
					);
				});

			otherApps.length > 0
				? children.push(
						Separator(),
						ItemWithSubmenu(
							"Other",
							Widget.Menu({
								className: "desktopMenu",
								children: (() => {
									const children = [];

									otherApps.forEach((app) => {
										children.push(ItemWithIcon(app));
									});

									return children;
								})(),
							}),
						),
				  )
				: null;

			return children;
		})(),
	});

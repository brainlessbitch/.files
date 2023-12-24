import { Widget, Utils, App, Notifications } from "../../imports.js";
const { lookUpIcon, timeout } = Utils;

const NotificationIcon = ({ appEntry, appIcon, image }) => {
	if (image) {
		return Widget.Box({
			vpack: "start",
			hexpand: false,
			className: "notificationIcon",
			css: `
        background-image: url("${image}");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        min-width: 24px;
        min-height: 24px;
      `,
		});
	}

	let icon = "dialog-information-symbolic";
	if (lookUpIcon(appIcon)) icon = appIcon;

	if (lookUpIcon(appEntry)) icon = appEntry;

	return Widget.Box({
		vpack: "start",
		hexpand: false,
		className: "notificationIcon",
		css: `
      min-width: 24px;
      min-height: 24px;
    `,
		children: [
			Widget.Icon({
				icon,
				size: 24,
				hpack: "center",
				hexpand: true,
				vpack: "center",
				vexpand: true,
			}),
		],
	});
};

const NotificationTitle = (n) =>
	Widget.Label({
		className: "notificationTitle",
		xalign: 0,
		justification: "left",
		hexpand: true,
		maxWidthChars: 24,
		label: n.summary,
		useMarkup: true,
	});

const NotificationBody = (n) =>
	Widget.Label({
		className: `notificationBody ${n.urgency === "critical" ? "critical" : ""}`,
		hexpand: true,
		useMarkup: true,
		xalign: 0,
		justification: "left",
		label: n.body,
		wrap: true,
	});

const Notification = (n) =>
	Widget.Box({
		css: `padding: 6px 0;
          min-height: 1px;
          min-width: 1px;`,
		children: [
			Widget.Revealer({
				transition: "slide_down",
				setup: (self) => {
					timeout(1, () => {
						self.reveal_child = true;
					});
				},
				child: Widget.EventBox({
					className: `notification ${
						n.urgency === "critical" ? "critical" : ""
					}`,
					onPrimaryClick: () => n.dismiss(),
					properties: [["hovered", false]],
					onHover: (self) => {
						if (self._hovered) return;

						timeout(300, () => (self._hovered = true));
					},
					onHoverLost: (self) => {
						if (!self._hovered) return;

						self._hovered = false;
						n.dismiss();
					},
					vexpand: false,
					child: Widget.Box({
						vertical: true,
						children: [
							Widget.Box({
								children: [
									NotificationIcon(n),
									Widget.Box({
										hexpand: true,
										vertical: true,
										children: [NotificationTitle(n), NotificationBody(n)],
									}),
								],
							}),
							/*Widget.Box({
					className: "actions",
					children: n.actions.map(({ id, label }) =>
						Widget.Button({
							className: "action-button",
							onClicked: () => n.invoke(id),
							hexpand: true,
							child: Widget.Label(label),
						}),
					),
				}),*/
						],
					}),
				}),
			}),
		],
		connections: [
			[
				Notifications,
				(self) => {
					timeout(10000, () => {
						self.children[0].reveal_child = false;
						timeout(250, () => {
							self.destroy();
						});
					});
				},
				"dismissed",
			],
		],
	});

export const NotificationPopups = () =>
	Widget.Window({
		name: "notifications",
		anchor: ["top", "right"],
		layer: "overlay",
		margins: [0],
		child: Widget.Box({
			className: "notifications",
			css: "margin: 6px;",
			vertical: true,
			connections: [
				[
					Notifications,
					(self, id) => {
						if (!Notifications.getNotification(id)) return;

						self.add(Notification(Notifications.getNotification(id)));
						self.show_all();
					},
					"notified",
				],
			],
		}),
	});

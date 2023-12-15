import { Widget, Applications, Utils } from "../../imports.js";
const { Box } = Widget;
import DesktopIcon from "../../utils/appIcon.js";

function queryExact(appName) {
	return (
		Applications.list.filter(
			(app) => app.name.toLowerCase() === appName.toLowerCase(),
		)[0] ?? Applications.query(appName)[0]
	);
}

const StardewVally = () =>
	Widget.Button({
		className: "desktopIcon",
		cursor: "pointer",
		onClicked: () => queryExact("stardew valley").launch(),
		child: Box({
			vertical: true,
			children: [
				Widget.Icon({
					icon: queryExact("stardew valley").iconName,
					size: 48,
				}),
				Widget.Label({
					className: "desktopIconLabel",
					label: "Stardew Valley",
				}),
			],
		}),
	});

const Komikku = () =>
	Widget.Button({
		className: "desktopIcon",
		cursor: "pointer",
		onClicked: () => queryExact("komikku").launch(),
		child: Box({
			vertical: true,
			children: [
				Widget.Icon({
					icon: queryExact("komikku").iconName,
					size: 48,
				}),
				Widget.Label({
					className: "desktopIconLabel",
					label: "コミック",
				}),
			],
		}),
	});

export const DesktopIcons = () =>
	Box({
		className: "desktopIcons",
		vertical: true,
		hpack: "start",
		vpack: "start",
		children: [StardewVally(), Komikku()],
	});

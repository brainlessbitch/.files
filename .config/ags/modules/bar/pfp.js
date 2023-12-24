import { Widget } from "../../imports.js";
const { Box, Icon } = Widget;
const { GLib } = imports.gi;

export const pfp = () =>
	Box({
		className: "pfp",
		css: `background-image: url('${GLib.get_home_dir()}/pfp.png');`,
	});

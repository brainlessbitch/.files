import { Widget, Utils, App } from "../../imports.js";
const { Button, Label } = Widget;

export const HeartIcon = () =>
	Button({
		className: "icon",
		cursor: "pointer",
		child: Label("󰣐"),
		onClicked: () => App.toggleWindow("launcher"),
		setup: (self) => {
			self.hook(
				App,
				(self, windowName, visible) => {
					windowName === "launcher" && (self.child.label = visible ? "󰩖" : "󰣐");
				},
				"window-toggled",
			);
		},
	});

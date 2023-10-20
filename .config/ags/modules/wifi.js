import Network from 'resource:///com/github/Aylur/ags/service/audio.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
const { Box, Stack, Icon, Slider, Revealer, EventBox, Label } = Widget;

const WifiIcon = () => Label({
    className: 'wifiIcon',
    style: 'font-size: 16px;',
    label: '󰤨\u{2009}'
});


const WifiName = () => Revealer({
  transition: 'slide_right',
  revealChild: false,
  child: Label({
    className: 'wifiName',
    hexpand: true,
    connections: [[ Network, label => {
            label.label = Network.wifi?.ssid || '';
    }]],
  }),
});

const wifiName = WifiName();

const Wifi = () => Box({
    className: 'wifi',
    child: EventBox({
        onHover: () => wifiName.revealChild = true,
        onHoverLost: (widget, event) => {
        const [_, x, y] = event.get_coords()
        const w = widget.get_allocation().width;
        const h = widget.get_allocation().height;
        if (x < 0 || x > w || y < 0 || y > h) { wifiName.revealChild = false }
        },
        child: Box({
            children: [
                WifiIcon(),
                wifiName
            ]
        }),
    }),
});

export default Wifi;

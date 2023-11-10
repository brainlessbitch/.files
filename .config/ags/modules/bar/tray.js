import SystemTray from 'resource:///com/github/Aylur/ags/service/systemtray.js';
import { execAsync } from 'resource:///com/github/Aylur/ags/utils.js';
import { Box, Button, EventBox, Icon, Label, Revealer } from 'resource:///com/github/Aylur/ags/widget.js';

const RevIcon = () => Label({
    className: "tray",
    label: "❮",
})

const TrayRev = () => Revealer({
  transition: 'slide_left',
  revealChild: false,
  child: Box({
    connections: [[SystemTray, box => {
      box.className = 'tray'
      box.children = SystemTray.items.map(item => Button({
        child: Icon({ binds: [['icon', item, 'icon']] }),
        onPrimaryClick: (_, event) => item.activate(event),
        //onSecondaryClick: (_, event) => item.openMenu(event),
        binds: [['tooltip-markup', item, 'tooltip-markup']],
      }));
    }]],
  }),
});



const trayRev = TrayRev();

const Tray = () => EventBox({
    onPrimaryClick: (box) => {
        trayRev.revealChild = !trayRev.revealChild;
        box.child.children[0].label = trayRev.revealChild ? '❯' : '❮' ;
    },
    //onHover: () => trayRev.revealChild = true,
    //onHoverLost: () => trayRev.revealChild = false,
    child: Box({
      children: [
        RevIcon(),
        trayRev,
      ]
    }),
});

export default Tray;

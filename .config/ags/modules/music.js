import { App, Widget, Service } from '../imports.js';
const { Mpris, Audio } = Service;
const { Box, Button, Stack, Icon, Slider, Revealer, EventBox, Label } = Widget;

export const MusicWidget = () => {
  return Button({
    className: 'icon',
    onClicked: () => App.toggleWindow('music'),
    child: Widget.Label({
      valign: 'center',
      className: '',
      connections: [[Mpris, label => {
        const mpris = Mpris.getPlayer('');
        label.label = `${mpris !== null && mpris.playBackStatus == 'Playing' ? '▶' : '⏸'}`;
      }]],
    }),

  })
}
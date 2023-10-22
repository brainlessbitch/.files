import { App, Widget, Service } from '../../imports.js';
const { Mpris } = Service;
const { Window } = Widget;
const { Box, Button, Stack, Icon, Slider, Revealer, EventBox, Label } = Widget;

const MusicContent = () => Widget.Box({
    vertical: true,
    className: 'icon',
    children: [
        Box({
            className: 'musicCoverBackground',
            connections: [[
                Mpris, (self) => {
                    self.style = `background-image: url('${Mpris.getPlayer('')?._coverPath}');`;
                }
            ]]
        }),
        Widget.Scrollable({
            hexpand: true,
            hscroll: 'always',
            vscroll: 'never',
            child: Label({
                className: 'musicText',
                label: 'Music',
                connections: [[Mpris, label => {
                    const mpris = Mpris.getPlayer('');
                    if (mpris)
                        label.label = `${mpris.trackTitle}`;
                    else
                        label.label = 'No mewwsic';
                }]],
            }),
        }),
        Widget.Scrollable({
            hexpand: true,
            hscroll: 'always',
            vscroll: 'never',
            child: Label({
                className: 'musicText',
                label: 'Music',
                connections: [[Mpris, label => {
                    const mpris = Mpris.getPlayer('');
                    if (mpris)
                        label.label = `${mpris.trackArtists.join(', ')}`;
                    else
                        label.label = 'idk artist';
                }]],
            }),
        }),
        Box({
            halign: 'center',
            children: [
                Button({
                    className: 'musicIcon',
                    label: '⏮',
                    onClicked: () => Mpris.getPlayer('')?.previous(),
                }),
                Button({
                    className: 'musicIcon',
                    label: '▶',
                    onClicked: () => Mpris.getPlayer('')?.playPause(),
                    connections: [[Mpris, label => {
                        const mpris = Mpris.getPlayer('');
                        label.label = `${mpris !== null && mpris.playBackStatus == 'Playing' ? '⏸' : '▶'}`;
                    }]],
                }),
                Button({
                    className: 'musicIcon',
                    label: '⏭',
                    onClicked: () => Mpris.getPlayer('')?.next(),
                }),
            ]
        })
    ]
})

export const Music = ({ monitor } = {}) => Window({
    name: 'music',
    className: 'music',
    anchor: ['bottom', 'left'],
    layer: "top",
    margin: [0, 0, 100, 0],
    popup: true,
    monitor,
    child: MusicContent(),
})

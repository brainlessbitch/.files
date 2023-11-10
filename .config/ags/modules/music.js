import { Widget, Service, Mpris } from '../imports.js';
const { Box } = Widget;

const playPause = () => Widget.Overlay({
    child: Widget.CircularProgress({
        className: 'songProgress',
        rounded: true,
        connections: [
            [1000, value => {
                const mpris = Mpris.getPlayer('');
                value.value = mpris !== null && mpris.position / mpris.length;
            }]
        ]
    }),
    overlays: [
        Widget.Label({
            style: 'margin: 0 0 0 1px;',
            connections: [
                [Mpris, label => {
                    const mpris = Mpris.getPlayer('');
                    label.label = `${mpris !== null && mpris.playBackStatus == 'Playing' ? '󰐊' : '󰏤'}`;
                }]
            ],
        }),
    ]
})

function truncateString(str, maxLength) {
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
}

const songTitle = () => Widget.Label({
    className: 'songTitle',
    connections: [
        [Mpris, label => {
            const mpris = Mpris.getPlayer('');
            if (mpris)
                label.label = `${truncateString(mpris.trackTitle, 20)}`;
            else
                label.label = 'No mewwsic';
        }]
    ]
})

export const MusicWidget = () => {
    return Widget.Revealer({
        revealChild: false,
        transitionDuration: 500,
        transition: 'slide_left',
        child: Box({
            className: 'music',
            children: [
                playPause(),
                songTitle(),
            ],
        }),
        connections: [
            [Mpris, rev => {
                const mpris = Mpris.getPlayer('');
                rev.revealChild = !!mpris;
            }]
        ],
    })
}

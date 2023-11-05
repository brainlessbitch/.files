import { Widget, Utils } from '../imports.js';
const { exec, execAsync } = Utils;
const { Label, Box } = Widget;

const ClockIcon = () => Label({
    className: 'clockIcon',
    label: '󰥔',
})

const Time = () => Label({
    connections: [
        [1000, label => label.label = exec('date "+%I:%M"')],

        [1000, label => execAsync(['date', '+%I:%M'])
            .then(date => label.label = date).catch(console.error)]
    ],
});

export const Clock = () => Box({
    className: 'clock',
    children: [
        ClockIcon(),
        Time(),
    ],
});

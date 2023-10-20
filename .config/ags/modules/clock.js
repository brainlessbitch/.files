import { Widget, Utils } from '../imports.js';
const { exec, execAsync } = Utils;
const { Label, Box } = Widget;

const Time = () => Label({
    connections: [
        [1000, label => label.label = exec('date "+%I%n%M"')],

        [1000, label => execAsync(['date', '+%I%n%M'])
            .then(date => label.label = date).catch(console.error)],
    ],
});

export const Clock = () => Box({
    className: 'clock',
    vertical: true,
    children: [
        Time(),
    ],
});

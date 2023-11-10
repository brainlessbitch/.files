import { Widget, Utils } from '../../imports.js';
const { exec, execAsync } = Utils;
const { Label, Box } = Widget;

const ClockIcon = () => Label({
    className: 'clockIcon',
    label: '󰥔',
})

const Date = () => Label({
    className: 'dateLabel',
    connections: [
        [1000, label => label.label = exec('date "+%b %d"')],

        [1000, label => execAsync(['date', '+%b %d'])
            .then(date => label.label = date).catch(console.error)]
    ]
})

const Time = () => Label({
    className: 'timeLabel',
    connections: [
        [1000, label => label.label = exec('date "+%I:%M"')],

        [1000, label => execAsync(['date', '+%I:%M'])
            .then(time => label.label = time).catch(console.error)]
    ],
});

export const Clock = () => Box({
    className: 'clock',
    children: [
        Date(),
        Time(),
    ],
});

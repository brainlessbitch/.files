import { Battery } from '../imports.js';
import { execAsync } from 'resource:///com/github/Aylur/ags/utils.js';
import { Widget, Utils } from '../imports.js';
const {
    Box,
    Label,
    ProgressBar,
    Overlay
} = Widget;

const PercentBar = () => ProgressBar({
    className: 'batBar',
    vertical: true,
    inverted: true,
    connections: [[Battery, progressBar => {
        if (Battery.percent < 0)
            return;
        progressBar.value = Battery.percent/100
        if (Battery.percent < 10) {
            progressBar.className = 'batBar low'
        } else if (Battery.percent < 30) {
            progressBar.className = 'batBar med'
        } else {
            progressBar.className = 'batBar high'
        }
    }]]
});

const BatLabel = () => Label({
    className: 'batLabel',
    connections: [[Battery, batLabel => {
        batLabel.label = `${ Battery.charging ? '󱐋' : '' }`
    }]]
});

export const BatteryWidget = () => Box({
    className: 'battery',
    vertical: true,
    children: [
        Overlay({
            child: PercentBar(),
            overlays: [
                BatLabel(),
            ]
        }),
    ]
});

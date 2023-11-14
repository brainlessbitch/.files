import { Widget } from '../imports.js';
import { RoundedCorner } from "../utils/roundedcorner.js";

export const CornerTopleft = () => Widget.Window({
    name: 'cornertl',
    layer: 'bottom',
    anchor: ['top', 'left'],
    exclusive: false,
    visible: true,
    child: RoundedCorner('topleft', { className: 'corner', }),
});

export const CornerTopright = () => Widget.Window({
    name: 'cornertr',
    layer: 'bottom',
    anchor: ['top', 'right'],
    exclusive: false,
    visible: true,
    child: RoundedCorner('topright', { className: 'corner', }),
});

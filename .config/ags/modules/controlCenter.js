import { Widget } from '../imports.js';
const { Box } = Widget;
import PopupWindow from '../utils/popupWindow.js';

export const ControlCenter = () => PopupWindow({
    name: 'controlCenter',
    className: 'controlCenter',
    anchor: ['bottom', 'left'],
    layer: 'overlay',
    margins: [6, 0, 6, 0],
    transition: 'slide_up',
    child: Box({
        children: []
    }),
});

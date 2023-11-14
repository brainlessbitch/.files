import { App, Widget } from '../imports.js';
const { Revealer, Box, Window } = Widget;

export default ({
    name,
    child,
    transition = 'slide_up',
    ...props
}) => {
    const window = Window({
        name,
        visible: false,
        ...props,

        child: Box({
            css: `min-height: 1px;
                  min-width: 1px;
                  padding: 1px;`,
            child: Revealer({
                transition,
                transitionDuration: 300,
                connections: [[App, (rev, currentName, visible) => {
                    if (currentName === name) {
                        rev.reveal_child = visible;
                    }
                }]],
                child: child,
            }),
        }),
    });
    window.getChild = () => child;
    return window;
};

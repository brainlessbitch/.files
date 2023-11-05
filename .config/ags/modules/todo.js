import { Widget, Utils } from '../imports.js';
const { Box } = Widget;
import PopupWindow from './misc/popupWindow.js';
import Gdk from 'gi://Gdk';

let todos = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt ante sit.',
];

const todoHeader = () => Box({
    className: 'todoHeader',
    vertical: true,
    halign: 'start',
    child: Widget.Label({
        label: 'Todo',
    })
})

const todoTasks = () => Box({
    className: 'todoTasks',
    vertical: true,
    children: todos.map(task => {
        return Widget.Label({
            className: 'todoTask',
            label: task,
            justification: 'left',
            maxWidthChars: 24,
            wrap: true,
            useMarkup: true,
        })
    })
})

export const Todo = () => PopupWindow({
    name: 'todo',
    className: 'todo',
    style: `min-height: ${Gdk.Screen.get_default().get_height() / 2}px;`,
    anchor: ['bottom', 'left'],
    layer: 'top',
    margin: [0, 0, 6, 6],
    transition: 'slide_right',
    popup: true,
    child: Box({
        vertical: true,
        children: [
            todoHeader(),
            Widget.Scrollable({
                className: 'todo',
                style: `min-height: ${Gdk.Screen.get_default().get_height() / 2}px;`,
                hscroll: 'never',
                vscroll: 'automatic',
                child: Box({
                    children: [
                        todoTasks()
                    ]
                })
            })
        ]
    })
})

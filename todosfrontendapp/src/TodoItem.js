import React from 'react';

const TodoItem = (props) =>(
    <li
        style={{
            textDecoration: props.completed ? 'line-through' : 'none'
        }}
    >{props.text}</li>
);

export default TodoItem;
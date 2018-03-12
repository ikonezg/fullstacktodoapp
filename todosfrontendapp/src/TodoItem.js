import React from 'react';

const TodoItem = (props) =>(
    <li
        style={{
            textDecoration: props.completed ? 'line-through' : 'none'
        }}
    ><span onClick={props.onToggled}>{props.text}</span> <span onClick={props.onDeleted}> X </span></li>
);

export default TodoItem;
import React from 'react';

const TodoItem = (props) =>(
    <li
        style={{
            textDecoration: props.completed ? 'line-through' : 'none'
        }}
    >{props.text} <span onClick={props.onDeleted}> X </span></li>
);

export default TodoItem;
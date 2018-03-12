import React, { Component } from 'react';

import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const APIURL ='/todos/';
class TodoList extends Component{
    state = {
        todos:[]
    }

    componentWillMount(){
        this.loadTodos();
    }

    loadTodos = () =>{
        fetch(APIURL)
        .then((res)=>{
            if(!res.ok){
                if(res.status >= 400 && res.status < 500){
                    return res.json().then(data => {
                        let err = {errorMsg: data.message};
                        throw err;
                    })
                } else {
                    let err = {errorMsg: 'Please try later !!!'}
                    throw err;
                }
                
            }
            return res.json()
        })
        .then(todos => this.setState(todos));
    }

    render(){
        const todos = this.state.todos.map(todo => (
            <TodoItem key={todo._id} {...todo} />
        ));
        // console.log(this.state);
        return(
            <div>
                <h1>Dinamo</h1>
                <TodoForm/>
                <ul>
                    {todos}
                </ul>
            </div>
        )
        
    }
        
}
export default TodoList;
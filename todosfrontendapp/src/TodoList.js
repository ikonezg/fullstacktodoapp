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

    addTodo = (val) =>{
        fetch(APIURL,{
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'

            }),
            body: JSON.stringify({
                text: val
            })
        })
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
        .then(newTodo =>{
            console.log('NewTodo',newTodo);
            let updatedTodo = this.state.todos.concat(newTodo);
            this.setState({todos: updatedTodo});
            
            
        });
       
    }

    deleteTodo = (id) =>{
        const deleteURL = APIURL + id;
        
        fetch(deleteURL,{
            method: 'delete'
            
        })
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
        .then(() =>{
            let updatedTodo = this.state.todos.filter(todo => todo._id !== id);
            this.setState({todos: updatedTodo});
            console.log(this.state);
            
        });
    }   

    toggleTodo = (todo) =>{
        const patchURL = APIURL + todo._id;
        
        fetch(patchURL,{
            method: 'PATCH',
            headers: new Headers({
                'Content-Type': 'application/json'

            }),
            body: JSON.stringify({
                completed: !todo.completed
            })
        })
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
            return res.json();
        })
        .then(newTodo =>{
            console.log('NewTodo',newTodo);
            let updatedTodo = this.state.todos.map((t)=>(
                t._id === newTodo._id ? {...t, completed: !t.completed}: t
            ));
            this.setState({todos: updatedTodo});
            
            
        });
        
    }

    render(){
        const todos = this.state.todos.map(todo => (
            <TodoItem 
                key={todo._id} 
                {...todo} 
                onDeleted={() => this.deleteTodo(todo._id)}
                onToggled={() => this.toggleTodo(todo)}
                />
        ));
        // console.log(this.state);
        return(
            <div>
                <h1>Dinamo</h1>
                <TodoForm addedTodo={this.addTodo} />
                <ul>
                    {todos}
                </ul>
            </div>
        )
        
    }
        
}
export default TodoList;
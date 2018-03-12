import React, { Component } from 'react';
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
        .then(todos => this.setState({todos}));
    }

    render(){
      
        return(
            <h1>Dinamo</h1>
        )
        
    }
        
}
export default TodoList;
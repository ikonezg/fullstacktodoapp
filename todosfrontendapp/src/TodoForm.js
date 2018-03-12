import React, { Component } from 'react';

class TodoForm extends Component{

    state = { 
        inputValue: 'Dinamo'
    }

    changeHandler = (event) =>{
        const updateInput = {
            ...this.state
        }
        updateInput.inputValue = event.target.value;

        this.setState({...updateInput});
        
    }

    submitHandler = ()=>{
        // console.log(this.state.inputValue);
        this.props.addedTodo(this.state.inputValue);
    }

    render(){
        return(
            <div>
                <input type="text" 
                    value={this.state.inputValue} 
                    onChange={(event)=>this.changeHandler(event)}
                />
                <button 
                onClick={this.submitHandler}
                >Add Todo</button>
            </div>
        );
    }
}

export default TodoForm;
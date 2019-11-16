import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            currentItemEditId: "",
            currentEditItem: "",
        }
    }

    getTodoInfo = async (e) => {
        const token = localStorage.getItem('token');
        e.preventDefault();
        try {
            let res = "";
            if (!this.state.edit){
                res = await axios.post("http://localhost:5000/todo/create/", {
                    title: e.target.todo.value,
                }, { headers: {"Authorization" : token }});
            }
            else {
                res = await axios.put(`http://localhost:5000/todo/${this.state.currentItemEditId}`, {
                    title: e.target.todo.value
                });
            }
            this.setState({ edit: false, currentItemEditId: "" });
            this.props.getAllTodos({...res.data});
        } catch (err) {
            console.log(err);
        }
    }

    editTodo = (currentTodo) => {
        this.setState({ 
            edit: true, 
            currentItemEditId: currentTodo._id,
            currentEditItem: currentTodo.title,
        });
    }

    deleteTodo = async (e) => {
        try {
            const res = await axios.delete(`http://localhost:5000/todo/${e.target.value}`);
            this.props.getAllTodos({...res.data});
        } catch (err) {
            console.log(err);
        }
    }
    
    render() {
        
        return (
            <div>
                { this.props.isLoggedIn || <Redirect to="/signin" /> }
                <h1>{ this.state.edit ? "Edit Todo" : "Create Todo" }</h1>
                <form onSubmit={e => { this.getTodoInfo(e); e.target.reset(); }}>
                    <input type="text" name="todo" placeholder="Enter todo" required />
                    { this.state.edit ? <span><button>Edit</button><button onClick={() => this.setState({edit: false}) }>Cancel</button></span> : <button>Add</button> }
                </form>
                <ol>
                    {
                       this.props.todos.map(todo => (
                           <li key={todo._id}>
                                { todo.title }&nbsp;
                                <button onClick={e => this.editTodo(todo)}>Edit</button>&nbsp;
                                <button onClick={this.deleteTodo} value={todo._id}>x</button>
                            </li>
                       )) 
                    }
                </ol>
                { this.state.edit && <p>{`Edit "${this.state.currentEditItem}" To`}</p> }
            </div>
        )
    }

}
export default Todo;
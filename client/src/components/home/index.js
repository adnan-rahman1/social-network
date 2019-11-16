import React from "react";



const Home = ({ todos }) => (
    <div>
        <h1>Welcome to Home</h1>
        <p>All Todos</p>
        <ol>
            {
                todos.map(todo => (
                    <li key={todo._id}>{ todo.title }</li>
                ))
            }
        </ol>
    </div>
);

export default Home;
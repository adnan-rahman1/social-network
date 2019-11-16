import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';


// USER DEFINED COMPONENTS
import Nav from "./components/nav";
import Home from "./components/home";
import Todo from "./components/todo";
import UserProfile from "./components/user/profile";
import SignIn from './components/signin';
import SignUp from './components/signup';
// END

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      isLoggedIn: false,
      todos: [],
      firstName: "",
      lastName: "",
      redirect: false,
    }
  }

  componentDidMount = async () => {
    let token = localStorage.getItem('token');
    if (token) {
      this.setState({ isLoggedIn: true });
    }
    else
      token = "";

    let res = await axios.get("http://localhost:5000/todo", { 
      headers: {"Authorization" : token } 
    });
    this.setState({ ...res.data });
  }


  setRedirect = () => {
    this.setState({ redirect: !this.state.redirect });
  }

  notificationMsg = (msg) => {
    this.setState({ msg });
  }

  signIn = (firstName, lastName) => {
    this.setState({ isLoggedIn: true, firstName, lastName });
  }

  signOut = () => {
    localStorage.removeItem('token');
    this.setState({ 
      isLoggedIn: false, 
      firstName: "", 
      lastName: "",
      msg: ""
    });
  }

  getAllTodos = (todos) => {
    this.setState({ ...todos });
  }

  render() {
    return (
      <BrowserRouter>
          <Nav 
            isLoggedIn={this.state.isLoggedIn} 
            signOut={this.signOut} 
            setMsg={this.notificationMsg}
          />
          <Switch>
            <Route 
              exact 
              path="/" 
              component={() => 
                <Home 
                  todos={this.state.todos}/> 
              } 
            />

            <Route 
              path="/todo" 
              component={() => 
                <Todo 
                  todos={this.state.todos} 
                  getAllTodos={this.getAllTodos} 
                  isLoggedIn={this.state.isLoggedIn} /> 
              }
            />

            <Route 
              path="/profile" 
              component={() => 
                <UserProfile 
                  isLoggedIn={this.state.isLoggedIn}
                  firstName={this.state.firstName}
                  lastName={this.state.lastName} /> 
              } 
            />

            <Route 
              path="/signup" 
              component={() => 
                <SignUp 
                  msg={this.state.msg} 
                  redirect={this.state.redirect}
                  setMsg={this.notificationMsg}
                  setRedirect={this.setRedirect}
                  isLoggedIn={this.state.isLoggedIn} />
              } 
            />

            <Route 
              path="/signin" 
              component={() => 
                <SignIn 
                  signIn={this.signIn}
                  isLoggedIn={this.state.isLoggedIn}
                  msg={this.state.msg} 
                  setMsg={this.notificationMsg}/>
              } 
            />
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

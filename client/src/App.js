import React from 'react';
import Router from './components/router';


class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    console.log("Calling from the app js...");
  }

  render() {
    return (
      <div>
        <Router />
      </div>
    )
  }
}

export default App;

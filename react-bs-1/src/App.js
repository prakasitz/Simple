import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route , Switch } from "react-router-dom";
import NotFound  from "./containers/errors/NotFound";
import Home  from "./containers/Home";
import List  from "./containers/List";
import Create  from "./containers/projects/Create";
import ViewProject  from "./containers/projects/ViewProject";

class App extends Component {
  renderRouter() {
    return (
      <Switch>
          <Route exact path="/" component={Home} /> 
          <Route exact path="/list" component={List} /> 

          <Route exact path="/create" component={Create} /> 
          <Route exact path="/view-project" component={ViewProject} /> 

          <Route component={NotFound} />
      </Switch>
    );
  }

  render() {
    return (
      <Router>
        {this.renderRouter()}
      </Router>
    );
  }
}

export default App;

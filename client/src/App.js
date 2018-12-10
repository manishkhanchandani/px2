import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Loading = () => <div>Loading...</div>;
const Search = Loadable({
  loader: () => import('./components/Search.js'),
  loading: Loading,
});

const Details = Loadable({
  loader: () => import('./components/Details.js'),
  loading: Loading,
});


const NoMatch = Loadable({
  loader: () => import('./components/NoMatch.js'),
  loading: Loading,
});

class App extends Component {
  render() {
    return (
	  <Router>
      <div className="container">
	  	<h1>Project Book Search</h1>
        <Switch>
		  <Route exact path="/" component={Search}/>
		  <Route path="/details/:id" component={Details}/>
		  <Route component={NoMatch} />
		</Switch>
      </div>
	  </Router>
    );
  }
}

export default App;

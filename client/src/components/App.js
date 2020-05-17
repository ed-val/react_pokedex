import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchUser } from '../actions';

import Landing from './Landing';
import Header from './Header';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
  static propTypes = {
  };

  componentDidMount() {
    this.props.fetchUser();
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  // IMPORTANT note, regarding react router: Router works bu checking the path
  // prop of every delcared Route component, if that path string is contained
  // within the one the user is atempting to go to, the it assumes that you want
  // to render that component. E.g. if user goes to '/surveys' and there are routes
  // for "/" and "/surveys" then is gonna render both. To mitigate this we use
  // the 'exact' prop to the route component

  render() {
    // materialize css requires you to have at least one root component with
    // the class 'container' for this to work properly
    return (
      <div className='container' style={{ backgroundColor: "white"}} >
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, { fetchUser })(App);

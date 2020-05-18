import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchUser } from '../actions';

import Landing from './Landing';
import Header from './Header';
import Pokedex from './Pokedex';
import Pokemon from './pokemon'
// import SurveyNew from './surveys/SurveyNew';

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

  // const LoginCotainer = () => {
  //   return (
  //     <div className="container">
  //       <Route exact path="/" component={Landing} />
  //     </div>
  //   )
  // }
  
  // const DefaultContainer = () => {
  //   return (
  //     <div>
  //       {!this.props.landingIsActive && <Header />}
  //       <div className='container' style={{ backgroundColor: "white"}}>
  //         <Route exact path="/pokedex" component={Pokedex} />
  //         <Route path="/pokemon/:id" component = {Pokemon} />
  //       </div>
  //     </div>
  //   );
  // }

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
      <div className='container' style={{ backgroundColor: !this.props.landingIsActive ? "white" : "#f5f5f5"}} >
        <BrowserRouter>
          <div>
            {!this.props.landingIsActive && <Header />}
            <Route exact path="/" component={Landing} />
            <Route exact path="/pokedex" component={Pokedex} />
            <Route path="/pokemon/:id" component={Pokemon} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  landingIsActive: auth.landingIsActive
});

export default connect(mapStateToProps, { fetchUser })(App);

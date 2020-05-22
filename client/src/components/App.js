import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchUser } from '../actions';

import Landing from './Landing';
import Header from './Header';
import Pokedex from './Pokedex';
import Pokemon from './pokemon'

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

  render() {
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

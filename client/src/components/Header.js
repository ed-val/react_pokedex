import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchBarInputChange, getPokemon } from '../actions';
// import Payments from './Payments';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchBar: false,
      searchbarText: '',
    };
  }

  _renderContent() {
    switch (this.props.user) {
      case null:
        return;
      default:
        return [
          // <li key="1"><Payments /></li>,
          // <li key="2" onClick={this._toggleSearchBar.bind(this)} ><a><i className="material-icons left">search</i>Search Pokemon</a></li>,
          // <li key="2" style={{ margin: '0 30px' }}>Credits: {this.props.user.credits}</li>,
          <li key="3"><a href="/api/logout">Log Out</a></li>
        ];
    }
  }

  _toggleSearchBar() {
    this.setState({ showSearchBar: !this.state.showSearchBar });
  }
  
  _onSearchBarChange(event) {
    this.setState({ searchbarText: event.target.value});
  }

  _handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.props.getPokemon(this.state.searchbarText);
    }
  }

  renderSearchBar() {
    return (
      <div className="row s12 red darken-4 nav-wrapper">
        <form>
          <div className="input-field">
            <input onKeyDown={this._handleKeyDown.bind(this)} placeholder='Search by ID or name' onChange={this._onSearchBarChange.bind(this)} id="search" type="search" required></input>
            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
            <i onClick={this._toggleSearchBar.bind(this)} className="material-icons">close</i>
          </div>
        </form>
      </div>
    );
  }

  renderNavigationBar() {
    return (
      <div className="red darken-4 nav-wrapper">
        <Link
          to={this.props.user ? '/surveys' : '/'}
          className="brand-logo"
        >
          <img 
            src={require("../assets/pokelogo.png")} 
            alt={''} 
            height="55" 
            width="110">
          </img>
        </Link>
        <ul className="right hide-on-med-and-down">
          {this._renderContent()}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <nav>
        {
          this.state.showSearchBar ? 
          this.renderSearchBar() : 
          this.renderNavigationBar()
        }
      </nav>
    );
  }
}

const mapStateToProps = ({ auth, header }) => {
  return {
    user: auth.user,
    searchBarInput: header.searchBarInput
  };
};

export default connect(mapStateToProps, {
  searchBarInputChange,
  getPokemon,
})(Header);

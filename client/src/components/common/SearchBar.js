import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchBarInputChange, updatePokemonSelected } from '../../actions';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchbarText: '',
    };
  }
  
  _onSearchBarChange(event) {
    console.log(event.target.value.toLowerCase());
    this.setState({ searchbarText: event.target.value.toLowerCase()});
  }

  _handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.props.onKeyDown(this.state.searchbarText);
    }
  }

  render() {
    return (
      <div 
        style={{ margin: '40px 0px 40px 0px', borderRadius: '50px' }} 
        className="nav-wrapper col s12 m12 l6 grey lighten-4"
      >
        <form>
          <div className="input-field">
            <input 
              onKeyDown={this._handleKeyDown.bind(this)} 
              placeholder='Search Pokemon by ID or name' 
              onChange={this._onSearchBarChange.bind(this)} 
              id="search" 
              type="search" 
              required
            >
            </input>
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i 
              // onClick={this._toggleSearchBar.bind(this)} 
              className="material-icons"
            >
              close
            </i>
          </div>
        </form>
      </div>        
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
  updatePokemonSelected,
})(SearchBar);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import SearchBar from './common/SearchBar';
import PokemonPreview from './common/PokemonPreview';

import { 
  getPokedex, 
  getPokemonTypes,
  updatePokemonSelected,
} from '../actions';

class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
    };
    if (this.props.pokemons.length === 0) this.props.getPokedex();
    if (this.props.pokemonsTypes.length === 0) this.props.getPokemonTypes();
  }

  onBtnClick() {
    const {getPokedex, pokemons, nextBatch} = this.props;
    getPokedex(nextBatch, pokemons);
  }

  onPreviewClick(numberID) {
    this.props.updatePokemonSelected(numberID);
  }

  renderPreviews(pokemons = []) {
    console.log(this.props);
    return pokemons.map(pokemon => {
      return (
        <Link 
          to={`pokemon/${pokemon.id}`} 
          key={pokemon.name.toString()}
        >
          <PokemonPreview 
            onClick={this.onPreviewClick.bind(this)}
            name={pokemon.name}
            id={pokemon.id}
          />
        </Link>
      );
    });
  }

  _onSearch(id) {
    this.setState({ redirect: `pokemon/${id}`});
    this.props.history.push(`pokemon/${id}`);
  }

  render() {
    return (
      <div className="col s12" style={{ paddingLeft: "15px", paddingRight: "15px" }}>
       {this.state.redirect && <Redirect to={this.state.redirect} />}
        <div className="row s12" style={{}}>
          <SearchBar onKeyDown={this._onSearch.bind(this)} />
          <h1 className="col s6 grey-text lighten-1" style={{ fontWeight: "800", fontStyle: 'italic' }}>POKEDEX</h1>
        </div>
        {this.props.pokemons.length > 0 &&
          <div className="col s12">
            <div className="row s12">
              {this.renderPreviews(this.props.pokemons)}
            </div>
            <div className="col s12 center-align" style={{margin: '20px'}}>
              <button 
                className="waves-effect waves-light btn-large red darken-4"
                onClick={this.onBtnClick.bind(this)}
              >
                Search More Pokemons!
              </button>
            </div>
          </div>
        }
      </div>
    );
  }
};

const mapStateToProps = ({ pokedex }) => ({
  pokemons: pokedex.pokemons,
  nextBatch: pokedex.nextBatch,
  pokemonsTypes: pokedex.pokemonsTypes,
});

export default connect(mapStateToProps, { 
  getPokedex, 
  getPokemonTypes,
  updatePokemonSelected,
})(Pokedex);


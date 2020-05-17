import React, { Component } from 'react';
import { connect } from 'react-redux';
import PokemonPreview from './pokemonPreview'
import { getPokedex, getPokemonTypes } from '../actions';

class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.props.getPokedex();
    this.props.getPokemonTypes();
    this.state = {};
  }

  onBtnClick() {
    const {getPokedex, pokemons, nextBatch} = this.props;
    getPokedex(nextBatch, pokemons);
  }

  renderPreviews(pokemons = []) {
    return pokemons.map(pokemon => {
      return (
        <PokemonPreview 
          key={pokemon.name.toString()}
          name={pokemon.name}
          id={pokemon.id}
        />
      );
    });
  }

  render() {
    return (
      <div className="col s12" style={{ paddingLeft: "15px", paddingRight: "15px" }}>
        <div className="right-align grey lighten-1" style={{ paddingRight: '20px', borderRadius: '50px' }}>
          <h2 className="white-text">Pokedex</h2>
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
});

export default connect(mapStateToProps, { getPokedex, getPokemonTypes })(Pokedex);


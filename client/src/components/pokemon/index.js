import React, { Component } from 'react';
import { connect } from 'react-redux';
import PokemonImage from '../common/PokemonImage';
import StatsTable from './StatsTable';
import Characteristics from './Characteristics';
import NotFound from '../common/NotFound';
import PokemonPreview from '../common/PokemonPreview';
import { searchBarInputChange, getPokemon, getPokemonTypes, updatePokemonSelected } from '../../actions';
import PokemonTypeTag from '../common/PokemonTypeTag';

const imageContainer = {
  padding: '10px',
  margin: '15px 5px 15px 5px',
  borderRadius: "6px",
}

const typesContainer = {
  padding: '10px',
  margin: '15px 5px 15px 5px',
  borderRadius: "6px",
  display: "flex", 
  alignItems: "left", 
  justifyContent: "left", 
}

// const evolutionContainer = {
//   display: "flex", 
//   flexDirection: "row",
//   alignItems: "left", 
//   justifyContent: "left", 
// }

class Pokemon extends Component {
  constructor(props) {
    super(props);

    if (this.props.pokemonsTypes.length === 0) {
      this.props.getPokemonTypes();
    }
    this.props.getPokemon(
      this.props.pokemonSelected ||
      this.props.match.params.id 
    );

  }

  resolveDescription(flavor, desc) {
    let text = ""
    if (!!flavor) {
      text = text + flavor.flavor_text;
    }
    if (!!desc) {
      text = text + desc.description;
    }
    return text;
  }

  renderTags(types = []) {
    return types.map((typeName, i) => {
      const typeProps = this.props.pokemonsTypes.find(type => {
        return typeName === type.name;
      });
      return <PokemonTypeTag key={i.toString()} {...typeProps} />
    })
  }

  onPreviewClick(numberID) {
    this.props.getPokemon(numberID);
  }

  renderEvolution(pokemon) {
    if (!!pokemon.evolvesFromSpecies) {
      const id = pokemon.evolvesFromSpecies.url.split('/').reverse()[1];
      return (
        <PokemonPreview 
          onClick={this.onPreviewClick.bind(this)}
          classes={'hoverable s6 m3 l3'}
          id={id}
          name={pokemon.evolvesFromSpecies.name}
        />
      );
    }
    return null;
  }

  _onSearchChange(text) {
    this.setState({ searchText: text })
  }

  render() {
    return (
      <div className="row s12">
      { this.props.requestError ? <NotFound /> :
      <div className="row s12">
        <div className='center-align row s12'>
          <h2 className="grey-text lighten-1">
            No. {this.props.pokemon.number}{'    '}
            {this.props.pokemon.nameFriendly}
          </h2>
        </div>
        <div className="col s12 m6 l6">
          <div style={imageContainer} className="grey lighten-3">
            <PokemonImage id={this.props.pokemon.id} />
          </div>
          <h4 className='grey-text lighten-3'>Stats:</h4>
          <div style={typesContainer} className="row left-align grey lighten-3">
            <StatsTable stats={this.props.pokemon.stats || []} />
          </div>
        </div>
        <div className="col s12 m6 l6">
          <h4 className='grey-text lighten-3'>Description:</h4>
          <h6 style={imageContainer} className="grey lighten-3">
            {this.resolveDescription(
              this.props.pokemon.flavorTextEntry,
              this.props.pokemon.description
            )}
          </h6>
          <div style={imageContainer} className="grey">
            <Characteristics pokemon={this.props.pokemon} />
          </div>
          <h4 className='grey-text lighten-3'>Types:</h4>
          <div style={typesContainer} className="row left-align grey lighten-3">
            {this.renderTags(this.props.pokemon.types)}
          </div>
          
          <h4 className='grey-text lighten-3'>Evolves from:</h4>
          <div style={imageContainer} className="row">
            {this.renderEvolution(this.props.pokemon)}
          </div>
        </div>
      </div>

      }
      </div>
    );
  }
}

const mapStateToProps = ({ pokedex, pokemon }) => {
  return {
    pokemons: pokedex.pokemons,
    pokemonsTypes: pokedex.pokemonsTypes,
    pokemonSelected: pokedex.pokemonSelected,
    pokemon: pokemon.details,
    requestError: pokemon.requestError,
  };
};

export default connect(mapStateToProps, {
  searchBarInputChange, 
  getPokemon,
  getPokemonTypes,
  updatePokemonSelected,
})(Pokemon);

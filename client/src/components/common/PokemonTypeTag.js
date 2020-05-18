import React from 'react';
import { connect } from 'react-redux';

const containerStyle = {
  padding: '5px 15px 5px 15px',
  margin: '5px',
  borderRadius: "6px",
}


const PokemonTypeTag = (props) => {
  return (
    <div style={containerStyle} className={`${props.color}`}>
      <div className={`${props.textColor}`}>
        {props.nameFriendly}
      </div>
    </div>
  );
}

const mapStateToProps = ({ pokedex, pokemon }) => {
  return {
    types: pokedex.pokemonsTypes,
  };
};

export default connect(mapStateToProps, {})(PokemonTypeTag);

import React from 'react';
import PokemonImage from './PokemonImage'

const PokemonPreview = (props) => {
  const friendlyName = props.name.charAt(0).toUpperCase() + 
  props.name.slice(1);

  const padWithZeroes = (number, length) => {
    let paddedNumber = '' + number;
    while (paddedNumber.length < length) {
        paddedNumber = '0' + paddedNumber;
    }
    return paddedNumber;
  }

  return (
      <div 
        onClick={() => props.onClick(props.id)} 
        className={!!props.classes ? props.classes : "hoverable col s12 m6 l3"} 
        style={{marginTop: "15px", marginBottom: "15px", borderRadius: "6px" }}
      >
        <PokemonImage id={props.id} />
        <div className="card-content">
          <h5 className="grey-text text-darken-2">{friendlyName}</h5>
          <h6 className="black-text bold">No. {padWithZeroes(props.id, 3)}</h6>
        </div>
      </div>
  );
};

export default PokemonPreview;
import React from 'react';

const Characteristics = ({pokemon}) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <h6 className='white-text'>Height: {pokemon.height}</h6>
        <h6 className='white-text'>Weight: {pokemon.weight}</h6>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <h6 className='white-text'>Generation: {pokemon.generation}</h6>
        <h6 className='white-text'>Pokemon ID: {pokemon.id}</h6>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <h6 className='white-text'>Abilities: {pokemon.abilities}</h6>
      </div>
    </div>
  );
}

export default Characteristics;

import React from 'react';

const imageContainerStyle = { 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center", 
  padding: "10px" ,
  marginTop: '10px',
  borderRadius: "6px"
};

const PokemonImage = (props) => {
  return (
    <div className="grey lighten-3" style={imageContainerStyle} >
      <img 
        style={{ height:"75%", width:"75%" }} 
        className="waves-effect waves-light"
        alt=""
        src={`https://pokeres.bastionbot.org/images/pokemon/${props.id}.png`}
      >
      </img>
    </div>
  );
};

export default PokemonImage;
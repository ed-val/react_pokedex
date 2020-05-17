import React from 'react';
import { connect } from 'react-redux';
import { getPokedex, getPokemonTypes } from '../actions';

import { Link } from 'react-router-dom';
const imageContainerStyle = { 
  backgroundColor: "#eeeeee", 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center", 
  padding: "5px" ,
  borderRadius: "6px"
};
const Dashboard = (props) => {
  const onBtnClick = () => {
    props.getPokedex('kanto');
    props.getPokemonTypes('kanto');
  }

  return (
    <div className="row s12">
      <button onClick={() => onBtnClick()} className="waves-effect waves-light btn-small red darken-4">Go!</button>
      <div className="col s3" style={{marginTop: "15px", marginBottom: "15px"}}>
        <div style={imageContainerStyle} >
          <img 
            style={{ height:"75%", width:"75%" }} 
            className="waves-effect waves-light"
            src="https://pokeres.bastionbot.org/images/pokemon/1.png"
          >
          </img>
        </div>
        <div className="card-content">
          <h5 className="grey-text text-darken-2">Bulbasaur</h5>
          <h6 className="black-text bold">No. 001</h6>
        </div>
      </div>

    </div>
  );
};
const mapStateToProps = ({ auth, header }) => {
  return {

  };
};

export default connect(mapStateToProps, { getPokedex, getPokemonTypes })(Dashboard);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPokedex, getPokemonTypes, landingIsActive } from '../actions';

const divStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center'
};

class NotFound extends Component {
  constructor(props) {
    super(props);
    props.getPokedex();
    props.getPokemonTypes();
    props.landingIsActive(true);
    this.state = {};
  }

  renderPromo() {
    return (
      <div style={{ backgroundColor: 'rgba(52, 52, 52, 0.05)', borderRadius: '25px', margin: "30px"}} className="row">
        <div className="row s12">
          <img 
            src={require("../assets/pokelogo.png")} 
            alt={''} 
            height="60%" 
            width="60%">
          </img>
        </div>
        <div className="col s12 m12 l4">
          <div className="center promo promo-example">
            <i style={{ fontSize: "90px", color: '#b71c1c'}} className="material-icons ">flash_on</i>
            <p className="promo-caption">Enjoy the fastest experience </p>
            <p className="light center">We are proud of the product we've put together. With it you can search and find any Pokemon you can think of in no time. Our loading times are crazy fast!.</p>
          </div>
        </div>
        <div className="col s12 m12 l4">
          <div className="center promo promo-example">
            <i style={{ fontSize: "90px", color: '#b71c1c'}} className="material-icons ">check_circle</i>
            <p className="promo-caption">User friendly</p>
            <p className="light center">Use this web application, at anytime in any device. Yes, it also supports mobile screens, login now and catch 'em all.</p>
          </div>
        </div>
        <div className="col s12 m12 l4">
          <div className="center promo promo-example">
            <i style={{ fontSize: "90px", color: '#b71c1c'}} className="material-icons ">insert_chart</i>
            <p className="promo-caption">All Pokemons in just one place</p>
            <p className="light center">We've worked effortlessly so you dont have to look around somewhere else to figure out a certain detail most Pokedex overlook. </p>
          </div>
        </div>
        <div style={{ margin: '20px 0px 20px 0px' }} className="col s12">
          <h4>Get started by loggin in!</h4>
        </div>

        <div className="col s12">
          <a href="/auth/google">
            <button 
              style={{ margin: "25px" }}
              className="waves-effect waves-light btn red darken-4"
              onClick={() => {
                setTimeout(() => { // to avoid visual hiccup
                  this.props.landingIsActive(false)
                }, 1000);
              }}
            > 
              Login with Google
            </button>
          </a>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div style={divStyle}>
      {this.renderPromo()}
    </div>
    );
  }
}

const mapStateToProps = ({ pokedex }) => ({
  pokemons: pokedex.pokemons,
  nextBatch: pokedex.nextBatch,
});

export default connect(mapStateToProps, { 
  getPokedex, 
  getPokemonTypes,
  landingIsActive,
})(NotFound);


import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { landingIsActive } from '../../actions';

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
    props.landingIsActive(true);
    this.state = {};
  }

  componentWillUnmount() {
    this.props.landingIsActive(false);
  }

  renderPromo() {
    return (
      <div style={{ backgroundColor: 'rgba(52, 52, 52, 0.05)', borderRadius: '25px', margin: "30px" }} className="row">
        <div className="row s12">
          <img
            src={require("../../assets/pokelogo.png")}
            alt={''}
            height="60%"
            width="60%">
          </img>
        </div>
        <div style={{ margin: '20px 0px 20px 0px' }} className="col s12">
          <h4>Couldn't find what you are looking for :(</h4>
        </div>

        <div className="col s12">
          <Link to={`/pokedex`}>
            <button
              style={{ margin: "25px" }}
              className="waves-effect waves-light btn red darken-4"
              onClick={() => {
                this.props.landingIsActive(false);
              }}
            >
              Go Back
            </button>
          </Link>
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
  landingIsActive,
})(NotFound);


import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 Emaily credits"
        amount={500} //amount in USD cents
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">ADD CREDITS</button>
      </StripeCheckout>
    );
  }
}

const mapStateToProps = ({ auth }) => ({

});

export default connect(mapStateToProps, actions)(Payments);

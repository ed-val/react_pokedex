import React  from 'react';

const divStyle = {
  textAlign: 'center'
};

const Landing = (props) => {
  return (
    <div style={divStyle}>
      <h1>
        Emaily!
      </h1>
      <button className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>button</button>
      Collec feedback from the users
    </div>
  );
};

export default Landing;

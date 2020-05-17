import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
// redux form basically takes care of calling action creators, storing data in redux
// and connecting it back to our components so its a little less painful
// Field contains any HTML input field type you can imagine
import SurveyField from './SurveyField';
import emailValidations from '../../utils/emailValidations';
import FORM_FIELDS from './formFields';

class SurveyForm extends Component {
  static propTypes = {

  };
  _renderFields() {
    return _.map(FORM_FIELDS, ({ label, name }) => {
      return <Field key={name} component={SurveyField} type='text' label={label} name={name}/>;
    });
  }
  // handleSubmit is provided by reduxForm
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this._renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
            <i className="material-icons right">keyboard_arrow_left</i>
          </Link>
          <button className="indigo btn-flat right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

const validate = (inputs) => {
  const errors = {};

  errors.recipients = emailValidations(inputs.recipients || '');

  _.each(FORM_FIELDS, ({ name }) => {
    if (!inputs[name]) {
      errors[name]= `You must provide a ${name}`;
    }
  });

  return errors;
};

export default reduxForm({
  validate, //this fx will run every time the submit event is triggered
  form: 'surveyForm',
  destroyOnUnmount: false, //this persist the form values even on leave
})(SurveyForm);

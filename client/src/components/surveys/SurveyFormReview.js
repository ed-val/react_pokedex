import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import FORM_FIELDS from './formFields';
import * as actions from '../../actions';
import { withRouter } from 'react-router';

const SurveyFormReview = ({ onCancel, surveyFormValues, submitSurvey, history }) => {
  const reviewFields = _.map(FORM_FIELDS, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {surveyFormValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>review yyour entries</h5>
      {/* notice there are no () when calling the   fx we declared up above */}
      {reviewFields}
      <button
        className="yellow darken-4 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        // remember than when we enclose a function arround an arrow fx we are
        // preventing it from executing at code intepretation
        onClick={() => submitSurvey(surveyFormValues, history)}
        className="green lighten-3 btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = ( { form }) => {
  return {
    surveyFormValues: form.surveyForm.values
  };
};
// now SurveyFormReview knows about the 'history' prop provided by withRouter
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));

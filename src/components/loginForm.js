import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
const { DOM: { input } } = React
//const { DOM: { input, select, textarea } } = React;
import 'react-widgets/dist/css/react-widgets.css'

const validateUsers = ['william', 'bill', 'admin', 'root'];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values) {
  return sleep(1000) // simulate server latency
      .then(() => {
        if (![ 'john', 'paul', 'george', 'ringo' ].includes(values.username)) {
          throw new SubmissionError({ username: 'User does not exist', _error: 'Login failed!' })
        } else if (values.password !== 'redux-form') {
          throw new SubmissionError({ password: 'Wrong password', _error: 'Login failed!' })
        } else {
          window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
        }
      })
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type}/>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
)

let SubmitValidationForm = (props) => {
  const { error, handleSubmit, pristine, reset, submitting } = props
  return (
      <form onSubmit={handleSubmit(submit)}>
        <Field name="username" type="text" component={renderField} label="Username"/>
        <Field name="password" type="password" component={renderField} label="Password"/>
        {error && <strong>{error}</strong>}
        <div>
          <button type="submit" disabled={submitting}>Log In</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
  )
}

SubmitValidationForm = reduxForm({
  form: 'submitValidation'  // a unique identifier for this form
})(SubmitValidationForm)


class loginForm extends Component {

  constructor(props) {
    super(props);
    /**
     * setState(...): Can only update a mounted or mounting component.
     * This usually means you called setState() on an unmounted component. This is a no-op.
     this.setState({
      validateUsers: ['william', 'bill', 'admin', 'root']
    });
     */
  }

  render() {
    return (
      <div className="container">
        <SubmitValidationForm onSubmit={submit}/>
      </div>
    )
  }
}

export default loginForm;


import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { RadioButton } from 'material-ui/RadioButton'
import MenuItem from 'material-ui/MenuItem'
import { AutoComplete as MUIAutoComplete } from 'material-ui'
import {
  AutoComplete,
  Checkbox,
  DatePicker,
  TimePicker,
  RadioButtonGroup,
  SelectField,
  Slider,
  TextField,
  Toggle
} from 'redux-form-material-ui'
import List from './List';


// validation functions
const required = value => (value == null ? 'Required' : undefined)

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      items: []
    };
  }
  componentDidMount() {
    this.ref // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus() // on TextField
  }
  
  onChange = (event) => {
    this.setState({ term: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.setState({
      term: '',
      items: [...this.state.items, this.state.term]
    });
  }

  saveRef = ref => (this.ref = ref)

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <div>
      <form onSubmit={this.onSubmit}>
        <div>
          <Field
            name="title"
            component={TextField}
            hintText="Task Title"
            value={this.state.term}
            onChange={this.onChange}
            floatingLabelText="Title"
            validate={required}
            ref={this.saveRef}
            withRef
          />
        </div>
        <div>
          <Field
            name="priority"
            component={SelectField}
            hintText="Priority"
            floatingLabelText="Priority"
            validate={required}
          >
            <MenuItem value="High" primaryText="High" />
            <MenuItem value="Medium" primaryText="Medium" />
            <MenuItem value="Low" primaryText="Low" />
          </Field>
        </div>
        <div>
          <Field
            name="dueDate"
            component={DatePicker}
            format={null}
            hintText="Due Date?"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="notes"
            component={TextField}
            floatingLabelText="Notes"
            multiLine
            rows={1}
          />
        </div>
        <div>
          <button type="submit" onClick={reset}>
            Submit
          </button>
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </form>
        <List items={this.state.items} />
      </div>
    )
  }
}

Form = reduxForm({
  form: 'example',
})(Form)

export default Form
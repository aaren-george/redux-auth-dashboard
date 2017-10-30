
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
          <Field name="Fasquote" component={Checkbox} label="Fasquote" />
        </div>
        <div>
          <Field name="GenEx" component={Checkbox} label="GenEx" />
        </div>
        <div>
          <Field name="ANI" component={Checkbox} label="ANI" />
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
            rows={2}
          />
        </div>
        <div>
          <Field
            name="Software"
            component={AutoComplete}
            floatingLabelText="Software"
            openOnFocus
            filter={MUIAutoComplete.fuzzyFilter}
            dataSource={['Fasquote', 'GenEx', 'ANI', 'Dashboard']}
          />
        </div>
        <div>
          <button type="submit">
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
    )
  }
}

Form = reduxForm({
  form: 'example',
})(Form)

export default Form
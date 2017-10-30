import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { addEvent, fetchCalendars, fetchUser } from '../../actions/index';
import cookie from 'react-cookie';
import DateTime from 'react-datetime';
import { Multiselect, Combobox, DateTimePicker } from 'react-widgets';
import moment from 'moment';
import momentLocaliser from 'react-widgets';
import { InputGroup, Glyphicon } from 'react-bootstrap';
import ColorPicker from '../calendar/colorPicker';
import { TwitterPicker } from 'react-color';
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

const form = reduxForm({
  form: 'newEvent',
  validate,
});

const today = new Date();

const renderField = field => (
  <div className="icon-input-title">
    <div className="icon-title"><i className="fa fa-calendar"></i></div>
    <input className="form-control-title form-control" placeholder="New Event" {...field.input} />
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

const renderDateTimePicker = ({ input: { onChange, value, date }, showTime }) =>
  <DateTime
    onChange={onChange}
    time={showTime}
    placeholder="Select a date/time"
    value={!value ? date : value }>
    </DateTime>

const renderColorPicker = feild => (
    <TwitterPicker />
);
  



const renderHashTagMultiselect = ({ input, data, valueField, textField }) =>
<div className="icon-input">
<i className="fa fa-tag"></i>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    data={data}
    placeholder="tag this event..."
    valueField={valueField}
    textField={textField}
    onCreate={(newTag) => data.push(newTag)}
    itemComponent={(item) => <span><i className="fa fa-tags"></i> &nbsp;{item.value}</span> }
  />
  </div>

const renderMultiselectPeople = ({ input, data, valueField, textField }) =>
<div className="icon-input">
<i className="fa fa-user"></i>
<Multiselect {...input}
  onBlur={() => input.onBlur()}
  value={input.value || []} // requires value to be an array
  data={data}
  placeholder="add people to this event..."
  valueField={valueField}
  textField={textField}
  onCreate={(newPerson) => data.push(newPerson)}
  itemComponent={(item) => <span><i className="fa fa-user"></i> &nbsp;{`${item.item.firstName} ${item.item.lastName}`}</span> }
/>
  </div>

const renderCalendarMultiselect = ({ input, data, valueField, textField }) =>
<div className="icon-input">
<i className="fa fa-plus"></i>
<Multiselect {...input}
  onBlur={() => input.onBlur()}
  value={input.value || []} // requires value to be an array
  data={data}
  placeholder="add event to calendar..."
  valueField={valueField}
  textField={textField}
  onCreate={(newCalendar) => data.push(newCalendar)}
  itemComponent={(item) => <span><i className="fa fa-calendar"></i> &nbsp;{`${item.item.name}`}</span> }>
  </Multiselect>
  </div>

const renderColorMultiselect = ({ input, data }) =>
<div className="icon-input">
<i className="fa fa-paint-brush"></i>
<Multiselect {...input}
  onBlur={() => input.onBlur()}
  value={input.value || []} // requires value to be an array
  data={data}
  placeholder="select event color..."
  onCreate={(newColor) => data.push(newColor)}
  itemComponent={(item) => <span><i className="fa fa-paint-brush"></i> &nbsp;{`${item.value}`}</span>}>
  </Multiselect>
  </div>
  

function validate(formProps) {
  const errors = {};

  if (!formProps.title) {
    errors.title = 'Please enter a title for you event';
  }

  if (!formProps.start) {
    errors.lastName = 'Please enter a start date';
  }

  if (!formProps.end) {
    errors.email = 'Please enter an end date';
  }

  // if (!formProps.password) {
  //   errors.password = 'Please enter a password';
  // }

  return errors;
}

class NewEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayColorPicker: false,
      color: '7BDCB5'
    }

  }
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color })
  };
  
  handleFormSubmit(formProps) {
    this.props.addEvent(formProps);
  }

  componentWillMount() {
    const userId = cookie.load('user')._id;
    this.props.fetchUser(userId);
    console.log('Add event modal will mount');
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const date = this.state.date;  
    console.log('Add Event Modal Renedered!');
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderAlert()}
        <div className="row modal-title">
        <div className="col-md-12=title">
            <Field name="title" className="form-control" component={renderField} type="text" />
          </div>
          </div>
        <div className="row">
        <div className="col-md-12">
            <label>Color:</label>
            <Field name="hexColor" className="rw-multiselect rw-widget" component={renderColorMultiselect} data={this.props.profile["0"].colors} type="text" />
          </div>
        </div>
        <div className="row">
        <div className="col-md-6">
            <label>Start Date:</label>
            <Field name="start" className="form-control" component={renderDateTimePicker} showTime="false" type="text">
            </Field> 
          </div>
          <div className="col-md-6">
            <label>End Date:</label>
            <Field name="end" className="form-control" component={renderDateTimePicker} showTime="false" type="text">
            </Field> 
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label>Calendar:</label>
            <Field 
            name="calendarId" 
            role="combobox" 
            className="form-control"
            valueField={'_id'}
            textField={'name'} 
            component={renderCalendarMultiselect} 
            data={this.props.profile["0"].calendars} type="combobox" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
          <label>People:</label>
          <Field 
          name="people" 
          className="form-control rw-multiselect rw-widget"
          role="combobox" 
          component={renderMultiselectPeople} 
          data={this.props.profile["0"].people}
          valueField={'_id'}
          textField={'firstName'} 
          type="combobox" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label>#tags:</label>
            <Field name="hashtags" className="rw-multiselect rw-widget" component={renderHashTagMultiselect} data={this.props.profile["0"].hashtags} type="text" />
          </div>
          </div>
          <div className="row">
          <div className="col-md-12">
              <label></label>
        </div>
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.user.profile
  };
}

export default connect(mapStateToProps, { addEvent, fetchUser })(form(NewEvent));

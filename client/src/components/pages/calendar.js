import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BigCalendar from 'react-big-calendar';
import cookie from 'react-cookie';
// import rootReducer from '../../reducers/index';
import axios from 'axios'
import moment from 'moment';
import { fetchUser, fetchUserEvents, fetchEvents, deleteEvent, fetchCalendars } from '../../actions/index';
import { ButtonGroup, Button, Modal, Form, FieldGroup, FormGroup, ControlLabel, FormControl, HelpBlock, Alert, OverlayTrigger, Popover } from 'react-bootstrap';
import DateTime from 'react-datetime';
import { connect } from 'react-redux';
import  NewEvent from './newEvent';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

// Moment Localizer
BigCalendar.setLocalizer( BigCalendar.momentLocalizer(moment) );

const form = reduxForm({
  form: 'newEvent'
});

const renderField = field => (
  <div>
    <input placeholder="New Event" {...field.input} />
  </div>
);


class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      fromDate: null,
      events: [],
      calendars: [{"calName": "", "participants": ""}],
      toDate: new Date(),
      forValue: 15,
      today: '',
      showAddFormModal: false,
      showEventModal: false,
      hours: 12,
      minutes: 20,
      enabled: true,
      showNameError: '',
      showFromDateError: '',
      eventInfo: {
        title: '',
        start: '',
        end: '',
        calendarId: '',
        hexColor: '',
      }
    };
  }

  handleSelect(info) {
    this.setState({ 
      eventInfo: { 
        start: info.start,
        end: info.end, 
      } 
    });
    this.setState({ showAddFormModal: true });
  }

  onClick() {
    // Create a copy of the object before you change the state
    let events = this.state.events.slice();
    events.push({
      'title': 'some Party',
      'start': new Date(2017, 3, 15, 7, 0, 0).toLocaleString(),
      'end': new Date(2017, 3, 16, 10, 30, 0).toLocaleString()
    });
    this.setState({ events });
  }

  open() { this.setState({ showAddFormModal: true }); }

  close() { this.setState({ showAddFormModal: false }); }

  closeEvent() { this.setState({ showEventModal: false }); }

  handleFromDateTimeChange(newDate) { this.setState({ start: newDate}); }

  handleToDateTimeChange(newDate) { this.setState({ toDate: newDate }); }

  handleTitleChange(newTitle) { this.setState({ title: newTitle }); }

  handleEventSelect(event) {
    this.setState({showEventModal: true});
    this.setState({ eventInfo: {
      title: event.title,
      start: event.start,
      end: event.end,
      eventId: event._id,
      hexColor: event.hexColor,
      
    }}, console.log(this.state.eventInfo));
  }

  handleMinutesSelect(_this) {
    this.setState({ forValue: _this.target.value });
  }

  // handleEventSelect(event) {
  //   this.setState({today: new Date(event)})
  // }

  deletedEvent() {
    const deleteThis = this.state.eventInfo.eventId;
    this.props.deleteEvent(deleteThis);
  }

  componentWillMount() {
    console.log('calendar: component will mount');
    const userId = cookie.load('user')._id;

    this.props.fetchUserEvents(userId);
    console.log('calendar: events loaded');
    
    // this.props.fetchUser(userId);
    // console.log('user info loaded');
        
  }

  componentWillUpdate() {
    const stateEvents = this.state.events;
    const propEvents = this.props.events;
    if (stateEvents !== propEvents) {
    this.setState({events: this.props.events})
      console.log('calendar: calendar component updated with new events');

    }

  }

  componentDidMount() {
    console.log('calendar: component did mount');
  }

  eventStyleGetter(event) {
    console.log(event);
    const backgroundColor = '#' + event.hexColor;
    const style = {
        backgroundColor: backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
    };
    return {
        style: style
    };
}

  render() {
    const { handleSubmit } = this.state.eventInfo;
    let { hours, minutes, enabled } = this.state;
    // if (this.props.fetching) {
    //   return (<h1>loading.....</h1>)
    // }
     if (this.state.events !== null) {
      console.log('calendar: component rendered');
      return (
        <div>
          <BigCalendar
            selectable
            culture='en-US'
            events={this.state.events}
            startAccessor={(event) => { return moment(event.start).toDate() }}
            endAccessor={(event) => { return moment(event.end).toDate() }}
            views={{'month': true, 'week': true, 'day': true}}
            defaultView='month'
            defaultDate={new Date()}
            onSelectEvent={(event) => this.handleEventSelect(event)}
            onSelectSlot={(slotInfo) => this.handleSelect(slotInfo)}
            eventPropGetter={event => this.eventStyleGetter(event)}
            toolbar={true}
            components={{
                toolbar: this.CustomToolbar
              }} 
            />
           <Modal show={this.state.showAddFormModal} onHide={this.close.bind(this)}>
              <Modal.Header closeButton>
              </Modal.Header>
                  <Modal.Body>
                  <MuiThemeProvider muiTheme={getMuiTheme()}>
                      <NewEvent />
                  </MuiThemeProvider>
                </Modal.Body>
            </Modal>
          <Modal show={this.state.showEventModal} onHide={this.closeEvent.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h3><i className="fa fa-calendar"></i> &nbsp; {this.state.eventInfo.title}</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div><h4>Event ID:<p>{this.state.eventInfo.eventId}</p></h4></div>
            <div><h4>Start Date:</h4><p>{this.state.eventInfo.start}</p></div>
            <div><h4>End Date:</h4><p>{this.state.eventInfo.end}</p></div>
            <div><h4>Color:</h4><p>{this.state.eventInfo.hexColor}</p></div>
            <hr />
            <h4>Description:</h4>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="info">Edit</Button>
            <Button bsStyle="danger" onClick={this.deletedEvent.bind(this)}>Delete</Button>
          </Modal.Footer>
        </Modal>
        </div>
      )}
    return (<h1>loading....</h1>);
  
  }
}


const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
    events: state.events.events,
    schedule: state.schedule.calendars,
    // events: state.schedule.events,
  }
}

// const mapDispatchToProps = () => {
  
// }

export default connect(mapStateToProps, { fetchUser, fetchUserEvents, deleteEvent, fetchCalendars })(Calendar)

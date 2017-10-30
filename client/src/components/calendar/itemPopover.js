import React, { Component } from 'react';
import { Overlay, Button, Popover } from 'react-bootstrap';

class CalPopover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      target,
      show: false,
      popTitle: props.eventName,
      startDate: props.start,
      endDate: props.end

    }

    this.handleClick = (e) => {
      this.setState({ target: e.target, show: !this.state.show });
    };
  }
  render() {
    return (
      <ButtonToolbar>
        <Button onClick={this.handleClick}>
          Holy guacamole!
        </Button>

        <Overlay
          show={this.state.show}
          target={this.state.target}
          placement="bottom"
          container={this}
          containerPadding={20}
        >
          <Popover id="popover-contained" title="Event Details:">
            <strong>Start Date:</strong> {this.state.startDate}
            <strong>End Date:</strong> {this.state.endDate}
          </Popover>
        </Overlay>
      </ButtonToolbar>
    );
  }
}

export default CalPopover;
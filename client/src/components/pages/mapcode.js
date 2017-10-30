// renderCalendarSelect = field => (
  //   <div>
  //     <select className="form-control" placeholder="Select a calendar for this event..." {...field.input}>
  //       <option>Please select a calendar...</option>
  //       {this.props.profile.calendars.map( (calendar, index) => {
  //         return <option key={index} value={calendar._id}>{calendar.name}</option>
  //       })}}
  //     </select>
  //     {field.touched && field.error && <div className="error">{field.error}</div>}
  //   </div>
  // );

  // renderPeopleSelect = field => (
  //   <div>
  //     <select className="form-control" {...field.input}>
  //       <option>Invite People...</option>
  //       {this.props.profile.people.map( (people, index) => {
  //         return <option key={index} value={people._id}>{`${people.firstName} ${people.lastName}`}</option>
  //       })}}
  //     </select>
  //     {field.touched && field.error && <div className="error">{field.error}</div>}
  //   </div>
  // );


    // renderEventColor = field => (
  //   <div>
  //     <select className="form-control" {...field.input}>
  //       <option>Select event color...</option>
  //       <option value="#ff0000">Red</option>
  //       <option value="#00ff00">Green</option>
  //       <option value="#0000ff">Blue</option>
  //     </select>
  //     {field.touched && field.error && <div className="error">{field.error}</div>}
  //   </div>
  // );
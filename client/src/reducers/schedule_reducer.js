import { FETCH_CALENDARS, ADD_EVENT, CREATE_CALENDAR, DELETE_EVENT, FETCH_SINGLE_CALENDAR, FETCH_CALENDAR_NAME, FETCH_CALENDARS_BY_ID, SCHEDULE_ERROR } from '../actions/types';

const INITIAL_STATE = { events: [], calendars: [], error: '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CALENDARS:
      return { ...state, calendars: action.payload, error: action.payload};
    case FETCH_CALENDARS_BY_ID:
      return action.payload;
    case DELETE_EVENT:
      return action.payload;
    case FETCH_CALENDAR_NAME:
      return { ...state, calendarName: action.payload };
    case CREATE_CALENDAR:
      return { ...state, message: action.payload.message };
    case ADD_EVENT:
      return action.payload;
    case SCHEDULE_ERROR:
      return { ...state, error: action.payload };
  }

  return state;
}

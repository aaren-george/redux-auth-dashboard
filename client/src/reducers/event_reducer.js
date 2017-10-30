import { FETCH_EVENTS, ERROR_RESPONSE } from '../actions/types';

const INITIAL_STATE = { events: [], message: '', error: '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_EVENTS:
      return { ...state, events: action.payload };
    case ERROR_RESPONSE:
      return { ...state, error: action.payload };
  }

  return state;
}
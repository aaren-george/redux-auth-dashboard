import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import eventReducer from './event_reducer';
import scheduleReducer from './schedule_reducer';
import notificationReducer from '../todoApp/notification/reducer';
import tasksReducer from '../todoApp/tasks/reducer';
import routerReducer from 'react-router-redux';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  schedule: scheduleReducer,
  events: eventReducer,
  notification: notificationReducer,
  routing: routerReducer,
  tasks: tasksReducer
});

export default rootReducer;

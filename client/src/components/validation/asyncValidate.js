import { fetchUser, fetchEvents, deleteEvent, fetchCalendars } from '../../actions/index';
import cookie from 'react-cookie';
import axios from 'axios';
import { connect } from 'react-redux';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values, dispatch) => {
  return sleep(1000).then(() => {
    // simulate server latency
    if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
      throw { username: 'That username is taken' }
    }
  })
}
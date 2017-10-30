// The initial state
const initialState = {
  title: 'Congratulations!',
  contact_url: 'https://twitter.com/tranvu/',
  contact_label: 'Send me a Tweet!'
}

/**
 * This is the reducer function for the "data" property in our application's state tree
 *
 * @param array state           An array of todo items
 * @param object action         The action that is to be performed
 * @return array
 */
export default function data(state = initialState, action) {
  return state
}

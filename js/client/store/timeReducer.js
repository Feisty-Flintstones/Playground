import axios from 'axios';
// import history from "../history";

/**
 * ACTION TYPES
 */
const SET_TIME_UP = 'SET_TIME_UP';

/**
 * INITIAL STATE
 */
const defaultUser = {
  timeUp: false
};

/**
 * ACTION CREATORS
 */
export const timeUp = () => ({
  type: SET_TIME_UP
});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case SET_TIME_UP:
      return { ...state, timeUp: true };
    default:
      return state;
  }
}

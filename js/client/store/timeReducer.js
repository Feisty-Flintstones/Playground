const DECREMENT_TIME = 'DECREMENT_TIME';
export const decrementTime = () => {
  return {
    type: DECREMENT_TIME
  };
};
const TIME_RAN_OUT = 'TIME_RAN_OUT';
export const timeOut = () => {
  return {
    type: TIME_RAN_OUT
  };
};

const initialState = {
  timer: 300,
  timeLeft: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DECREMENT_TIME:
      return { ...state, timer: state.timer - 1 };
    case TIME_RAN_OUT:
      return { ...state, timeLeft: false };
    default:
      return { ...state };
=======
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

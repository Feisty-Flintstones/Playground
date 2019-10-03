import axios from "axios";
// import history from "../history";

/**
 * ACTION TYPES
 */
const SET_USER_POSITION = "SET_USER_POSITION";

/**
 * INITIAL STATE
 */
const defaultUser = {
  position: [0, 0, -1]
};

/**
 * ACTION CREATORS
 */
export const setUserPosition = position => ({
  type: SET_USER_POSITION,
  position
});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case SET_USER_POSITION:
      return { ...state, position: action.position };
    default:
      return state;
  }
}

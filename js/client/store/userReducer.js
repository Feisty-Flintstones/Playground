import axios from "axios";
// import history from "../history";

/**
 * ACTION TYPES
 */
const GET_USER_POSITION = "GET_USER_POSITION";

/**
 * INITIAL STATE
 */
const defaultUser = {
  position: [0, 0, -1]
};

/**
 * ACTION CREATORS
 */
export const getUserPosition = userPosArr => ({
  type: GET_USER_POSITION,
  userPosArr
});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER_POSITION:
      return action.userPosArr;
    default:
      return state;
  }
}

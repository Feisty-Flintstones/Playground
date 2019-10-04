import axios from "axios";

const SET_CALIBRATION = "SET_CALIBRATION";

/**
 * INITIAL STATE
 */
const initialBoard = {
  calibration: false
};

/**
 * ACTION CREATORS
 */
export const setCalibration = calibration => ({
  type: SET_CALIBRATION,
  calibration
});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = initialBoard, action) {
  switch (action.type) {
    case SET_CALIBRATION:
      return { ...state, calibration: action.calibration };
    default:
      return state;
  }
}

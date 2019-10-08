import axios from 'axios';

const SET_CALIBRATION = 'SET_CALIBRATION';

/**
 * INITIAL STATE
 */
const initialBoard = {
  calibration: false,

  boardPieces: [{
    id: 0,
    name: 'Smiley',
    position: [0,0,-1],
    view: true
  },
  {id:1,
  name: 'Testing',
  position: [-1.5,0,0],
  view: true
}
]}
  
const FALSIFY_VIEW = 'FALSIFY_VIEW';

export const removedView = (id) => {
  return {
    type: FALSIFY_VIEW,
    id
  };
};
export const addView = id => {
  return {
    type: UNFALSIFY_VIEW,
    id
  };
};

const MOVE_BOARD_PIECE = 'MOVE_BOARD_PIECE';
export const moveBoardPiece = (id, position) => {
  return {
    type: MOVE_BOARD_PIECE,
    id,
    position
  };
};
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
    case MOVE_BOARD_PIECE:
      return {
        ...state,
        boardPieces: [
          ...state.boardPieces.map(element => {
            if (element.id === action.id) {
              element.position = action.position;
            }
            return element;
          })
        ]
      };
    case FALSIFY_VIEW:
      return {
        ...state,
        boardPieces: [
          ...state.boardPieces.map(element => {
            if (element.id === action.id) {
              element.view = false;
            }
            return element;
          })
        ]
      };
    case UNFALSIFY_VIEW:
      return {
        ...state,
        boardPieces: [
          ...state.boardPieces.map(element => {
            if (element.id === action.id) {
              element.view = true;
            }
            return element;
          })
        ]
      };
    default:
      return state;
  }
}

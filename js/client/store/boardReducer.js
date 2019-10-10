import axios from 'axios';

const SET_CALIBRATION = 'SET_CALIBRATION';

/**
 * INITIAL STATE
 */
const initialBoard = {
  boardPieces: [],
  calibration: false
};

const LOAD_BOARD = 'LOAD_BOARD';

const ADD_TO_BOARD = 'ADD_TO_BOARD';
const REMOVE_FROM_BOARD = 'REMOVE_FROM_BOARD';

export const addToBoard = id => {
  return {
    type: ADD_TO_BOARD,
    id
  };
};
export const removeFromBoard = id => {
  return {
    type: REMOVE_FROM_BOARD,
    id
  };
};
export const gotLoadedBoard = board => {
  return {
    type: LOAD_BOARD,
    board
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
 * THUNK
 */
export const loadBoard = boardId => {
  return async dispatch => {
    const board = await axios.get('/api/board/', boardId);
    dispatch(gotLoadedBoard(board));
  };
};


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
    case REMOVE_FROM_BOARD:
      return {
        ...state,
        boardPieces: [
          ...state.boardPieces.map(element => {
            if (element.id === action.id) {
              element.collected = true;
            }
            return element;
          })
        ]
      };
    case ADD_TO_BOARD:
      return {
        ...state,
        boardPieces: [
          ...state.boardPieces.map(element => {
            if (element.id === action.id) {
              element.collected = false;
            }
            return element;
          })
        ]
      };
    default:
      return state;
  }
}

import axios from 'axios';
import { IPAddress } from '../../../my_API_KEY';

const SET_CALIBRATION = 'SET_CALIBRATION';
/**
 * INITIAL STATE
 */
const initialBoard = {
  boardPieces: [],
  calibration: false
};

const LOAD_BOARD = 'LOAD_BOARD';
const MOVE_BOARD_PIECE = 'MOVE_BOARD_PIECE';
const ADD_TO_BOARD = 'ADD_TO_BOARD';
const REMOVE_FROM_BOARD = 'REMOVE_FROM_BOARD';
const ADD_COIN_TO_BOARD = 'ADD_COIN_TO_BOARD';

export const addCoinToBoard = id => {
  return {
    type: ADD_COIN_TO_BOARD,
    id
  };
};

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
//HUGE
export const loadBoard = boardId => {
  return async dispatch => {
    try {
      const { data: board } = await axios.get(
        `http://${IPAddress}:8080/api/board/${boardId}`
      );
      dispatch(gotLoadedBoard(board));
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 * REDUCER
 */
export default function(state = initialBoard, action) {
  switch (action.type) {
    case LOAD_BOARD:
      return { ...state, boardPieces: action.board.objectives };
    case SET_CALIBRATION:
      return { ...state, calibration: action.calibration };
    case MOVE_BOARD_PIECE:
      return {
        ...state,
        boardPieces: [
          ...state.boardPieces.map(element => {
            if (element.itemId === action.id) {
              element.xpos = action.position[0];
              element.ypos = action.position[1];
              element.zpos = action.position[2];
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
            if (element.itemId === action.id) {
              element.collected = true;
              return element;
            } else {
              return element;
            }
          })
        ]
      };
    case ADD_TO_BOARD:
      return {
        ...state,
        boardPieces: [
          ...state.boardPieces.map(element => {
            if (element.itemId === action.id) {
              element.collected = false;
              element.xpos = null;
            }
            return element;
          })
        ]
      };
    case ADD_COIN_TO_BOARD:
      return {
        ...state,
        boardPieces: [
          ...state.boardPieces.map(element => {
            if (element.itemId === action.id) {
              element.name = 'Coin';
            }
            return element;
          })
        ]
      };
    default:
      return state;
  }
}

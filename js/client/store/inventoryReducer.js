import axios from 'axios';
import { Text } from 'react-native';
import React from 'react';
// import history from "../history";

/**
 * ACTION TYPES
 */
const GET_INVENTORY = 'GET_INVENTORY';
const ADD_INVENTORY = 'ADD_INVENTORY';
const DELETE_INVENTORY = 'DELETE_INVENTORY';
/**
 * INITIAL STATE
 */
const initialState = {
  inv: [
    { name: 'null', id: -1 },
    { name: 'null', id: -1 },
    { name: 'null', id: -1 }
  ],
  items: 0
};

/**
 * ACTION CREATORS
 */
export const getInventory = () => ({
  type: GET_INVENTORY
});

export const addInventory = (name, id) => ({
  type: ADD_INVENTORY,
  name,
  id
});
export const deleteInventory = id => ({
  type: DELETE_INVENTORY,
  id
});

/**
 * THUNK CREATORS
 */
//helper
function finder(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === -1) {
      return i;
    }
  }
  return -1;
}
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INVENTORY:
      return state;
    case ADD_INVENTORY:
      let newarr = state.inv;
      newarr[finder(state.inv)] = { name: action.name, id: action.id };
      return {
        ...state,
        inv: newarr
      };
    case DELETE_INVENTORY:
      return {
        ...state,
        inv: [
          ...state.inv.map(element => {
            if (element.id === action.id) {
              element.id = -1;
              element.name = 'null';
            }
            return element;
          })
        ],
        items: state.items - 1
      };
    default:
      return state;
  }
}

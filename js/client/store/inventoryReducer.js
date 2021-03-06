import axios from 'axios';
import { Text } from 'react-native';
import React from 'react';
// import history from "../history";

/**
 * ACTION TYPES
 */
const GET_INVENTORY = 'GET_INVENTORY';
const ADD_TO_INVENTORY = 'ADD_TO_INVENTORY';
const REMOVE_FROM_INVENTORY = 'REMOVE_FROM_INVENTORY';
const ADD_COIN = 'ADD_COIN';
/**
 * INITIAL STATE
 */
const initialState = {
  inv: [],
  items: 0,
  coins: 0
};

/**
 * ACTION CREATORS
 */
export const getInventory = () => ({
  type: GET_INVENTORY
});

export const addToInventory = (name, id) => ({
  type: ADD_TO_INVENTORY,
  name,
  id
});
export const removeFromInventory = id => ({
  type: REMOVE_FROM_INVENTORY,
  id
});
export const addCoins = () => ({
  type: ADD_COIN
});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INVENTORY:
      return state;
    case ADD_TO_INVENTORY:
      return {
        ...state,
        inv: [...state.inv, { name: action.name, id: action.id }]
      };
    case REMOVE_FROM_INVENTORY:
      return {
        ...state,
        inv: [...state.inv.filter(element => element.id !== action.id)]
      };
    case ADD_COIN:
      if (state.coins < 5) {
        return { ...state, coins: state.coins + 1 };
      } else {
        return state;
      }
    default:
      return state;
  }
}

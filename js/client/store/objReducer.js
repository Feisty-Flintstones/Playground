import axios from "axios";
import console = require("console");
// import history from "../history";

/**
 * ACTION TYPES
 */
const GET_ALL_OBJECTIVES = "GET_ALL_OBJECTIVES"
const CREATE_OBJECTIVE = "CREATE_OBJECTIVE";

/**
 * INITIAL STATE
 */
const objectives = [];
const newObjective = {}

/**
 * ACTION CREATORS
 */
export const getAllObjectives = () => ({
  type: GET_ALL_OBJECTIVES,
  objectives
});

export const createObjective = (newObjective) => ({
    type: CREATE_OBJECTIVE,
    newObjective
})

/**
 * THUNK CREATORS
 */

export const getAllObjectivesThunk = () => dispatch => {
    try {
        //const GraphQLData = await GraphQL request
        dispatch(getAllObjectives())
    } catch (error) {
        console.log(error)
    }
}

export const createObjectiveThunk = (newObjective) => dispatch => {
    try {
        //const GraphQLData = await GraphQL request
        dispatch(createObjective(newObjective))
    } catch (error) {
        console.log(error)
    }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_ALL_OBJECTIVES:
      return {...state, objectives: action.objectives}
    case CREATE_OBJECTIVE:
        return {...state, newObjective: action.newObjective}
    default:
      return state;
  }
}

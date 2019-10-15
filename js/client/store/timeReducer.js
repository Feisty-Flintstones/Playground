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
  }
}

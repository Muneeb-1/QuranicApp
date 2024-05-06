// Import functions for combining reducers (optional)
import {LATITUDE_LONGITUDE} from '../Constants/constants';

const initialState = {};

export const deviceLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LATITUDE_LONGITUDE:
      console.log('Location stored',action.payload);
      return {...state, data: action.payload};

    default:
      return state;
  }
};

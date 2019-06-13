/**
 * @Author: harsha
 * @Date:   2019-06-12T15:23:44+05:30
 * @Last modified by:   harsha
 * @Last modified time: 2019-06-13T17:44:54+05:30
 */

import {
  GET_SHIPMENT_DATA,
  SHIPMENT_RESULTS_FAIL,
  UPDATE_NAME_DATA,
  UPDATE_NAME_FAIL,
  FETCH_SHIPMENT_DETAILS,
  SHIPMENT_DETAILS_FAIL
} from "../actions/types";

const initial_state = {
  isFetching: true,
  shipmentList: []
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case GET_SHIPMENT_DATA:
      return {
        ...state,
        shipmentList: action.payload.data,
        isLoading: action.isLoading
      };
    case UPDATE_NAME_DATA:
      return {
        ...state,
        shipmentList: [...state.shipmentList, action.payload.data]
      };
    case UPDATE_NAME_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case FETCH_SHIPMENT_DETAILS:
      return {
        ...state,
        shipmentDetails: action.payload.data,
        isFetching: action.isFetching
      };
    case SHIPMENT_DETAILS_FAIL:
      console.log(action.payload);
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

/**
 * @Author: harsha
 * @Date:   2019-06-12T15:15:59+05:30
 * @Last modified by:   harsha
 * @Last modified time: 2019-06-14T02:29:00+05:30
 */

import {
  GET_SHIPMENT_DATA,
  SHIPMENT_RESULTS_FAIL,
  UPDATE_NAME_DATA,
  UPDATE_NAME_FAIL,
  FETCH_SHIPMENT_DETAILS,
  SHIPMENT_DETAILS_FAIL,
  INIT_FETCH_SHIPMENT_DETAILS,
  SET_SEARCH_RESULTS
} from "./types";
import qs from "qs";
import axios from "axios";

/**
 * [fetchShipmentData description]
 * @return {[type]} [description]
 */

export const fetchShipmentData = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(`http://localhost:3003/shipments`);
    dispatch({
      type: GET_SHIPMENT_DATA,
      payload: res,
      isLoading: false
    });
  } catch (e) {
    dispatch({
      type: SHIPMENT_RESULTS_FAIL,
      payload: e,
      isLoading: false
    });
  }
};

/**
 * [updateShipmentName description]
 * @param  {[type]} data  [description]
 * @param  {[type]} index [description]
 * @return {[type]}       [description]
 */

export const updateShipmentName = (data, index) => async (
  dispatch,
  getState
) => {
  try {
    const res = await axios.put(
      `http://localhost:3003/shipments/${data.id}`,
      data
    );
    dispatch({
      type: UPDATE_NAME_DATA,
      payload: res,
      updatedIndex: index
    });
    dispatch(fetchShipmentData());
  } catch (e) {
    dispatch({
      type: UPDATE_NAME_FAIL,
      payload: e
    });
  }
};

/**
 * [shipmentDetailFetch description]
 * @param  {[type]} shipmentId [description]
 * @return {[type]}            [description]
 */

export const shipmentDetailFetch = shipmentId => async (dispatch, getState) => {
  dispatch(initialDetailsData());
  try {
    const res = await axios.get(
      `http://localhost:3003/shipments/${shipmentId}`
    );
    dispatch({
      type: FETCH_SHIPMENT_DETAILS,
      payload: res,
      isFetching: false
    });
  } catch (e) {
    debugger;
    dispatch({
      type: SHIPMENT_DETAILS_FAIL,
      payload: e,
      isFetching: false
    });
  }
};

/**
 * [setSearchResults description]
 * @param {[type]} data [description]
 */

export const setSearchResults = data => async (dispatch, getState) => {
  dispatch({
    type: SET_SEARCH_RESULTS,
    payload: data
  });
};

/**
 * [initfetchRepoData description]
 * @return {[type]} [description]
 */
export const initfetchRepoData = () => {
  return {
    type: INIT_SEARCH_REQUEST,
    isLoading: true
  };
};

/**
 * [initialDetailsData description]
 * @return {[type]} [description]
 */
export const initialDetailsData = () => {
  return {
    type: INIT_FETCH_SHIPMENT_DETAILS,
    isFetching: true
  };
};

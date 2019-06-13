/**
 * @Author: harsha
 * @Date:   2019-04-28T15:21:31+05:30
 * @Last modified by:   harsha
 * @Last modified time: 2019-06-12T15:28:51+05:30
 */
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import ShipmentReducers from "./fetchShipmentReducers";

export default combineReducers({
  shipmentStack: ShipmentReducers
});

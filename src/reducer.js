import { combineReducers } from "redux";
import {
  INACTIVE_ADD_TODO,
  ADD_TODO,
  ADD_TODO_SUCCESS,
  ACTIVE_ADD_TODO,
  CHANGE_STATUS_TODO,
  CHANGE_STATUS_TODO_SUCCESS,
  CONNECT_ERROR,
  RUN_SPINNER,
  INIT_TODO_LIST,
  INIT_TODO_LIST_ERROR,
  STOP_SPINNER,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  SET_FILTER,
  ALL
} from "./constants";

const initStore = {
  addIsActive: false,
  filterBy: ALL
};

function listReducer(list = [], action) {
  switch (action.type) {
    case ADD_TODO:
      list = [...list, action.payload.newItem];
      break;
    case ADD_TODO_SUCCESS:
      break;
    case CHANGE_STATUS_TODO:
      list = list.map(el =>
        Object.assign({}, el, {
          status: action.payload.key === el.key ? !el.status : el.status
        })
      );

      break;
    case CHANGE_STATUS_TODO_SUCCESS:
      break;
    case DELETE_TODO:
      list = list.filter(el => action.payload.key !== el.key);

      break;
    case DELETE_TODO_SUCCESS:
      break;
    case INIT_TODO_LIST:
      list = action.payload.list;

      break;

    default:
  }
  return list;
}
function addButtonReducer(state = initStore, action) {
  switch (action.type) {
    case INIT_TODO_LIST_ERROR:
      state = Object.assign({}, state, { error: CONNECT_ERROR });

      break;
    case RUN_SPINNER:
      state = Object.assign({}, state, { spinner: true });

      break;
    case STOP_SPINNER:
      state = Object.assign({}, state, { spinner: false });

      break;
    case SET_FILTER:
      state = Object.assign({}, state, { filterBy: action.payload });

      break;
    case ACTIVE_ADD_TODO:
      state = Object.assign({}, state, { addIsActive: true });
      break;
    case INACTIVE_ADD_TODO:
      state = Object.assign({}, state, { addIsActive: false });
      break;

    default:
  }
  return state;
}
export default combineReducers({ list: listReducer, addButtonReducer });

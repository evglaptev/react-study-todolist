import { createStore, combineReducers, applyMiddleware } from "redux";

const initStore = {
  addIsActive: false
};

function todoReducer(state = initStore, action) {
  console.log("action_type----------->", action.type);
  console.log("state----------->", state);
  switch (action.type) {
    case "ADD_TODO":
      state = Object.assign({}, state, { list: [...state.list, action.el] });
      break;
    case "ADD_TODO_SUCCESS":
      break;
    case "CHANGE_STATUS_TODO":
      state = Object.assign({}, state, {
        list: state.list.map(el =>
          Object.assign({}, el, {
            status: action.key === el.key ? !el.status : el.status
          })
        )
      });

      break;
    case "CHANGE_STATUS_TODO_SUCCESS":
      console.log("CHANGE_STATUS_TODO_SUCCESS");

      break;
    case "DELETE_TODO":
      state = Object.assign({}, state, {
        list: state.list.filter(el => action.key !== el.key)
      });

      break;
    case "DELETE_TODO_SUCCESS":
      console.log("DELETE_TODO_SUCCESS");

      break;
    case "ACTIVE_ADD_TODO":
      state = Object.assign({}, state, { addIsActive: true });
      console.warn("newState--> ", state);
      break;
    case "INACTIVE_ADD_TODO":
      state = Object.assign({}, state, { addIsActive: false });

      break;
    case "INIT_TODO_LIST":
      state = Object.assign({}, state, action.todoList);
      console.log("INIT_TODO_LIST");
      break;

    default:
  }
  return state;
}
export default combineReducers({ todoReducer: todoReducer });

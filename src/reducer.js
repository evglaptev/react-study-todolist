const initStore = {
  addIsActive: false
};

export default function todoReducer(state = initStore, action) {
  switch (action.type) {
    case "ADD_TODO":
      state = Object.assign({}, state, { list: [...state.list, action.el] });
      break;
    case "ADD_TODO_SUCCESS":
      console.log("ADD_TODO_SUCCESS");
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
    case "ACTIVE_ADD_TODO":
      state = Object.assign({}, state, { addIsActive: true });

      break;
    case "INACTIVE_ADD_TODO":
      state = Object.assign({}, state, { addIsActive: false });

      break;
    case "INIT_TODO_LIST":
      state = Object.assign({}, state, action.todoList);
      console.log("INIT_TODO_LIST");
      break;

    default:
      console.log("action_type", action.type);
      console.warn("default action type");
  }
  return state;
}
// export default combineReducers({ todoReducer });

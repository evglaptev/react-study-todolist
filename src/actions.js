const initStore = {
  list: [
    { text: "Make TODO list", status: true },
    { text: "Buy a ticket for metro", status: false }
  ]
};

export default function todoReducer(state = initStore, action) {
  switch (action.type) {
    case "ADD_TODO":
      state = {
        list: [...state.list, action.elemList]
      };
      break;
    case "ADD_TODO_SUCCESS":
      console.log("ADD_TODO_SUCCESS");
      break;
    case "CHANGE_STATUS_TODO":
      state = {
        list: state.list.map((el, i) => {
          const newItem = {
            text: el.text,
            status: action.index === i ? !el.status : el.status
          };
          if (action.index === i) {
            // let data = firebase.database().ref(`/todos/${i}/`);
            // data.update(newItem);
            // console.log("data", data);
            // console.log("upd", data.update({ lol: "kek azaza" }));
          }
          return newItem;
        })
      };

      break;
    case "CHANGE_STATUS_TODO_SUCCESS":
      console.log("CHANGE_STATUS_TODO_SUCCESS");

      break;

    default:
      console.warn("default action type");
  }
  return state;
}

const initStore = {
  list: [
    { text: "Make TODO list", status: true },
    { text: "Buy a ticket for metro", status: false }
  ]
};
export default function todoReducer(firebase) {
  const config = {
    apiKey: "AIzaSyB9lnOWc-6SkYbdO0tPSZyCY38VXNFVQsE",
    authDomain: "study-database.firebaseapp.com",
    databaseURL: "https://study-database.firebaseio.com",
    projectId: "study-database",
    storageBucket: "study-database.appspot.com",
    messagingSenderId: "631285676671"
  };
  firebase.initializeApp(config);
  const database = firebase.database();
  return (state = initStore, action) => {
    switch (action.type) {
      case "ADD_TODO":
        const newItem = { text: action.text, status: false };
        state = {
          list: [...state.list, newItem]
        };
        database
          .ref("users/" + 0 + "/todos/" + status.list.length)
          .set({ newItem });
        break;
      case "CHANGE_STATUS_TODO":
        state = {
          list: state.list.map((el, i) => ({
            text: el.text,
            status: action.index === i ? !el.status : el.status
          }))
        };
        if (action.index === i) {
          database.ref("users/" + 0 + "/todos/" + i).set({ newItem });
        }

        break;

      default:
        console.warn("default action type");
    }
    return state;
  };
}

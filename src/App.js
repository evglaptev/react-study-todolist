import React, { Component } from "react";
import ItemList from "./ItemList";
import { createStore } from "redux";
import { connect } from "react-redux";
import * as firebase from "firebase";

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

class App extends Component {
  change = key => () => {
    this.props.onChangeStatus(key);
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("componentDidMount");
    console.log("this.props", this.props);
    this.props.getDataFromServer();
  }

  getList() {
    return this.props.testStore &&
      this.props.testStore.list &&
      this.props.testStore.list.length > 0 ? (
      this.props.testStore.list.map(data => (
        <ItemList
          key={data.key}
          change={this.change(data.key)}
          data={{ text: data.text, status: data.status }}
        />
      ))
    ) : (
      <label>TodoList is empty!</label>
    );
  }

  clickAddBtn = e => {
    if (this.input.value !== "") {
      this.props.onAddTodo(this.input.value);
      this.input.value = "";
    }
  };

  render() {
    return (
      <div>
        <ul>{this.getList()}</ul>
        <input type="text" ref={el => (this.input = el)} />
        <button
          disabled={!this.props.testStore.addIsActive}
          onClick={this.clickAddBtn.bind(this)}
        >
          add
        </button>
      </div>
    );
  }
}

export default connect(
  state => {
    console.log("state", state);
    return {
      testStore: state
    };
  },
  dispatch =>
    (database => ({
      onAddTodo: async text => {
        dispatch({ type: "INACTIVE_ADD_TODO" });
        const newKey = database.ref().push().key;
        let newObj = {};
        const newItem = { text: text, status: false, key: newKey };
        newObj[newKey] = newItem;
        dispatch({ type: "ADD_TODO", el: newItem });
        await database.ref().update(newObj);
        dispatch({ type: "ADD_TODO_SUCCESS" });
        dispatch({ type: "ACTIVE_ADD_TODO" });
      },
      onChangeStatus: async key => {
        dispatch({ type: "CHANGE_STATUS_TODO", key: key });
        dispatch(async (dis, getSt) => {
          const oldElem = getSt().list[key];
          await database
            .ref("/" + key)
            .update(Object.assign({}, oldElem, { status: !oldElem.status }));
          dispatch({ type: "CHANGE_STATUS_TODO_SUCCESS", key: key });
        });
      },
      getDataFromServer: async () => {
        let keys = [],
          arr = [],
          todoList = null;
        await database
          .ref("/")
          .once("value")
          .then(lol => (todoList = lol.val()));
        keys = Object.keys(todoList);
        arr = keys.map(key => todoList[key]);
        console.log("todolist", arr);
        dispatch({ type: "INIT_TODO_LIST", todoList: { list: arr } });
        dispatch({ type: "ACTIVE_ADD_TODO" });
      }
      // }
    }))(database)
)(App);

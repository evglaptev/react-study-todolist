import React, { Component } from "react";
import ItemList from "./ItemList";
import { createStore } from "redux";
import { connect } from "react-redux";
import {
  asyncAddTodo,
  asyncChangeStatus,
  asyncGetDataFromServer,
  asyncDeleteByKey
} from "./actions";
import { getDataBase } from "./firebase";
const database = getDataBase();

class App extends Component {
  change = key => () => {
    this.props.onChangeStatus(key);
  };
  delete = key => () => {
    this.props.deleteByKey(key);
  };

  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  componentDidMount() {
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
          delete={this.delete(data.key)}
          data={{ text: data.text, status: data.status }}
        />
      ))
    ) : (
      <label>TodoList is empty!</label>
    );
  }

  clickAddBtn = e => {
    const text = this.state.text;
    if (text !== "") {
      this.props.onAddTodo(text);
      this.setState({ text: "" });
    }
  };

  onChange = e => {
    let text = e.target.value;
    this.setState({ text });
  };

  filterBy = e => {
    this.props.filterBy("RESOLVED");
  };

  render() {
    return this.props.testStore.error === "CONNECT_ERROR" ? (
      <div>Bad network connection.</div>
    ) : this.props.testStore.spinner ? (
      <div>Loading...</div>
    ) : (
      <div>
        <ul>{this.getList()}</ul>
        <input type="text" value={this.state.text} onChange={this.onChange} />
        <button
          disabled={!this.props.addButtonReducer.addIsActive}
          onClick={this.clickAddBtn.bind(this)}
        >
          add
        </button>
        <button onClick={this.filterBy}>Filter!</button>
      </div>
    );
  }
}

export default connect(
  state => {
    console.log("state", state);
    console.log("state.filterBy", state.filterBy);
    return {
      testStore: {
        ...state,
        list: state.todoReducer.list.filter(el => {
          switch (state.todoReducer.filterBy) {
            case "ALL":
              return true;
            case "RESOLVED":
              return el.status;
            case "UNRESOLVER":
              return !el.status;

            default:
              console.warn("default case in mapToProps filter function");
              return true;
          }
        })
      },
      addButtonReducer: state.addButtonReducer
    };
  },
  dispatch =>
    (database => ({
      onAddTodo: asyncAddTodo(database, dispatch),
      onChangeStatus: asyncChangeStatus(database, dispatch),
      deleteByKey: asyncDeleteByKey(database, dispatch),
      filterBy: filter => dispatch({ type: "SET_FILTER", payload: filter }),
      getDataFromServer: asyncGetDataFromServer(database, dispatch)
    }))(database)
)(App);

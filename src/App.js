import React, { Component } from "react";
import ItemList from "./ItemList";
import { createStore } from "redux";
import { connect } from "react-redux";
import {
  asyncAddTodo,
  asyncChangeStatus,
  asyncGetDataFromServer
} from "./actions";
import { getDataBase } from "./firebase";
const database = getDataBase();

class App extends Component {
  change = key => () => {
    this.props.onChangeStatus(key);
  };

  constructor(props) {
    super(props);
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
  state => ({
    testStore: state
  }),
  dispatch =>
    (database => ({
      onAddTodo: asyncAddTodo(database, dispatch),
      onChangeStatus: asyncChangeStatus(database, dispatch),
      getDataFromServer: asyncGetDataFromServer(database, dispatch)
    }))(database)
)(App);

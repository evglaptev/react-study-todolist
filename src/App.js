import React, { Component } from "react";
import { connect } from "react-redux";

import ItemList from "./ItemList";
import {
  asyncAddTodo,
  asyncChangeStatus,
  asyncGetDataFromServer,
  asyncDeleteByKey
} from "./actions";
import { getDataBase } from "./firebase";
import {
  SET_FILTER,
  RESOLVED,
  UNRESOLVER,
  ALL,
  CONNECT_ERROR
} from "./constants";

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
    return this.props.store.list && this.props.store.list.length > 0 ? (
      this.props.store.list.map(data => (
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

  filterResolve = () => {
    this.props.filterBy(RESOLVED);
  };
  filterUnresolve = () => {
    this.props.filterBy(UNRESOLVER);
  };
  filterAll = () => {
    this.props.filterBy(ALL);
  };

  render() {
    return this.props.addButtonReducer.error === CONNECT_ERROR ? (
      <div>Bad network connection.</div>
    ) : this.props.addButtonReducer.spinner ? (
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
        <div>
          <button onClick={this.filterAll}>all</button>
          <button onClick={this.filterResolve}>resolved</button>
          <button onClick={this.filterUnresolve}>unresolved</button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    store: {
      // ...state,
      list: state.list.filter(el => {
        switch (state.addButtonReducer.filterBy) {
          case ALL:
            return true;
          case RESOLVED:
            return el.status;
          case UNRESOLVER:
            return !el.status;

          default:
            console.warn("default case in mapToProps filter function");
            return true;
        }
      })
    },
    addButtonReducer: state.addButtonReducer
  }),
  dispatch =>
    (database => ({
      onAddTodo: asyncAddTodo(database, dispatch),
      onChangeStatus: asyncChangeStatus(database, dispatch),
      deleteByKey: asyncDeleteByKey(database, dispatch),
      filterBy: filter => dispatch({ type: SET_FILTER, payload: filter }),
      getDataFromServer: asyncGetDataFromServer(database, dispatch)
    }))(database)
)(App);

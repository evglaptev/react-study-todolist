import React, { Component } from "react";
import ItemList from "./ItemList";
import { createStore } from "redux";
import { connect } from "react-redux";
class App extends Component {
  change = ind => () => {
    this.props.onChangeStatus(ind);
  };

  constructor(props) {
    super(props);
  }

  getList() {
    return this.props.testStore.list.map((data, i) => (
      <ItemList
        key={i}
        change={this.change(i)}
        data={{ text: data.text, status: data.status }}
      />
    ));
  }

  clickAddBtn = e => {
    this.props.onAddTodo(this.input.value);
    this.input.value = "";
  };

  render() {
    return (
      <div>
        <ul>{this.getList()}</ul>
        <input type="text" ref={el => (this.input = el)} />
        <button onClick={this.clickAddBtn.bind(this)}>add</button>
      </div>
    );
  }
}

export default connect(
  state => ({
    testStore: state
  }),
  dispatch => ({
    onAddTodo: text => dispatch({ type: "ADD_TODO", text: text }),
    onChangeStatus: index =>
      dispatch({ type: "CHANGE_STATUS_TODO", index: index })
    // dispatch(() => setTimeout(() => console.log("lol"), 2000));
    // }
  })
)(App);

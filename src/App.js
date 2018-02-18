import React, { Component } from "react";
import ItemList from "./ItemList";
class App extends Component {
  state = {
    list: [
      { text: "Make TODO list", status: true },
      { text: "Buy a ticket for metro", status: false }
    ]
  };
  change = ind => e => {
    this.setState({
      list: this.state.list.map((data, i) => {
        return {
          text: data.text,
          status: i === ind ? !data.status : data.status
        };
      })
    });
  };

  getList() {
    return this.state.list.map((data, i) => (
      <ItemList
        key={i}
        change={this.change(i)}
        data={{ text: data.text, status: data.status }}
      />
    ));
  }

  clickBtn = e => {
    console.log(e);
    console.log("input--> ", this.input.value);
    this.setState({
      list: [...this.state.list, { text: this.input.value, status: false }]
    });
    this.input.value = "";
  };

  render() {
    return (
      <div>
        <ul>{this.getList()}</ul>
        <input type="text" ref={el => (this.input = el)} />
        <button onClick={this.clickBtn.bind(this)} />
      </div>
    );
  }
}

export default App;

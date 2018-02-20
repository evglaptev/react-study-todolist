import React, { Component } from "react";
import "./ItemList.css";
class ItemList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  click(e) {
    this.props.change();
  }

  render() {
    return (
      <li>
        <div onClick={this.click.bind(this)}>
          <div className="point" />
          <span className={this.props.data.status ? "resolved" : "unresolved"}>
            {this.props.data.text}
          </span>
        </div>
      </li>
    );
  }
}
export default ItemList;

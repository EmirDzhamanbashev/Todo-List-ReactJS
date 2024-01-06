import React, { Component } from "react";
import { Button } from "reactstrap";

export default class ClearAllTodos extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const {handleClearAllTodos} = this.props;
    return (
      <>
        <Button onClick={handleClearAllTodos} color="danger">Clear All Todos</Button>
      </>
    );
  }
}

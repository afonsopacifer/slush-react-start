import React from "react";
import ReactDom from "react-dom";
import Hello from "./hello.js";

class Layout extends React.Component {
  render() {
    return (
      <Hello />
    );
  }
}

ReactDom.render(<Layout/>, document.getElementById('app'));

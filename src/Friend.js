import React from "react";

export default class App extends React.Component {
  render() {
    return (
      <div style={{ marginLeft: "10px" }}>
        <img
          src={`/img/avatar/${this.props.id}.png`}
          alt=""
          height="100"
          width="100"
        />
        <p style={{ margin: 10 }}> {this.props.pick} </p>
      </div>
    );
  }
}

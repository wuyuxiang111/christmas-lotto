import React from "react";
import "./App.css";
import Friend from "./Friend";
import Background from "./img/bg2.jpg";

const INTERVAL_NOT_STARTED = -1;

export default class App extends React.Component {
  state = {
    results: [1, 2, 3, 4, 5, 6],
    intervalId: INTERVAL_NOT_STARTED,
    pool: []
  };

  componentDidMount() {
    this.generatePool();
  }

  isRolling() {
    var { intervalId } = this.state;
    return intervalId !== INTERVAL_NOT_STARTED;
  }

  generatePool() {
    var { pool } = this.state;
    function generate(i, result) {
      if (i >= 6) {
        pool.push(Array.from(result.map(t => t + 1)));
        return;
      }

      for (var j = 0; j < 6; j++) {
        if (Math.floor(i/2) !== Math.floor(j/2) && result.indexOf(j) === -1) {
          result.push(j);
          generate(i + 1, result);
          result.pop(j);
        }
      }
    }
    generate(0, []);

    this.setState({ pool });
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  roll() {
    var { pool } = this.state;
    this.setState({
      results: pool[this.getRandomInt(0, pool.length)]
    });
  }

  stop() {
    var { intervalId } = this.state;
    clearInterval(intervalId);
    this.setState({
      intervalId: INTERVAL_NOT_STARTED
    });
  }

  onClick() {
    if (this.isRolling()) {
      this.stop();
    } else {
      this.setState({
        intervalId: setInterval(this.roll.bind(this), 50)
      });
    }
  }

  renderFriends() {
    var { results } = this.state;
    return (
      <div
        style={{
          display: "flex"
        }}
      >
        {[...Array(6).keys()].map(i => (
          <Friend id={i} pick={results[i]} />
        ))}
      </div>
    );
  }

  render() {
    return (
      <div
        className="App"
        style={{
          display: "flex",
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <div
          style={{
            alignItems: "center",
            marginLeft: "150px"
          }}
        >
          <p>!! 2019 Christmas Lucky Draw !!</p>
          {this.renderFriends()}
          <img
            src={this.isRolling() ? "/img/stop.png" : "/img/start.png"}
            alt=""
            onClick={this.onClick.bind(this)}
            height={this.isRolling() ? "100" : "120"}
          />
        </div>
      </div>
    );
  }
}

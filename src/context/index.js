import React, { Component } from "react";
const MyContext = React.createContext();
import Toast from "react-native-toast-message";

class MyProvider extends Component {
  state = {
    stage: 1,
    players: [],
    result: "",
  };

  addPlayerHandler = (name) => {
    this.setState((prevState, props) => ({
      players: [...prevState.players, name],
    }));
  };

  removePlayerHandler = (idx) => {
    let newArray = this.state.players;
    newArray.splice(idx, 1);
    this.setState({ players: newArray });
  };

  nextHandler = () => {
    const { players } = this.state;

    if (players.length < 2) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Sorry",
        text2: "You need at least 2 players to play this game",
      });
    } else {
      this.setState({ stage: 2 }, () => {
        this.generateLoser();
      });
    }
  };

  generateLoser = () => {
    const { players } = this.state;
    const random = Math.floor(Math.random() * players.length);
    const loser = players[random];
    this.setState({
      result: players[Math.floor(Math.random() * players.length)],
    });
  };

  resetGame = () => {
    this.setState({ stage: 1, players: [], result: "" });
  };

  render() {
    return (
      <>
        <MyContext.Provider
          value={{
            state: this.state,
            addPlayer: this.addPlayerHandler,
            removePlayer: this.removePlayerHandler,
            next: this.nextHandler,
            getNewLoser: this.generateLoser,
            resetGame: this.resetGame,
          }}
        >
          {this.props.children}
        </MyContext.Provider>
      </>
    );
  }
}

export { MyContext, MyProvider };

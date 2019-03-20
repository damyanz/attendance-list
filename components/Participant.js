import React, { Component } from "react";
import { Text, View } from "react-native";
import Styles from "../constants/Styles";

export default class Participant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }
  render() {
    return (
      <View
        style={[
          Styles.primary,
          { padding: 10, marginTop: 10, marginLeft: 15, marginRight: 15 }
        ]}
      >
        <Text style={{ fontSize: 20, color: "#FFFFFF" }}>
          {this.state.data.dane.imie} {this.state.data.dane.nazwisko}
        </Text>
      </View>
    );
  }
}

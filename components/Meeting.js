import React, { Component } from "react";
import { Text, View } from "react-native";
import Styles from "../constants/Styles";

export class Meeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dane: this.props.data,
      data: null
    };
  }

  componentWillMount = () => {
    let date = new Date(this.state.dane.dane.data.seconds * 1000);
    let day = date.getDate();
    let month = date.getMonth();

    let miesiace = [
      "styczeń",
      "luty",
      "marzec",
      "kwiecień",
      "maj",
      "czerwiec",
      "lipiec",
      "sierpień",
      "wrzesień",
      "październik",
      "listopad",
      "grudzień"
    ];

    let year = date.getFullYear();
    let formattedTime = `${day} ${miesiace[month]} ${year}`;

    this.setState({
      data: formattedTime
    });
  };
  render() {
    return (
      <View
        style={[
          Styles.primary,
          { padding: 10, marginTop: 10, marginLeft: 15, marginRight: 15 }
        ]}
      >
        <Text style={{ fontSize: 20, color: "#FFFFFF" }}>
          {this.state.data}
        </Text>
      </View>
    );
  }
}

export default Meeting;

import React, { Component } from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import Styles from "../constants/Styles";
import LogoutButton from "./LogoutButton";
import MenuButton from "./MenuButton";

class Mapa extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: null,
    title: `Witaj, ${navigation.state.params.title}`,
    headerStyle: Styles.primary_dark,
    headerTitleStyle: Styles.headerTitleStyle,
    headerRight: <LogoutButton navigation={navigation} />
  });

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount = () => {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  };
  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  };
  handleBackPress = () => {
    return true;
  };
  getName = () => {
    return this.props.navigation.state.params.name;
  };
  componentDidMount = () => {};

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MenuButton
          data={{
            text: "SPOTKANIA",
            src: require("../assets/images/spotkania.png")
          }}
          onPress={() => this.props.navigation.navigate("meetings")}
        />
        <MenuButton
          data={{
            text: "UCZESTNICY",
            src: require("../assets/images/uczestnicy.png")
          }}
          onPress={() => this.props.navigation.navigate("participants")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Mapa;

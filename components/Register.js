import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Image,
  BackHandler
} from "react-native";
import MyButton from "./MyButton";
import firebase from "firebase";

class Register extends Component {
  static navigationOptions = {
    //headerLeft: null,
    title: "Rejestracja",
    headerStyle: {
      backgroundColor: "#FFC107"
    },
    headerTitleStyle: {
      color: "#000000"
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      login: "",
      haslo: "",
      errorMessage: ""
    };
  }

  loadUsers = () => {};
  loginPage = () => {
    this.props.navigation.navigate("login");
  };

  componentWillMount = () => {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  };
  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  };
  handleBackPress = () => {
    this.props.navigation.navigate("login");
    return true;
  };

  addUser = () => {
    console.log("ADD!");
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.login, this.state.haslo)
      .then(() => console.log("sukces"))
      .catch(error => this.setState({ errorMessage: error.message }));
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.main} behavior="padding" enabled>
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 50
          }}
          source={require("../gfx/bike.jpg")}
        />
        <Text
          style={{
            color: "red",
            fontSize: 15,
            marginTop: 10,
            textAlign: "center"
          }}
        >
          {this.state.errorMessage}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => this.setState({ login: text })}
        />

        <TextInput
          style={[styles.input, { marginBottom: 20 }]}
          placeholder="Password"
          onChangeText={text => this.setState({ haslo: text })}
        />
        <View style={styles.button}>
          <MyButton
            data={{ text: "REGISTER" }}
            onPress={() => this.addUser()}
          />
        </View>
        <View style={styles.button}>
          <MyButton
            data={{ text: "MASZ JUŻ KONTO? ZALOGUJ SIĘ" }}
            onPress={() => this.loginPage()}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    width: "80%",
    borderBottomColor: "#ccc",
    borderBottomWidth: 2
  },
  main: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  form: {
    backgroundColor: "green",
    alignItems: "center"
  },

  label: {},
  button: {}
});

export default Register;

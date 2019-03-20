import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Image,
  BackHandler,
  TouchableOpacity
} from "react-native";
import firebase from "firebase";
import Styles from "../constants/Styles";

class Login extends Component {
  static navigationOptions = {
    headerLeft: null,
    title: "Skrawek nieba - lista obecności",
    headerStyle: Styles.primary_dark,
    headerTitleStyle: Styles.headerTitleStyle
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
  componentWillMount = () => {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  };
  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  };
  handleBackPress = () => {
    this.props.navigation.navigate("main");
    return true;
  };
  registerPage = () => {
    this.props.navigation.navigate("register");
  };
  signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.login, this.state.haslo)
      .then(() => this.props.navigation.navigate("loading"))
      .catch(error => {
        console.log(error.code);
        switch (error.code) {
          case "auth/network-request-failed":
            this.setState({
              errorMessage: `Błąd sieci. Sprawdź swoje połączenie z internetem.`
            });
            break;

          case "auth/invalid-email":
            this.setState({
              errorMessage: `Niepoprawny format nazwy użytkownika. Poprawny format: imie@nazwisko.pl`
            });
            break;

          case "auth/user-not-found":
            this.setState({
              errorMessage: `Taki użytkownik nie istnieje. Sprawdź swoją nazwę użytkownika.`
            });
            break;

          case "auth/wrong-password":
            this.setState({ errorMessage: `Błędne hasło.` });
            break;

          default:
            this.setState({
              errorMessage: `Wystąpił błąd: ${
                error.code
              }. Skontaktuj się z administratorem!`
            });
            break;
        }
      });
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.main} behavior="padding" enabled>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            style={Styles.logoRam}
            source={require("../assets/images/logoram.png")}
            resizeMode="stretch"
          />
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
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
            style={Styles.loginField}
            placeholder="Nazwa użytkownika"
            onChangeText={text => this.setState({ login: text })}
          />

          <TextInput
            secureTextEntry={true}
            style={Styles.loginField}
            placeholder="Hasło"
            onChangeText={text => this.setState({ haslo: text })}
          />

          <TouchableOpacity
            style={[Styles.button, Styles.accent]}
            onPress={() => this.signIn()}
          >
            <Text style={Styles.buttonText}>ZALOGUJ SIĘ</Text>
          </TouchableOpacity>
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
    backgroundColor: "white"
  },
  form: {
    backgroundColor: "green",
    alignItems: "center"
  },

  label: {},
  button: {}
});

export default Login;

import React, { Component } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import Styles from "../constants/Styles";
import firebase from "firebase";

export default class AddParticipant extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Dodaj uczestnika`,
    headerStyle: Styles.primary_dark,
    headerTintColor: "#FFFFFF",
    headerTitleStyle: Styles.headerTitleStyle
  });

  constructor(props) {
    super(props);
    this.state = {
      imie: null,
      nazwisko: null,
      errorMessage: null
    };
    console.log(this.props.navigation);
  }

  addParticipant = async (imie, nazwisko) => {
    let nav = this.props.navigation;
    this.setState({
      errorMessage: null
    });
    if (imie == null || imie == "" || nazwisko == null || nazwisko == "") {
      this.setState({
        errorMessage: "Dane nieprawidłowe!"
      });
    } else {
      const db = firebase.firestore();
      await db
        .collection("uczestnicy")
        .add({
          imie: imie,
          nazwisko: nazwisko
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          nav.navigate("participants");
          ToastAndroid.showWithGravityAndOffset(
            `Dodano uczestnika: ${imie} ${nazwisko}`,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
            25,
            50
          );
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.main} behavior="padding" enabled>
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
            placeholder="Imię"
            onChangeText={text => this.setState({ imie: text })}
          />

          <TextInput
            style={Styles.loginField}
            placeholder="Nazwisko"
            onChangeText={text => this.setState({ nazwisko: text })}
          />

          <TouchableOpacity
            style={[Styles.button, Styles.accent]}
            onPress={() =>
              this.addParticipant(this.state.imie, this.state.nazwisko)
            }
          >
            <Text style={Styles.buttonText}>DODAJ UCZESTNIKA</Text>
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

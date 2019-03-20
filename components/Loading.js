import React, { Component } from "react";
import { View, Text, YellowBox } from "react-native";
import firebase from "firebase";
import { PulseIndicator } from "react-native-indicators";
import Styles from "../constants/Styles";

YellowBox.ignoreWarnings(["Setting a timer"]);

// var config = {
//   apiKey: "AIzaSyDt_HOHChmX2ZLc_uPCtTSY66EFGdwwuGg",
//   authDomain: "zapalski4ib1.firebaseapp.com",
//   databaseURL: "https://zapalski4ib1.firebaseio.com",
//   projectId: "zapalski4ib1",
//   storageBucket: "zapalski4ib1.appspot.com",
//   messagingSenderId: "663059612790"
// };
// firebase.initializeApp(config);

class Loading extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentWillMount = () => {
  //   BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  // }
  // componentWillUnmount = () => {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);

  // }
  // handleBackPress = () => {
  //   this.props.navigation.navigate("main");
  //   return true;
  // }
  componentDidMount = async () => {
    await this.setState({ state: this.state });
    firebase.auth().onAuthStateChanged(user => {
      if (user === null) {
        this.props.navigation.navigate("login");
      } else {
        const db = firebase.firestore();

        let document = db.collection("kadra").doc(user.uid);
        const navigation = this.props.navigation;

        document
          .get()
          .then(function(doc) {
            if (doc.exists) {
              console.log(doc.data().imie);
              navigation.navigate("mapa", { title: doc.data().imie });
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          })
          .catch(function(error) {
            console.log("Error getting document:", error);
          });
      }

      // jeśli user istnieje, wtedy przechodzimy do wyświetlenia ekranu z listą danych pobranych z bazy firebase
      // jeśli nie istnieje - wtedy przechodzimy do ekranu logowania
    });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <PulseIndicator color="#FF4081" />
        <Text style={[Styles.text_secondary, { marginBottom: 10 }]}>
          Proszę czekać...
        </Text>
      </View>
    );
  }
}

export default Loading;

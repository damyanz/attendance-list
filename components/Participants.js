import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import Styles from "../constants/Styles";
import firebase from "firebase";
import Participant from "./Participant";
import { PulseIndicator } from "react-native-indicators";

export default class Participants extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Lista uczestników`,
    headerStyle: Styles.primary_dark,
    headerTintColor: "#FFFFFF",
    headerTitleStyle: Styles.headerTitleStyle,
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("addparticipant")}>
        <Text style={{ fontSize: 40, color: "#FFFFFF", marginRight: 10 }}>
          +
        </Text>
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      uczestnicy: null
    };
  }

  componentWillMount = async () => {
    let kids = [];
    let that = this;
    state = this.state;
    const db = firebase.firestore();

    db.collection("uczestnicy")
      .orderBy("nazwisko")
      .onSnapshot(function(querySnapshot) {
        that.setState({
          uczestnicy: null
        });
        kids = [];
        querySnapshot.forEach(function(doc) {
          kids.push({ id: doc.id, dane: doc.data() });
        });
        console.log(kids);
        that.setState({
          uczestnicy: kids
        });
      });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.uczestnicy != null ? (
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.uczestnicy}
              renderItem={({ item }) => <Participant data={item} />}
            />
          </View>
        ) : (
          <View
            style={{ flex: 1, alignContent: "center", alignItems: "center" }}
          >
            <PulseIndicator color="#FF4081" />
            <Text style={[Styles.text_secondary, { marginBottom: 10 }]}>
              Pobieranie uczestników...
            </Text>
          </View>
        )}
      </View>
    );
  }
}

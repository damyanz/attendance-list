import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import Styles from "../constants/Styles";
import firebase from "firebase";
import { PulseIndicator } from "react-native-indicators";
import Meeting from "./Meeting";

class Meetings extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Lista spotkań`,
    headerStyle: Styles.primary_dark,
    headerTintColor: "#FFFFFF",
    headerTitleStyle: Styles.headerTitleStyle,
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("addmeeting")}>
        <Text style={{ fontSize: 40, color: "#FFFFFF", marginRight: 10 }}>
          +
        </Text>
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      spotkania: null
    };
  }

  componentWillMount = async () => {
    let meetings = [];
    let that = this;
    state = this.state;
    const db = firebase.firestore();

    // await db.collection("uczestnicy").orderBy("nazwisko").get().then(function (querySnapshot) {
    //     querySnapshot.forEach(function (doc) {
    //         kids.push({ id: doc.id, dane: doc.data() });
    //     });
    // });

    // this.setState({
    //     uczestnicy: kids
    // })
    db.collection("spotkania")
      .orderBy("data")
      .onSnapshot(function(querySnapshot) {
        that.setState({
          spotkania: null
        });
        meetings = [];
        querySnapshot.forEach(function(doc) {
          meetings.push({ id: doc.id, dane: doc.data() });
        });
        console.log(meetings);
        that.setState({
          spotkania: meetings
        });
      });
    // db.collection("uczestnicy").orderBy("nazwisko").onSnapshot(function (querySnapshot) {
    //   that.setState({
    //     uczestnicy: null
    //   })
    //   kids = [];
    //   querySnapshot.forEach(function (doc) {
    //     kids.push({ id: doc.id, dane: doc.data() });
    //   });
    //   console.log(kids)
    //   that.setState({
    //     uczestnicy: kids
    //   })

    // });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.spotkania != null ? (
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.spotkania}
              renderItem={({ item }) => <Meeting data={item} />}
            />
          </View>
        ) : (
          <View
            style={{ flex: 1, alignContent: "center", alignItems: "center" }}
          >
            <PulseIndicator color="#FF4081" />
            <Text style={[Styles.text_secondary, { marginBottom: 10 }]}>
              Pobieranie spotkań...
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default Meetings;

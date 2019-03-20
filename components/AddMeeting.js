import React, { Component } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  DatePickerAndroid,
  Image
} from "react-native";
import Styles from "../constants/Styles";
import firebase from "firebase";

class AddMeeting extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Dodaj spotkanie`,
    headerStyle: Styles.primary_dark,
    headerTintColor: "#FFFFFF",
    headerTitleStyle: Styles.headerTitleStyle
  });
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      errorMessage: null
    };
  }

  addMeeting = async () => {
    let nav = this.props.navigation;

    let seconds =
      Date.parse(
        `${engMonths[this.state.data.month]} ${this.state.data.day}, ${
          this.state.data.year
        }`
      ) / 1000;
    console.log(this.state.data.monthString);

    let spotkanie = {
      dzien: this.state.data.day,
      miesiac: this.state.data.monthString,
      rok: this.state.data.year
    };
    console.log(`SEKUNDY ${seconds}`);
    let timestamp = new firebase.firestore.Timestamp(seconds, 0);
    this.setState({
      errorMessage: null
    });
    const db = firebase.firestore();
    await db
      .collection("spotkania")
      .add({
        data: timestamp,
        obecni: []
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        nav.navigate("meetings");
        ToastAndroid.showWithGravityAndOffset(
          `Dodano spotkanie w dniu: ${spotkanie.dzien} ${spotkanie.miesiac} ${
            spotkanie.rok
          }`,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          25,
          50
        );
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };

  openDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({
          data: {
            day: day,
            month: month,
            monthString: miesiace[month],
            year: year
          }
        });
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };
  componentDidMount = async () => {};
  componentWillMount = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();

    let year = date.getFullYear();
    let formattedTime = `${day} ${miesiace[month]} ${year}`;

    this.setState({
      data: {
        day: day,
        month: month,
        monthString: miesiace[month],
        year: year
      }
    });
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
          <View
            style={[
              Styles.primary,
              {
                flex: 0,
                flexDirection: "row",
                width: "80%",
                justifyContent: "space-between"
              }
            ]}
          >
            <View style={{ flex: 5 }}>
              <Text style={[Styles.buttonText, { fontSize: 20 }]}>
                {this.state.data.day} {this.state.data.monthString}{" "}
                {this.state.data.year}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                Styles.accent,
                { justifyContent: "center", alignItems: "center", flex: 1 }
              ]}
              onPress={() => this.openDatePicker()}
            >
              <Image
                style={{ width: 40, height: 40 }}
                source={require("../assets/images/calendar.png")}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[Styles.button, Styles.accent]}
            onPress={() => this.addMeeting()}
          >
            <Text style={Styles.buttonText}>DODAJ SPOTKANIE</Text>
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

const miesiace = [
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

const engMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export default AddMeeting;

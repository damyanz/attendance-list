import { createStackNavigator } from "react-navigation";
// import Main from "./components/Main";
import Loading from "./components/Loading";
//import Register from "./components/Register";
import Login from "./components/Login";
// import Stations from "./components/Stations";
// import OneStation from "./components/OneStation";
import Mapa from "./components/Mapa";
import firebase from "firebase";
import Participants from "./components/Participants";
import AddParticipant from "./components/AddParticipant";
import AddMeeting from "./components/AddMeeting";
import Meetings from "./components/Meetings";

import firestore from "firebase/firestore";

config = {
  apiKey: "AIzaSyARPKdXWFAD8cE249N97UbE0sUReG2bkM4",
  authDomain: "attendancelist-15179.firebaseapp.com",
  databaseURL: "https://attendancelist-15179.firebaseio.com",
  projectId: "attendancelist-15179",
  storageBucket: "attendancelist-15179.appspot.com",
  messagingSenderId: "1039590987864"
};
firebase.initializeApp(config);

const App = createStackNavigator({
  loading: { screen: Loading },
  login: { screen: Login },
  meetings: { screen: Meetings },
  mapa: { screen: Mapa },
  participants: { screen: Participants },
  addparticipant: { screen: AddParticipant },
  addmeeting: { screen: AddMeeting }
});

//s
export default App;

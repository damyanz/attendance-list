import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import firebase from "firebase";

class LogoutButton extends Component {

    signOut = () =>{
        firebase.auth().signOut().then(function() {
          }, function(error) {
              console.log(`Błąd: ${error}`)
          });
    }

  render() {
    return (
      <TouchableOpacity onPress={()=>this.signOut()}>
        <Image style={{width: 24, height: 24, marginRight:10}} source={require('../assets/images/exit.png')}></Image>
      </TouchableOpacity>
    )
  }
}

export default LogoutButton

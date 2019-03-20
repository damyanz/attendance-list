import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import Styles from "../constants/Styles"



class MenuButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.data.text,
            src: this.props.data.src
        };
      }
    

componentDidMount=()=>{
    
}
  render() {
    return (
      <TouchableOpacity style={[Styles.accent,Styles.menuButton]} onPress={this.props.onPress}>
      {
          this.state.src != null?
          <Image style={{width: 48,height:48}} source={this.state.src}></Image>
          :
          null
      }
        
        <Text style={Styles.buttonText}>{this.state.text}</Text>
      </TouchableOpacity>
    )
  }
}

export default MenuButton

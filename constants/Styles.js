import { StyleSheet } from "react-native"

export default StyleSheet.create({
   primary: {
      backgroundColor: '#2196F3'
   },
   primary_dark: {
      backgroundColor: '#1976D2'
   },
   primary_light: {
      backgroundColor: '#BBDEFB'
   },
   accent: {
      backgroundColor: '#FF4081'
   },
   text_primary: {
      color: '#212121'
   },
   text_secondary: {
      color: '#757575'
   },
   divider: {
      backgroundColor: '#BDBDBD'
   },


   headerStyle: {
      backgroundColor: '#2196F3'
   },
   headerTitleStyle: {
      color: '#FFFFFF'
   },

   logoRam: {
      width: 200,
      height: 200,
      borderWidth: 1,
      borderRadius: 125
   },

   loginField: {
      width: '80%',
      fontSize: 20,
      borderBottomColor: '#D3D3D3',
      borderBottomWidth: 1,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 5,
      marginTop: 15
   },

   button: {
      flex: 0,
      width: '80%',
      marginTop: 30
   },
   buttonText: {
      color: '#FFFFFF',
      fontSize: 25,
      textAlign: 'center',
      padding: 10,

   },
   menuButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin:15,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,

   }
})
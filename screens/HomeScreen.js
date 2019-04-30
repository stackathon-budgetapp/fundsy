import React from 'react';
import { AppRegistry, Keyboard, ScrollView, Text, TextInput, View, Button, AsyncStorage } from 'react-native';
import axios from 'axios'
import {ngrok_address} from '../secrets'
import SignUp from '../components/SignUp'

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     signedIn: false,
     userId: ''
    }

  }
  static navigationOptions = {
    title: 'app.json',
  };

  async componentDidMount() {
    try {
      const userId = await AsyncStorage.getItem('userId')
      if (!userId) {
        console.log('STATE OF HOMESCREEN DOES NOT HAVE USER ON IT!')
        return ({signedIn: false, userId: ''})
      } else { 
        console.log('WE HAVE A USER LOGGED IN!')
        console.log('userId should be: ', userId)
        return ({signedIn: true, userId: userId})
      }
    } catch (err){
      console.log('err in state!', err)
    }
  }
  signOut = async() => {
    await AsyncStorage.removeItem('userId')
    this.setState({signedIn: false, userId: ''})
    console.log('USER IS NOW LOGGED OUT!')
  }

  signIn = async () => {
    console.log('SIGNING IN USER!')
    const user = await AsyncStorage.getItem('userId')
    console.log('logged in user here!: ', user)
    this.setState({signedIn: true, userId: user})
    
  }

  render() {
    console.log('HOME SCREEN RENDERING!')
    const {signedIn, userId} = this.state
    return (
      signedIn ? 
        <View>
          <Text>{`USER LOGGED IN RIGHT NOW: USER ${userId}`}</Text>
          <Button title="Sign Out"
                  onPress={this.signOut}
          ></Button>
        </View> :
        <SignUp signIn={this.signIn}/>
    )
  }
}


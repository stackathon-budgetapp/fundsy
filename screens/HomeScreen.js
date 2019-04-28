import React from 'react';
import { AppRegistry, Keyboard, ScrollView, Text, TextInput, View, Button } from 'react-native';
import axios from 'axios'
import {ngrok_address} from '../secrets'
import UserContext from '../context'

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    return (
      <UserContext.Consumer>
        {
          (user) => (
              !user.userId ? 
              <ScrollView style={{padding: 10}}>
              <Text>{`CURRENT USERID: ${user.userId}`}</Text>
              <TextInput keyboardType='default'
                style={{height: 40}}
                placeholder="Enter Username"
                onChangeText={(user) => this.setState({username: user})}
                value={this.state.username}
              />
              <TextInput keyboardType='default'
                style={{height: 40}}
                placeholder="Enter Password"
                onChangeText={(pass) => this.setState({password: pass})}
                value={this.state.password}
              /> 
              <Button
                onPress={async () => {
                  Keyboard.dismiss()
                  const newUser = await this.createUser()
                  user.signUpNewUser(newUser)
                  this.setState({
                    username: '',
                    password: ''
                  })
                }}
                title="Sign Up"
                color="#841584"
                />
            </ScrollView> : 
            
            <View>
              <Text>TRANSACTION DATA</Text>
            </View>
            
            
          )
        }
      </UserContext.Consumer>
      
    )
  }

  createUser = async () => {
    try {
      const {data} = await axios.post(`${ngrok_address}/auth/signup`, this.state)
      return data
    } catch (err) {
      console.log(err)
    }
  }
}


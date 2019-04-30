import React from 'react';
import { AppRegistry, Keyboard, ScrollView, Text, TextInput, View, Button, AsyncStorage } from 'react-native';
import axios from 'axios'
import {ngrok_address} from '../secrets'

export default class SignUp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    createUser = async () => {
        try {
          const {data} = await axios.post(`${ngrok_address}/auth/signup`, this.state)
          await AsyncStorage.setItem('userId', JSON.stringify(data.id))
          this.props.signIn()
        } catch (err) {
          console.log(err)
        }
      }

    render() {
        return (
            <ScrollView style={{padding: 10}}>
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
                onPress={() => {
                  Keyboard.dismiss()
                  this.createUser()
                //   this.props.signIn()
                  this.setState({
                    username: '',
                    password: ''
                  })
                }}
                title="Sign Up"
                color="#841584"
                />
            </ScrollView>
        )
    }
}
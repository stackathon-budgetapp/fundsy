import React, {Component} from 'react';
import { AppRegistry, Text, TextInput, View, Button } from 'react-native';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.onPressSubmit = this.onPressSubmit.bind(this)
  }
  static navigationOptions = {
    title: 'app.json',
  };


  onPressSubmit = () => {
    console.log(this.state)

  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Enter Username"
          onChangeText={(username) => this.setState({username})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Enter Password"
          onChangeText={(password) => this.setState({password})}
        />
        <Button
          onPress={this.onPressSubmit}
          title="Sign Up"
          color="#841584"
          />
      </View>
    )
  }
}

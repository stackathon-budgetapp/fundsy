import React from 'react';
import { ScrollView, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import PlaidAuthenticator from 'react-native-plaid-link';
import axios from 'axios'
import {ngrok_address} from '../secrets'
import UserContext from '../context'

class LinksScreen extends React.Component {
  constructor() {
    super() 

    this.state = {}
  }
  static navigationOptions = {
    title: 'Links',
  };

    render() {
      console.log('LINKS SCREEN RENDERING!')
      return (
            <PlaidAuthenticator
              onMessage={this.onMessage}
              publicKey="65546042f77b1fd26dea9589eeddf7"
              env="sandbox"
              product="auth,transactions"
              clientName="Fundsy"
              selectAccount={false}
            />
      )
            }
     
    onMessage = async (data) => {
      const userId = await AsyncStorage.getItem('userId')
      if (data.action === "plaid_link-undefined::connected") {
        await axios.post(`${ngrok_address}/plaid/get_access_token`, {public_token: data.metadata.public_token, userId: userId})
      }
      this.setState({data})
    }
}


export default LinksScreen


import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import PlaidAuthenticator from 'react-native-plaid-link';
import axios from 'axios'
import {ngrok_address} from '../secrets'

export default class LinksScreen extends React.Component {
  constructor() {
    super() 

    this.state = {}
  }
  static navigationOptions = {
    title: 'Links',
  };

    render() {
      return <PlaidAuthenticator
        onMessage={this.onMessage}
        publicKey="65546042f77b1fd26dea9589eeddf7"
        env="sandbox"
        product="auth,transactions"
        clientName="Fundsy"
        selectAccount={false}
      />
    }
     
    onMessage = async (data) => {
      if (data.action === "plaid_link-undefined::connected") {
        await axios.post(`${ngrok_address}/plaid/get_access_token`, {public_token: data.metadata.public_token})
      }
      console.log(data)
      this.setState({data})
    }
}


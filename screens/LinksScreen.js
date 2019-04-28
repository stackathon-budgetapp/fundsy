import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import PlaidAuthenticator from 'react-native-plaid-link';
import axios from 'axios'
import {ngrok_address} from '../secrets'
import UserContext from '../context';

class LinksScreen extends React.Component {
  constructor() {
    super() 

    this.state = {}
  }
  static navigationOptions = {
    title: 'Links',
  };

    render() {
      return (
        <UserContext.Consumer>
          {
            (user) => (
              <View>
          <Text>{`CURRENT USERID: ${user.userId}`}</Text>
          <PlaidAuthenticator
          onMessage={this.onMessage}
        publicKey="65546042f77b1fd26dea9589eeddf7"
        env="sandbox"
        product="auth,transactions"
        clientName="Fundsy"
        selectAccount={false}
      />
      </View>
            )
          }
        </UserContext.Consumer>
      
       
      )
    }
     
    onMessage = async (data) => {
      if (data.action === "plaid_link-undefined::connected") {
        await axios.post(`${ngrok_address}/plaid/get_access_token`, {public_token: data.metadata.public_token})
      }
      this.setState({data})
    }
}


export default LinksScreen


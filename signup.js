// import React from 'react'
// import UserContext from './context'

// class SignUpForm extends React.Component {
//     constructor(props){
//         super() 
//         this.state = {
//             username: '',
//             password: ''
//           }
//     }
//     render() {
//         return (
//             <View style={{padding: 10}}>
//             <TextInput
//               style={{height: 40}}
//               placeholder="Enter Username"
//               onChangeText={(user) => this.setState({username: user})}
//             />
//             <TextInput
//               style={{height: 40}}
//               placeholder="Enter Password"
//               onChangeText={(pass) => this.setState({password: pass})}
//             />
//             <Button
//               onPress={this.onPressSubmit}
//               title="Sign Up"
//               color="#841584"
//               />
//           </View>
//         )
//     }
// }

// SignUpForm.contextType = UserContext
// export default SignUpForm
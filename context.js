import React from 'react'

export const loggedInUser = {
    userId: 0,
    // signUpNewUser: () => {},
    // signOutUser: () => {}
}

const UserContext = React.createContext(loggedInUser)

export default UserContext
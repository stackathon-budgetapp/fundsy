import React from 'react'

export const loggedInUser = {
    userId: 0,
    signUpNewUser: () => {}
}

const UserContext = React.createContext(loggedInUser)

export default UserContext
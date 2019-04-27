import axios from 'axios'
import {ngrok_address} from '../secrets'

const SET_USER = 'SET_USER'

const setUser = (user) => ({
    type: SET_USER,
    user
})

export const postUserThunk = (user) => {
    (setUser(user))
           
}

const Initial_State = {
    user: {}
}

export default reducer = (state = Initial_State, action)=>{
    switch (action.type) {
        case SET_USER: 
            return ({user: action.user})
        default: 
            return state
    }
}



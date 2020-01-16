import React from 'react'
import {updateObject} from './utility';
const initialState={
    count:0,
    token:null,
    startSignUp:false,
    signUpSuccess:false,
    signUpFail:false,
    signupError:null
}
export const AppContext=React.createContext({initialState,dispatch:()=>{}})

const reducer=(state,action)=>{
    switch(action.type){
        case 'AUTH_SUCCESS':
            return updateObject(state,{authStart:false,authSuccess:true,authFail:false,token:action.payload.token})
        case 'AUTH_FAIL':
            return updateObject(state,{authStart:false,authSuccess:false,authFail:true,authError:action.payload.error})
        case 'SIGNUP_START':
            return updateObject(state,{startSignUp:true,signUpSuccess:false,signUpFail:false})
        case 'SIGNUP_SUCCESS':
            return updateObject(state,{startSignUp:false,signUpSuccess:true,signUpFail:false})
        case 'SIGNUP_FAIL':
            return updateObject(state,{startSignUp:false,signUpSuccess:false,signUpFail:true,signupError:action.payload.error})
        default:
            return state
    }
}

export default function StateProvider(props){
    const [state,dispatch]=React.useReducer(reducer,initialState)
    
    return (
        <AppContext.Provider value={{state,dispatch}}>
            {props.children}
        </AppContext.Provider>
        
        )
}

export const connect=(mapStateToProps,mapDispatchToProps)=>{

    return function(WrappedComponent){
        return (props)=>(
            <AppContext.Consumer>
            {store=>{
                const state=mapStateToProps?mapStateToProps(store.state):{}
                const dispatch=mapDispatchToProps?mapDispatchToProps(store.dispatch):{}
                return (
                    <WrappedComponent {...state} {...dispatch} />
                )
            }}
            </AppContext.Consumer>
        )
        
    }

}
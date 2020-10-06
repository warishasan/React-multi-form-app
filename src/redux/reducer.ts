import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit"
import { combineReducers } from '@reduxjs/toolkit'


export interface userState {
    firstName: string | null;
    lastName: string | null;
    email: string | null; 
    dob: string | null;
    checkedAgreements: Boolean;
   
}

  const initialStateUser:userState = {
    firstName: null,
    lastName: null,
    email: null,
    dob: null,
    checkedAgreements: false
    
    
  }


const createProfile = createSlice({
    name: "Creating Profile",
    initialState: initialStateUser,
    reducers: {
    setPersonalInfo: (state, {payload}: PayloadAction<{firstName: string| null, lastName:string | null, email:string | null}>) => {
          
                return ({
                    ...state, firstName : payload.firstName, lastName: payload.lastName, email: payload.email
                }
                )
            

    },
    setDob: (state,  {payload}: PayloadAction<string | null>) => {
       
        return ({
            ...state, dob :payload
        })
},


    setCheckedAgreements: (state,  {payload}: PayloadAction<Boolean>) => {
       
    return ({
        ...state, checkedAgreements :payload
    })
},

    

    }
    
})





const Screen = createSlice({
    name: "Select Screen",
    initialState: "home",
    reducers: {
        selectScreen: (state,  {payload}: PayloadAction<"home" | "personalInfo" | "dob" | "agreements">) =>{

            return (
            
                 payload
            
            )
        }
    }
})



const rootReducer = combineReducers({userState:createProfile.reducer, screenState:Screen.reducer})



const store = configureStore({

    reducer: rootReducer
    
    })


export const { setPersonalInfo, setDob, setCheckedAgreements } = createProfile.actions
export const { selectScreen} = Screen.actions


export { store, createProfile, Screen }
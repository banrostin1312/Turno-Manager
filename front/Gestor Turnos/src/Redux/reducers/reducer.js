import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const appointmentSlice = createSlice({
    name:"appointment",
    initialState:{
        appointments:JSON.parse(localStorage.getItem("appointments")) || []
    },
    reducers:{
        addAppointment:(state,action) => {
        state.appointments = state.appointments.concat(action.payload)
        },
        removeAppointment: (state,action) => {
         state.appointments = state.appointments.filter((appointment)=> appointment.id !== action.payload )
        },
        setAppointments: (state, action) => {
            state.appointments = action.payload;
            state.loading = false;
            state.error = null;
            localStorage.setItem("appointments", JSON.stringify(state.appointments));
           
        },
        getAppointmentsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getAppointmentsSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },
        getAppointmentsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
 
})

export const userSlice = createSlice({
    name:"user",
    initialState:{
        user:{},
        token:null,
        isLoggedIn:false
    },
    reducers:{
        setUser: (state,action)=>{
        const { user, token } = action.payload;
       state.user = action.payload.user
       state.token = action.payload.token
       state.isLoggedIn = true;

       localStorage.setItem("user", JSON.stringify(user));
       localStorage.setItem("token", token);
       
      
      
        },


        clearUser: (state) =>{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("appointments");
       
        
       state.user = {}
       state.token = null
       state.isLoggedIn = false;
       
        },
        
    }

})



export const fetchUserAppointments = () => async (dispatch, getState) => {
    const { user } = getState().user; 
    if (!user || !user.id) {
        dispatch(getAppointmentsFailure("User ID not found"));
        return;
    }
    
    dispatch(getAppointmentsStart());
    try {
       
        const response = await axios.get(`http://localhost:3000/appointments/${user.id}`);
      
        const appointments = response.data;


        // const appointments = response.data.map((appointment) => ({
        //     ...appointment,
        //     status: appointment.status.toLowerCase(),
        // }));
  
        dispatch(setAppointments(appointments));
        dispatch(getAppointmentsSuccess());
    } catch (error) {
        dispatch(getAppointmentsFailure(error.message));
    }
};



export const {addAppointment,removeAppointment,setAppointments,getAppointmentsSuccess,getAppointmentsFailure ,getAppointmentsStart} = appointmentSlice.actions
export const {setUser,clearUser} = userSlice.actions
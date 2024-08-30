import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector,useDispatch} from "react-redux";
import { fetchUserAppointments } from "../Redux/reducers/reducer";
import styles from '../styles/AddAppointmentForm.module.css'
import Swal from "sweetalert2";


const AddAppointment = () => {
    const user = useSelector(state=> state.user.user)
    const dispatch = useDispatch();

const [appointmentData,setAppointmentData] = useState({
    status:"active",
    description:"",
    userId:user.id,
    date:"",
    time:""
});

const [failureMessage,setFailureMessage]= useState("");
const [getButtonDisabled,setButtonDisabled] = useState(false)
const[messageVisible,setMessageVisible] = useState(false)

const handleChange = (e) => {
const {name,value}= e.target;


if(name === "time") {
    if(value > "21:00"){
        setAppointmentData({
            ...appointmentData,
            [name]:"21:00"
        })
    }else if(value < "10:00"){
   setAppointmentData({
    ...appointmentData,
    [name]:"10:00"
   })
    }else{
        setAppointmentData({
            ...appointmentData,
            [name]: value,
        })
    }
} else{
    setAppointmentData({
        ...appointmentData,
        [name]: value,
    })
}





}

const handleSubmit = async(e) => {
e.preventDefault();
const selectedDate = new Date(appointmentData.date);
const currentDate = new Date();


try {
    if(!appointmentData.description){
        setFailureMessage("you can't schedule without a description")
        setTimeout(() => {
            setFailureMessage("")
        }, 2000);
        return;
    }

    if(selectedDate < currentDate){
        setFailureMessage("No puedes reservar mesas para fechas pasadas o el mismo dia");
      setTimeout(() => {
        setFailureMessage("")
      }, 2000);
        return;
    }

    const confirmResult = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to add this appointment?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add it!'
    });

    if(confirmResult.isConfirmed){
        await axios.post("http://localhost:3000/appointment/schedule",appointmentData)

        Swal.fire({
            icon: 'success',
            title: 'Appointment Added Successfully',
            showConfirmButton: false,
            timer: 1500
        });
       
        setTimeout(() => {
         setAppointmentData({
           status:"active",
           description:"",
           userId:user.id,
           date:"",
           time:""
         })
          
        }, 1000);
       
       dispatch(fetchUserAppointments());
    }


 

} catch (error) {
    console.error("Error adding appointment:", error);
}
}


useEffect(()=>{
    const currentTime = new Date().getHours()
    setButtonDisabled(currentTime < 10 || currentTime >= 21); 
    setMessageVisible(currentTime < 10 || currentTime >= 21);
},[])


    return(
        <div className={styles.AddAppointmentformcontainer}>
            <form onSubmit={handleSubmit}>
              
               <label htmlFor="description" className={styles.AddAppointmentlabel}>Descripcion: Ejemplo: Reserva mesa (#numero de mesa)</label>
                <input type="text"
                id="description"
                name="description"
                value={appointmentData.description}
                onChange={handleChange}
                className={styles.AddAppointmentinput}
                />
               <label htmlFor="date" className={styles.AddAppointmentlabel}>Date:</label>
               <input type="date" 
               id="date"
               name="date"
               value={appointmentData.date}
               onChange={handleChange}
               className={styles.AddAppointmentinput}
               />

               <label htmlFor="time" className={styles.AddAppointmentlabel}>Time:</label>
               <input type="time" 
               id="time"
               name="time"
               value={appointmentData.time}
               onChange={handleChange}
               className={styles.AddAppointmentinput}
               />


                <button type="submit" className={styles.AddAppointmentbutton} disabled={getButtonDisabled}>Add Appointment</button>
                <h4>Solo puedes reservar mesas entre las 10a.m. y las 9 p.m. </h4>
            </form>
        
         {failureMessage && <p style={{color:'red'}}>{failureMessage}</p>}
         {messageVisible && <p style={{color:'red',fontSize:'20px'}}>Reservation hours are from 10 a.m. to 9 p.m.</p>}
        
        </div>
    )
}

export default AddAppointment;



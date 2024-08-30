import { useEffect, useState, } from "react";
import Turno from "../../components/Turno";
import axios from 'axios';
import styles from '../../styles/MisTurnos.module.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAppointments, setAppointments } from "../../Redux/reducers/reducer";
import AddAppointment from "../../components/AddAppointment";


const MisTurnos = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const appointments = useSelector(state => state.appointment.appointments);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    
    const [showActive,setShowActive] = useState(true);

      useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        } else {
            const loadAppointments = async () => {
                
                const storedAppointments = JSON.parse(localStorage.getItem("appointments"));
                if (storedAppointments && storedAppointments.length > 0) {
                    dispatch(setAppointments(storedAppointments));
                } else {
                    if(isLoggedIn){
                        try {
                             dispatch(fetchUserAppointments());
                        } catch (error) {
                            throw new Error(`Error fetching data: ${error.message}`)
                        }
                    }
                    
                }
            };
            loadAppointments();
        }
    }, [dispatch, navigate, isLoggedIn]);
  
    
    const handleCancelTurn =  async (id) => {
        try {
           
           await axios.put(`http://localhost:3000/appointment/cancel/${id}`,{
            status:'canceled'
           })
           dispatch(fetchUserAppointments());
        } catch (error) {
            throw new Error("Error al cancelar turno:", error);
        }
        
    }

    
 const handleDeleteClick = async(id) =>{
    try {
       await axios.delete(`http://localhost:3000/appointment/delete/${id}`)
        console.log("Sucefully deleted");

      dispatch(fetchUserAppointments());

    } catch (error) {
       throw new Error("Error to delete appoinment",error)
    }
    }
     
    let emptyAppointmentsMessage = "No Appointments Available";
    if (appointments && appointments.length > 0) {
        emptyAppointmentsMessage = ""; 
    }
    
    let emptyFilteredAppointmentsMessage = showActive ?
    "No Active Appointments":
    "No Canceled Appointments"

    const filteredAppointments = showActive ? appointments.filter((turno => turno.status === 'active' )):
    appointments.filter((turno => turno.status === 'canceled' ))


  
    
    const turnosRender = filteredAppointments.length > 0 ? filteredAppointments.map((turno)=>(
        <Turno key={turno.id} date={turno.date} time={turno.time}
        status={turno.status} userName={turno.userName} description={turno.description} 
        enableButton={turno.status === 'active'} onCancel={() => handleCancelTurn(turno.id)}
        onDelete={()=> handleDeleteClick(turno.id)}
    />
    )) : <p style={{ textAlign: 'center', fontSize: '30px', color: 'black' }}>{emptyFilteredAppointmentsMessage}</p>
    
return (
    <>
    <br />
    <AddAppointment />
    <h1 className={styles.h1}>📅Mis Turnos📅</h1>
    <button onClick={()=>setShowActive(true)} className={styles.activeButton}>Active Appointments</button>
    <button onClick={()=>setShowActive(false)} className={styles.canceledButton}>Canceled Appointments</button>
    <br />
    {emptyAppointmentsMessage ? (
       <div style={{border:'solid 2px white'}}> 
       <p style={{color:'Black',textAlign:"center",fontSize: '40px'}}>{emptyAppointmentsMessage}</p></div>
    ) : (
        turnosRender
    )}
</>
)

}

export default MisTurnos;
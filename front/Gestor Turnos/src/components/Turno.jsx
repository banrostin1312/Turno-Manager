import styles from '../styles/Turnos.module.css'
import Swal from 'sweetalert2';


const Turno = ({date, time, status,description,userName,enableButton,onCancel,onDelete}) => {
   

    const handleCancelClick = () => {
        Swal.fire({
            title: '¿Are you Sure?',
            text: '¿Do you want to cancel this appointment?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'yes, cancel appointment',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                onCancel();
            }
        });
    }

const handleDeleteClick= () => {
    Swal.fire({
        title: '¿Are you Sure?',
        text: '¿Do you want to Delete this appointment?',
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'yes, delete appointment',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            onDelete();
        }
    });
}

    return (
        <div className={styles.turnoContainer}>
            <div className={styles.property}>
                <span className={styles.propertyLabel}>Fecha</span>
                <span className={styles.propertyValue}>{date}</span>
            </div>
            <div className={styles.property}>
                <span className={styles.propertyLabel}>Hora</span>
                <span className={styles.propertyValue}>{time}</span>
            </div>
            <div className={styles.property}>
                <span className={styles.propertyLabel }>Estado</span>
                <span className={`styles.propertyValue ${status === 'active'?styles.ActiveGreen:styles.CanceledRed}`}>{status}</span>
            </div>

            <div className={styles.property}>
                <span className={styles.propertyLabel}>Descripcion</span>
                <span className={styles.propertyValue}>{description}</span>
            </div>

            <div className={styles.property}>
                <span className={styles.propertyLabel}>Nombre de Usuario</span>
                <span className={styles.propertyValue}>{userName}</span>
            </div>
            <button className={styles.turnoButtonCancel} disabled= {!enableButton} onClick={handleCancelClick}>Cancel Appointment</button>
            <button onClick={handleDeleteClick} className={styles.turnoButtonDelete} >Delete Appointment</button>
        </div>
    );
};

export default Turno;

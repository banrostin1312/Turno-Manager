import { useSelector } from "react-redux";
import styles from '../../styles/Profile.module.css'
const Perfil = () => {
   const user = useSelector(state => state.user.user)
   


return (
    <div>
    <h1>Informacion de tu perfil</h1>
      <div  className={styles.userInfoContainer}>
      <div >
       <label htmlFor="username">🙂Username:</label>
       <span>{user.username}</span>
       </div>
       <div>
       <label htmlFor="email">📧Email:</label>
       <span>{user.email}</span>
       </div>
       <div>
       <label htmlFor="nDni">🆔nDni:</label>
       <span>{user.nDni}</span>
       </div>
     </div>
      </div>
   
    )
}

export default Perfil;
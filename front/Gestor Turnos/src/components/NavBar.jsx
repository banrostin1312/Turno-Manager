import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/NavBar.module.css'
import { useDispatch,useSelector} from 'react-redux';
import { clearUser } from '../Redux/reducers/reducer';
import Swal from 'sweetalert2';

const NavBar = ()=>{
    const location = useLocation()
    const isHome = location.pathname === '/home'
    const isLoggedIn = useSelector(state=> state.user.isLoggedIn)
    const dispatch = useDispatch();
     const navigate = useNavigate();
     const user  = useSelector(state => state.user.user);
     

     const handleLogOut = () => {
        Swal.fire({
            title:"Are you sure ",
            text: 'you want to Log Out?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes,i Do!'
        }).then ((result) => {
            if (result.isConfirmed) {
                dispatch(clearUser());
                navigate('/');
            }
        });
       
     }

    
     let welcomeMessage = `Bienvenido:☘️${user.username}☘️`
    return(
        <div className={styles.NavBar}>
            <div className= {styles.navLinks}>
                <Link to='/home' className={styles.navItem}>🏚️Home</Link>

               {isLoggedIn?<Link to='/mis-turnos' className={styles.navItem}>
                <button disabled={!isLoggedIn} className={styles.buttonNavBar}>📅Mis Turnos</button></Link>:
                 null
                }

                {!isLoggedIn ? null :<Link to='/perfil' className={styles.navItem}>👤Perfil</Link>}

                {!isLoggedIn? null :<div className={styles.welcomeContainer}><span className={styles.welcomeMessage}>{welcomeMessage}</span></div>}

                {isLoggedIn ?<button className={styles.LogOutButton} onClick={handleLogOut}>↪ SignOut</button>:null}

                {isHome && !isLoggedIn? <Link to="/"><button className={styles.BackToLoginButtonhome}>◀Back Login</button></Link>:null}
               
                
            </div>
           
        </div>
    )
};

export default NavBar;
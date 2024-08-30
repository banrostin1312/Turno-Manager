import { useState} from "react";
import styles from '../../styles/LoginForm.module.css'
import axios from "axios";
import { useNavigate, Link} from "react-router-dom";
import { useDispatch} from "react-redux";
import { setUser } from "../../Redux/reducers/reducer";
import Swal from "sweetalert2";


const Login = () => {
    const dispatch = useDispatch();
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    });
   
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLoginForm({
            ...loginForm,
            [name]: value,
        });

        
    };

   
    
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();


       if(!loginForm.username || !loginForm.password){
        Swal.fire({
            icon: 'error',
            title: 'you need to enter your password and username to enter ',
            showConfirmButton: false,
            timer: 2000
        });
        return;
       }
            try {
                
                const response = await axios.post("http://localhost:3000/users/login", loginForm);
                const {user,token} = response.data;
                
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);

                dispatch(setUser({user,token}))

                Swal.fire({
                    icon: 'success',
                    title: `User:(${user.username}) Validated`,
                    showConfirmButton: false,
                    timer: 2000
                });
               
                setTimeout(() => {
                    setLoginForm({
                        username: "",
                        password: ""
                    });
                    navigate('/home');
                }, 1000);
              

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Username Or Password  ',
                    showConfirmButton: false,
                    timer: 2000
                })
              throw new Error(`Error login: ${error.message}`)
            }
        
    };

    return (
        <div>
            <h1>Bienvenido, ¿Aun no tienes cuenta? <Link to='/register' className={styles.signUpLink}>SignUp</Link></h1>
            <form className={styles.loginformcontainer} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className={styles.Loginlabel}>👥Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={loginForm.username}
                        placeholder="Username"
                        onChange={handleChange}
                        className={styles.LoginInput}
                    />
                    
                </div>
                <div>
                    <label htmlFor="password" className={styles.Loginlabel}>🔑Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={loginForm.password}
                        placeholder="Password"
                        onChange={handleChange}
                        className={styles.LoginInput}
                    />
               
                </div>
                <br />
                <button className={styles.LoginButton} type="submit">Login</button>
                <br />
                
            </form>
        </div>
    );
};

export default Login;


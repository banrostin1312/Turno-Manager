import { useState } from "react";
import styles from '../../styles/RegisterForm.module.css'
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
   
    const [registerForm,setRegisterForm] = useState({

        username:'',
        email:'',
        nDni: '',
        password:'',
        confirmPassword:''
    })

    const [errors,setErrors] = useState({})

    const [successMessage,setsuccessMessage] = useState("");
    const navigate = useNavigate();
    
    const handleChange = (e) => {
     const {name, value} = e.target;
     setRegisterForm({
        ...registerForm,
        [name]: value,
     })

     if(name === "confirmPassword") {
        if(value !== registerForm.password){
            setErrors({
                ...errors,
                confirmPassword:"las passwords no coinciden"
            });
        } else {
            setErrors({
                ...errors,
                confirmPassword:""
            });
        } 
        }else{
           setErrors((prevErrors) =>({
            ...prevErrors,
            [name]:""
           }))
     }
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const newErrors = {};
        const regexEmail = /^\S+@\S+\.\S+$/;
        const regexDni = /^[0-9]+$/;
        const regexPassword = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/
        
        if(!registerForm.username) {
            newErrors.username = "El nombre de usuario es requerido"
        }
        if(!registerForm.email){
            newErrors.email = "El email es requerido"
        } else if(!regexEmail.test(registerForm.email)){
           newErrors.email = "El email no es valido"
        }

        if(!registerForm.nDni) {
            newErrors.nDni = "El numero de dni es requerido"
        } else if(!regexDni.test(registerForm.nDni)){
            newErrors.nDni = "El Dni ingresado no es valido(deben ser solo numeros)"
        }
        
        if(!registerForm.password) {
            newErrors.password = "La password es requerida"
        } else if(!regexPassword.test(registerForm.password)){
            newErrors.password = "La password ingresada no es valida debe contener al menos una mayuscula y un caracter especial."
        }

        if(!registerForm.confirmPassword){
            newErrors.confirmPassword = "La verificacion de password es requerida"
        }
              
        setErrors(newErrors);

        if(Object.keys(newErrors).length === 0){
                 try {
                   
                    await axios.post("http://localhost:3000/users/register", registerForm);
                   
                    Swal.fire({
                        icon: 'success',
                        title: 'SingUp Sucefully',
                        showConfirmButton: false,
                        timer: 1000
                    });

                    setTimeout(() => {
                        setsuccessMessage("");
                        setRegisterForm({
                            username:"",
                            email:"",
                            nDni:"",
                            password:"",
                            confirmPassword:""
                        })
                        navigate("/")
                    }, 1000);

                  } catch (error) {
                   throw new Error(`Error Register: ${error.message}`)
                  }
        }
        
            
        }


        return(
            <div>
                <div>
                    <Link to="/"><button className={styles.BackToLoginButton}>◀Back Login</button></Link>
                </div>
            <form onSubmit={handleSubmit} className={styles.Registerformcontainer}>
            <div>
                <label htmlFor="username" className={styles.Registerlabel}>👥Username:</label>
                <input type="text" id="username" 
                name="username" 
                value={registerForm.username}
                placeholder="Username"
                onChange={handleChange}
                autoComplete="Username"
                className={styles.RegisterInput}
                />
                <br />
                {errors.username && <span style={{color:'red'}}>{errors.username}</span> }
             </div>
    
             <div>
            <label htmlFor="email" className={styles.Registerlabel}>📧Email:</label>
            <input type="email" id="email" name="email" 
            value={registerForm.email} 
            placeholder="Email"
            onChange={handleChange}
            className={styles.RegisterInput}
            />
            <br />
               {errors.email && <span style={{color:'red'}}>{errors.email}</span> }
             </div>
    
             <div>
                <label htmlFor="nDni" className={styles.Registerlabel}>🆔nDni:</label>
                <input type="text" id="nDni" name="nDni" 
                value={registerForm.nDni}
                placeholder="nDni"
                onChange={handleChange}
                className={styles.RegisterInput}
                />
                <br />
                {errors.nDni && <span style={{color:'red'}}>{errors.nDni}</span> }
             </div>
             
               <div>
                <label htmlFor="password" className={styles.Registerlabel}>🔑newPassword:</label>
                <input type="password" id="newPassword" 
                name="password"
                value={registerForm.password}
                placeholder="NewPassword"
                onChange={handleChange}
                autoComplete="new-password"
                className={styles.RegisterInput}
                />
                <br />
                {errors.password && <span style={{color:'red'}}>{errors.password}</span> }
               </div>
    
               <div>
                <label htmlFor="confirmPassword" className={styles.Registerlabel}>🔑confirmPassword:</label>
                <input type="password" id="confirmPassword" 
                name="confirmPassword"
                value={registerForm.confirmPassword}
                placeholder="Confirm Password"
                onChange={handleChange}
                autoComplete="new=password"
                className={styles.RegisterInput}
                />
                <br />
                {errors.confirmPassword && <span style={{color:'red'}}>{errors.confirmPassword}</span> }
               </div>
               <br />
              <button type="submit" className={styles.Registerbutton}>Submit</button>
              <br />
             
                {successMessage && <p style={{color:'green'}}>{successMessage}</p>}
        
            </form>
            </div>
        )







    }
    


   


export default Register;
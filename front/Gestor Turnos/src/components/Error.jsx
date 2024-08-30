import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/ErrorPage.module.css'

const Error = () => {
const navigate = useNavigate();
const [countDown,setcountDown] = useState(5);
   useEffect(()=>{
    const intervalCountdown = setInterval(() => {
        setcountDown((prevCountdown) => prevCountdown -1)
    }, 1000);

    setTimeout(() => {
        clearInterval(intervalCountdown);
        navigate("/")
    }, 5000);

    return () => clearInterval(intervalCountdown);
   },[navigate]);



    return(
    <div className={styles.pageNotFoundContainer}>
    <h1>Page not found</h1>
    <h2>Redirecting to home in {countDown}</h2>
    </div>
)
};

export default Error;
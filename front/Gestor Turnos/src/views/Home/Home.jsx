import { useState } from 'react';
import ImgText from '../../components/ImgText';
import Homestyles from '../../styles/Home.module.css'
import texts from '../../helpers/textsHelp';

const Home = ()=>{
     const[textImgToShow,setTextImgToShow] = useState([
        {text: texts[0], imgUrl: "https://images.pexels.com/photos/13772571/pexels-photo-13772571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
        {text: texts[1], imgUrl: "https://images.pexels.com/photos/19260794/pexels-photo-19260794/free-photo-of-pan-comida-madera-pizza.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
        {text: texts[2], imgUrl: "https://images.pexels.com/photos/5953576/pexels-photo-5953576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
])


return(
        
       <div className={Homestyles.body}>
        <h1>🍕Procesos de nuestra pizza🍕</h1>
         {
            textImgToShow.map((item,index)=>{
                return <ImgText text ={item.text} img = {item.imgUrl}  key={index}/>
            })
         }
         <footer>Andres Rodriguez 2024 Pizzeria®️ </footer>
        </div>
    )
};

export default Home;
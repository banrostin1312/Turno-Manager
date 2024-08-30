import styles from '../styles/MasaImgText.module.css'

const ImgText = ({text,img}) => {
return(
    <div className={styles.MasaImgTextContainer}>
      <img src= {img} alt="Img-text" className={styles.MasaImg} />
      <p className={styles.MasaText}>{text}</p>

    </div>
)

    
};

export default ImgText;
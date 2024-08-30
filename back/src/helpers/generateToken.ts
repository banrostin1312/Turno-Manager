import jwt from 'jsonwebtoken'

const generateJWTToken = (userId:number) => {
    const secretKey = "ramby"; // Esta clave debería ser más segura en un entorno de producción
    const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" }); // Cambia el tiempo de expiración según tus necesidades
    return token;
  };

  export default generateJWTToken;
import express from "express";
import router from "./routes";
import cors from "cors";
const server = express();

server.use(cors({
    origin: "*", // Permitir solicitudes desde cualquier origen
    methods: ["GET", "POST","PUT","DELETE"], // Permitir métodos GET y POST
  }));
server.use(express.json());
server.use(router);



export default server;

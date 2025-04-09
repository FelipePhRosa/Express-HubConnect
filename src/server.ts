import express, { Router, Request, Response } from "express";
import dotenv from "dotenv"
import cors from "cors"
import router from "./router"


dotenv.config();

const server = express();
const PORT = process.env.PORT || 3000;

server.use(cors());

server.use(express.json());
server.use(router);

server.listen(PORT, () => console.log(`Server is Running port: ${PORT}`));
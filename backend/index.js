import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import ProjectRoute from "./routes/ProjectRoute.js";
dotenv.config();

const app = express();

//(async()=>{
//    await db.sync();  //habilitar las 3 lineas a la hora de crear una tabla
//})();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'  // aca se estable true o false si es http o https pero auto para que tome ambos.
    }
}));

app.use(cors({
    credentials: true,
    origin: 'https://localhost:3000'
}));
app.use(express.json());
app.use(UserRoute);
app.use(ProjectRoute);

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running...');
});
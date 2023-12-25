import express from "express";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import UserController from "./src/controllers/user.controller.js";
import {userValidation} from "./src/middlewares/userValidation.middleware.js"
import session from "express-session";
import { auth } from "./src/middlewares/userAuth.middleware.js";

export const app = express();

app.use(express.static("./public"));

app.use(
    session({
      secret: 'itIsASecretKey',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use(expressEjsLayouts)
app.set('view engine', 'ejs')
app.set('views', path.resolve("src", "views"));

app.get('/', (req, res)=>{
    res.render("home", {user:null});
})



const usersController = new UserController();

app.get('/home',  usersController.getHome)

app.post('/', userValidation,  usersController.registerUser)

app.get('/login', usersController.getLogin)

app.post('/login', usersController.loginUser)

app.get('/logout', usersController.logout)

app.get('/jobs', usersController.getJobs)

app.get('/postjob', auth, usersController.postjob);

app.get('/job', usersController.getJob)


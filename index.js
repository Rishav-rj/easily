import express from "express";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import UserController from "./src/controllers/user.controller.js";
import JobsController from "./src/controllers/jobs.controller.js";
import {userValidation} from "./src/middlewares/userValidation.middleware.js"
import session from "express-session";
import { auth } from "./src/middlewares/userAuth.middleware.js";
import { uploadFile } from "./src/middlewares/resumeUpload.middleware.js";

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


const usersController = new UserController();
const jobsController = new JobsController();

app.get('/',  usersController.getHome)

app.post('/', userValidation,  usersController.registerUser)

app.get('/login', usersController.getLogin)

app.post('/login', usersController.loginUser)

app.get('/logout', usersController.logout)

app.get('/jobs', jobsController.getJobs)

app.get('/postjob', auth, jobsController.getpostjob);

app.post('/postjob', auth, jobsController.postjob);

app.get('/job/:id', jobsController.getJob)

app.get('/job/update/:id',auth, jobsController.getUpdateJob)

app.post('/job/update/',auth, jobsController.postUpdateJob)

app.get('/job/delete/:id',auth, jobsController.deleteJob)

app.get('/job/applicants/:id', auth, jobsController.getApplicants)

app.post('/job/apply/:id', uploadFile.single("resume"), jobsController.postApplyJob)


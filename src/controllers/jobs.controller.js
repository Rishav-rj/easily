import { render } from "ejs";
import JobModel from "../models/job.model.js";
import {sendConfirmation} from "../middlewares/confirmationEmail.middleware.js"

export default class JobsController {

    getJobs(req, res){
        const jobs = JobModel.getJobs()
        res.render('jobs', {userEmail: req.session.userEmail, userName:req.session.userName, jobs:jobs})
    }

    getpostjob(req, res){
        res.render("jobPostForm", {userEmail: req.session.userEmail, userName:req.session.userName})
    }

    postjob(req, res){
        const job = req.body;
        const jobs = JobModel.addJob(job,0);
        res.redirect('/jobs')
    }

    getJob(req, res){
        const id = req.params.id
        const job = JobModel.getJobById(id)
        res.render('jobDetail', {userEmail: req.session.userEmail, userName:req.session.userName, job:job})
    }
    
    getUpdateJob(req, res){
        const id = req.params.id
        const job = JobModel.getJobById(id)
        if(job){
            res.render('updateJob', {userEmail: req.session.userEmail, userName:req.session.userName, job})
        }else{
            res.send("Product not found")
        }

    }

    postUpdateJob(req, res){
        const updatedJob = req.body
        JobModel.updateJob(updatedJob)
        res.redirect(`/job/${updatedJob.id}`)
    }


    deleteJob(req, res){
        const id = req.params.id;
        const job = JobModel.getJobById(id);
        if(job){
            JobModel.deleteJob(job)
            res.redirect('/jobs')
        }else{
            res.status(401).send("Job not found")
        }
    }

    getApplicants(req, res){
        const id = req.params.id
        const job = JobModel.getJobById(id);
        res.render('applicants', {userEmail: req.session.userEmail, userName:req.session.userName, job})
    }

    postApplyJob(req, res){
        const {name, email, phone} = req.body
        const resume = '/resumes/' + req.file.filename
        const id = req.params.id
        JobModel.addApplicant(id, name, email, phone, resume)
        sendConfirmation(email)
        res.redirect(`/job/${id}`)
    }

    

}
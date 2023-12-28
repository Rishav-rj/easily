import JobModel from "../models/job.model.js";
export default class JobsController {

    getJobs(req, res){
        const jobs = JobModel.getJobs()
        res.render('jobs', {userEmail: req.session.userEmail, userName:req.session.userName, jobs})
    }

    getpostjob(req, res){
        res.render("jobPostForm", {userEmail: req.session.userEmail, userName:req.session.userName})
    }

    postjob(req, res){
        const job = req.body;
        const recruiterEmail = req.session.userEmail
        JobModel.addJob(job,[],recruiterEmail);
        res.redirect('/jobs')
    }

    getJob(req, res){
        const id = req.params.id
        const job = JobModel.getJobById(id)
        if(job){
            res.render('jobDetail', {userEmail: req.session.userEmail, userName:req.session.userName, job:job})
        }else{
            res.redirect('/404')
        }
    }
    
    getUpdateJob(req, res){
        const id = req.params.id
        const job = JobModel.getJobById(id)
        const userEmail = req.session.userEmail
        if(job.recruiterEmail == userEmail){
            res.render('updateJob', {userEmail: req.session.userEmail, userName:req.session.userName, job})
        }else{
            const msg = "You can only edit the jobs you've posted"
            res.render('404', {userEmail: req.session.userEmail, userName:req.session.userName, msg} )
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
        const userEmail = req.session.userEmail
        if(job.recruiterEmail == userEmail){
            JobModel.deleteJob(job)
            res.redirect('/jobs')
        }else{
            const msg = "You can only remove the jobs you've posted"
            res.render('404', {userEmail: req.session.userEmail, userName:req.session.userName, msg} )
        }
    }

    getApplicants(req, res){
        const id = req.params.id
        const job = JobModel.getJobById(id);
        const userEmail = req.session.userEmail
        if(job.recruiterEmail == userEmail){
            res.render('applicants', {userEmail: req.session.userEmail, userName:req.session.userName, job})
        }else{
            const msg = "You can see only the people who applied to your job"
            res.render('404', {userEmail: req.session.userEmail, userName:req.session.userName, msg} )
        }
    }

    postApplyJob(req, res){
        const {name, email, phone} = req.body
        const resume = '/resumes/' + req.file.filename
        const id = req.params.id
        JobModel.addApplicant(id, name, email, phone, resume)
        JobModel.sendConfirmation(email)
        res.redirect(`/job/${id}`)
    }

    seachedJobs(req , res){
        const {company} = req.body;
        const jobs = JobModel.searchJobs(company)
        res.render('jobs',{userEmail: req.session.userEmail, userName:req.session.userName, jobs})
    }

    errorPage(req, res){
        const msg = "only recruiter is allowed to access this page"
        res.render('404', {userEmail: req.session.userEmail, userName:req.session.userName, msg} )
    }
    
    worngUrl(req, res){
        res.redirect('/')
    }

}
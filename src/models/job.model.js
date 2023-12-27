import moment from "moment"; 

export default class JobModel {
    constructor(id, companyName, jobCategory, designation, location, salary, position, skills, applyBy, jobPostDate, applicants){
        this.id = id;
        this.companyName = companyName;
        this.jobCategory = jobCategory;
        this.designation = designation;
        this.location = location;
        this.salary = salary;
        this.position = position;
        this.skills = skills;
        this.applyBy = applyBy;
        this.jobPostDate = jobPostDate;
        this.applicants = applicants;
    }

    static getJobs(){
        return jobs
    }

    static getJobById(id){
        return jobs.find(job=> job.id == id);
    }

    static addJob(job, applicants){
        const {companyName, jobCategory, designation, location, salary, position, skills, applyBy} = job;
        const id = jobs.length + 1;
        const jobPostDate =  moment(new Date()).format("YYYY-MM-DD hh:mm A");
        const totalApplicants = applicants.length 
        const newJob = {
            id,
            companyName, 
            jobCategory, 
            designation, 
            location, 
            salary, 
            position, 
            skills, 
            applyBy,
            jobPostDate,
            totalApplicants,
            applicants
        }
        jobs.push(newJob);
        return jobs
    }

    static updateJob(updateJob){
        const index = jobs.findIndex(job => job.id == updateJob.id);
        const jobApplicats = jobs[index].applicants
        jobs[index] = updateJob;
        jobs[index].applicants = jobApplicats;
    }

    static deleteJob(id){
        const index = jobs.findIndex(job => job.id == id);
        jobs.splice(index, 1);
    }

    static addApplicant(id, name,email,phone,resume){
        const job = jobs.find(job=> job.id == id)
        job.applicants.push({name, email, phone, resume})
        job.totalApplicants = job.applicants.length
    }
}


var jobs = []

JobModel.addJob({
    companyName:"Apple", 
    jobCategory:"Tech",
    designation:"SDE",
    location:"Noida",
    salary:"14-15 LPA",
    position:2,
    skills:["React", "NodeJs", "Express", "MongoDB", "DSA"],
    applyBy:"2023-12-18",
},[{
    "name": "Rishav Jaiswal",
    "email": "rishavjaiswal02@gmail.com",
    "phone":8709438667,
    "resume":"/resumes/resume.2.pdf"
},{
    "name": "Chotu Sharma",
    "email": "Chotu@gmail.com",
    "phone":8789456546,
    "resume":"/resumes/resume.1.pdf"
}])

JobModel.addJob({
    companyName:"Coding Ninjas", 
    jobCategory:"Tech",
    designation:"MERN Developer",
    location:"Delhi",
    salary:"12-14 LPA",
    position:2,
    skills:["React", "NodeJs", "Express", "MongoDB"],
    applyBy:"2023-12-16",
},[{
    "name": "Rishav Jaiswal",
    "email": "rishav@gmail.com",
    "phone":8709438655,
    "resume":"/resumes/resume.1.pdf"
}])

JobModel.addJob({
    companyName:"Amazon", 
    jobCategory:"Non Tech",
    designation:"HR",
    location:"Noida",
    salary:"8-10 LPA",
    position:2,
    skills:["React", "NodeJs", "Express", "DSA"],
    applyBy:"2023-12-29",
},[{
    "name": "Rishav Jaiswal",
    "email": "rishav@gmail.com",
    "phone":8709438655,
    "resume":"/resumes/resume.1.pdf"
}])

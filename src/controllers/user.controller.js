import JobModel from "../models/job.model.js";
import UserModel from "../models/user.model.js";

export default class UserController {

    getHome(req, res){
        res.render('home', {userEmail: req.session.userEmail, userName:req.session.userName})
    }
    
    getLogin(req, res){
        res.render('login', {errorMsg:null})
    }
    

    registerUser(req, res){
        const user = req.body
        UserModel.addUser(user)
        res.render('login', {errorMsg:null})
    }

    loginUser(req, res){
        const {email, password} = req.body
        const user = UserModel.isUser(email, password)
        if(!user){
            return res.render('login', {errorMsg: 'Invalid Credential'})
        }
        req.session.userEmail = email;
        let userName = UserModel.userName(req.session.userEmail)
        req.session.userName = userName
        const jobs = JobModel.getJobs()
        res.redirect('/jobs')
    }

    logout(req, res) {
        req.session.destroy((err) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect('/');
          }
        });
    }
}

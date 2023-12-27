import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export const sendConfirmation =  (email)=>{
    const transpoter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'codingninjas2k16@gmail.com',
            pass: 'slwvvlczduktvhdj',
        },
    })

    var htmlstream = fs.createReadStream(path.join("Public", "confirmation.html"));
    
    let mailOption = {
        from:'codingninjas2k16@gmail.com',
        to: email,
        subject: 'Coding Ninjas',
        html:htmlstream,
        }
    try{
        const result =  transpoter.sendMail(mailOption);
        console.log("Success: Email sent to "+ email);
    }catch(err){
        console.log("Email send failed due to: "+ err);
    }
}


export default class UserModel{
    constructor(id, name, email, password){
        this.id = id,
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static checkEmail(email){
        const emailExist =  users.find(user=> user.email == email);
        console.log(users);
        return emailExist
    }

    static addUser(user){
        let newUser = new UserModel(
            users.length + 1,
            user.name, 
            user.email, 
            user.password
        )
        users.push(newUser)
    }

    static isUser(email, password){
        const status = users.find(user => user.email == email && user.password == password)
        return status
    }

    static userName(email){
        const user = users.filter(user => user.email == email)
        return user[0].name
    }

}


let users = [];